"""Gera PDF e HTML do eBook. Requer reportlab. Execute a partir de qualquer pasta."""
import json, re, html
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'media/ebook-content.json').read_text(encoding='utf-8'))
config=(ROOT/'config.js').read_text(encoding='utf-8')
def config_value(key):
    m=re.search(r'\b'+key+r"\s*:\s*(['\"])(.*?)\1",config)
    return m.group(2) if m else ''
author=config_value('author') or 'Autoria: preencher antes da entrega'
institution=config_value('institution')
fontdir=Path('C:/Windows/Fonts')
if (fontdir/'arial.ttf').exists():
    pdfmetrics.registerFont(TTFont('Body',str(fontdir/'arial.ttf')))
    pdfmetrics.registerFont(TTFont('Bold',str(fontdir/'arialbd.ttf')))
else:
    raise RuntimeError('Configure fontes TrueType em tools/build_ebook.py.')
W,H=600,800
INK='#173e36'; MUTED='#53675d'; LIME='#dcf48b'; PAPER='#f8faf6'; SOFT='#eef3e8'
out=ROOT/'media/ebook-raciocinio.pdf'
c=canvas.Canvas(str(out),pagesize=(W,H))
c.setTitle(data['title']);c.setAuthor(author);c.setSubject(data['subtitle'])
def para(text,x,y,w,size=12,color=INK,bold=False,leading=None):
    style=ParagraphStyle('p',fontName='Bold' if bold else 'Body',fontSize=size,leading=leading or size*1.45,textColor=HexColor(color))
    p=Paragraph(html.escape(text),style); pw,ph=p.wrap(w,1000)
    if y>48 and y-ph<48: raise ValueError(f'Conteúdo excedeu a página: {text[:60]}')
    p.drawOn(c,x,y-ph);return y-ph
def page_start(number,label,anchor):
    c.setFillColor(HexColor(PAPER));c.rect(0,0,W,H,fill=1,stroke=0)
    c.bookmarkPage(anchor);c.addOutlineEntry(label,anchor,0,False)
    para('LABORATÓRIO DE RACIOCÍNIO',42,768,516,9,MUTED)
    c.setStrokeColor(HexColor('#dce3da'));c.line(42,740,558,740)
    para('Além da resposta certa',42,33,300,9,MUTED)
    para(str(number).zfill(2),525,33,33,9,MUTED)
    if number>2:
        para('Sumário',450,33,70,9,MUTED)
        c.linkRect('', 'sumario', (448,15,515,36),relative=0,thickness=0)
def visual(v,y):
    if not v:return y
    if v['type']=='flow':
        items=v['items'];gap=7;cw=(516-gap*(len(items)-1))/len(items)
        for i,item in enumerate(items):
            x=42+i*(cw+gap);c.setFillColor(HexColor(INK));c.roundRect(x,y-62,cw,62,5,fill=1,stroke=0)
            para(item,x+9,y-13,cw-18,10,'#ffffff',True)
        return y-80
    rows=[v['headers']]+v['rows'];cw=172
    for rowi,row in enumerate(rows):
        c.setFillColor(HexColor(INK if rowi==0 else SOFT));c.rect(42,y-34,516,34,fill=1,stroke=0)
        for i,cell in enumerate(row):para(cell,52+i*cw,y-8,cw-20,10,'#ffffff' if rowi==0 else INK,rowi==0)
        y-=35
    return y-15

# Capa
c.setFillColor(HexColor(INK));c.rect(0,0,W,H,fill=1,stroke=0)
c.bookmarkPage('capa');c.addOutlineEntry('Capa','capa',0,False)
para('CADERNO DE CRIAÇÃO  /  COMPUTAÇÃO + IA',46,748,510,10,LIME,True)
para('Da resposta\nao raciocínio'.replace('\n',' '),46,648,470,51,'#ffffff',True,57)
para(data['subtitle'],46,452,440,21,'#ffffff')
para('COMPARE. APLIQUE. JUSTIFIQUE.',46,333,490,11,LIME,True)
visual({'type':'flow','items':['Cenário','Critérios','Evidências']},285)
c.setStrokeColor(HexColor(LIME));c.line(46,165,554,165)
para(author,46,143,500,12,'#ffffff')
if institution:para(institution,46,117,500,11,'#ffffff')
para('Material complementar do minicurso · Novembro de 2026',46,70,500,10,LIME)
c.showPage()
# Sumário
page_start(2,'Sumário','sumario')
y=para('Um guia para usar,\nnão apenas ler.'.replace('\n',' '),42,710,500,29,bold=True)
y=para('Leitura sugerida: 15–20 minutos. Clique em um capítulo para navegar; use “Sumário” no rodapé para voltar. As pausas de reflexão têm comentários na versão HTML acessível.',42,y-20,516,12)-27
for i,ch in enumerate(data['chapters']):
    c.setStrokeColor(HexColor('#dce3da'));c.line(42,y-32,558,y-32)
    para(f'{i+1:02d}  {ch["title"]}',42,y,470,12,bold=True)
    para(str(i+3),530,y,28,12)
    c.linkRect('',ch['id'],(42,y-31,558,y+4),relative=0,thickness=0);y-=43
para('Percurso: vídeo → eBook → mapa interativo → quiz → criação de uma atividade.',42,y-10,516,11,MUTED)
c.showPage()
for i,ch in enumerate(data['chapters']):
    page_start(i+3,ch['title'],ch['id'])
    y=para(ch['tag'],42,713,516,10,MUTED,True)-12
    y=para(ch['title'],42,y,516,27,bold=True,leading=31)-14
    y=para(ch['intro'],42,y,516,12.5,MUTED)-19
    for title,text in ch['blocks']:
        y=para(title,42,y,516,12,bold=True)-5
        y=para(text,42,y,516,11,leading=15.5)-14
    y=visual(ch.get('visual'),y)
    if 'reflection' in ch:
        y=para('PAUSA PARA REFLETIR',42,y,516,9,MUTED,True)-5
        y=para(ch['reflection'],42,y,516,11,leading=15)
    for label,url in ch.get('links',[]):
        ny=para(label+' (abrir)',42,y,516,10,INK,True)
        c.linkURL(url,(42,ny-2,558,y+1),relative=0,thickness=0);y=ny-8
    c.showPage()
c.save()

def esc(s):return html.escape(s,quote=True)
parts=['<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(data['title'])+' | eBook</title><link rel="icon" href="favicon.svg"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="media.css"></head><body><a class="skip" href="#livro">Pular para o livro</a><header class="topbar"><a class="brand" href="index.html">&lt;/&gt; laboratório de raciocínio</a><a href="index.html#midias">Voltar ao minicurso</a></header><main class="media-main" id="livro">']
parts.append(f'<div class="book-cover"><p class="eyebrow">EBOOK · MATERIAL COMPLEMENTAR</p><h1>{esc(data["title"])}</h1><p class="lead">{esc(data["subtitle"])}</p><p>{esc(author)}{(" · "+esc(institution)) if institution else ""}</p><a href="media/ebook-raciocinio.pdf" download>Baixar a edição em PDF (12 páginas)</a></div>')
parts.append('<section id="sumario"><h2>Seu percurso de leitura</h2><p>Reserve 15–20 minutos. Navegue pelos capítulos e abra os comentários das pausas de reflexão. Esta versão HTML oferece texto ajustável e leitura sem efeitos de virada de página.</p><ol class="book-toc">')
for ch in data['chapters']:parts.append(f'<li><a href="#{ch["id"]}">{esc(ch["title"])}</a></li>')
parts.append('</ol></section>')
for ch in data['chapters']:
    parts.append(f'<section class="book-chapter" id="{ch["id"]}"><p class="eyebrow">{esc(ch["tag"])}</p><h2>{esc(ch["title"])}</h2><p class="lead">{esc(ch["intro"])}</p>')
    for title,text in ch['blocks']:parts.append(f'<h3>{esc(title)}</h3><p>{esc(text)}</p>')
    v=ch.get('visual')
    if v:
        parts.append('<div class="book-visual">')
        if v['type']=='flow':parts.append('<ol class="book-flow">'+''.join('<li>'+esc(item)+'</li>' for item in v['items'])+'</ol>')
        else:
            parts.append('<table><caption>Comparação das versões clássicas</caption><thead><tr>'+''.join('<th scope="col">'+esc(t)+'</th>' for t in v['headers'])+'</tr></thead><tbody>')
            for row in v['rows']:parts.append('<tr><th scope="row">'+esc(row[0])+'</th>'+''.join('<td>'+esc(t)+'</td>' for t in row[1:])+'</tr>')
            parts.append('</tbody></table>')
        parts.append('</div>')
    if 'reflection' in ch:parts.append(f'<div class="book-reflection"><strong>Pausa para refletir</strong><p>{esc(ch["reflection"])}</p><details><summary>Abrir comentário</summary><p>{esc(ch["reveal"])}</p></details></div>')
    for label,url in ch.get('links',[]):parts.append(f'<p><a href="{esc(url)}">{esc(label)} ↗</a></p>')
    parts.append('<p class="book-back"><a href="#sumario">↑ Voltar ao sumário</a></p></section>')
parts.append('<section><h2>Veja as relações em movimento</h2><p>Agora mude as restrições no mapa interativo e observe as consequências para os algoritmos.</p><a class="button primary" href="mapa.html">Explorar o mapa de decisões →</a></section></main></body></html>')
(ROOT/'ebook.html').write_text('\n'.join(parts),encoding='utf-8')
print(f'Criados: {out} e ebook.html')

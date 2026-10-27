#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw
import json, hashlib, argparse

P={
 'transparent':(0,0,0,0),
 'wall_dark':(25,31,39,255),'wall_mid':(67,78,91,255),'wall_mid2':(76,87,100,255),
 'wall_light':(104,116,130,255),'wall_hi':(133,144,156,255),
 'wood_dark':(55,31,21,255),'wood_mid':(116,67,33,255),'wood_light':(166,103,47,255),'wood_hi':(210,143,65,255),
 'iron':(86,97,108,255),'iron_hi':(141,151,160,255),'gold':(244,188,53,255),'gold_dark':(116,72,18,255),
 'block':(210,61,69,255),'block_dark':(95,25,31,255),
}
DIRECTIONS=['N','E','S','W']
KINDS=['passage_open','door_open','door_locked','route_blocked']

def save(im,p):
    p.parent.mkdir(parents=True,exist_ok=True); im.save(p)

def full_wall(o):
    im=Image.new('RGBA',(32,32),P['transparent']); d=ImageDraw.Draw(im)
    if o in 'NS':
        y0,y1=(0,5) if o=='N' else (26,31)
        for seg in range(4):
            x0=seg*8; x1=x0+7
            d.rectangle((x0,y0,x1,y1), fill=P['wall_mid2'] if seg%2 else P['wall_mid'])
            if seg>0: d.line((x0,y0,x0,y1), fill=P['wall_dark'])
            d.point((x0+3,(y0+y1)//2), fill=P['wall_hi'])
        if o=='N':
            d.line((0,0,31,0),fill=P['wall_dark']); d.line((0,5,31,5),fill=P['wall_light'])
        else:
            d.line((0,31,31,31),fill=P['wall_dark']); d.line((0,26,31,26),fill=P['wall_light'])
    else:
        x0,x1=(0,5) if o=='W' else (26,31)
        for seg in range(4):
            y0=seg*8; y1=y0+7
            d.rectangle((x0,y0,x1,y1), fill=P['wall_mid2'] if seg%2 else P['wall_mid'])
            if seg>0: d.line((x0,y0,x1,y0), fill=P['wall_dark'])
            d.point(((x0+x1)//2,y0+3), fill=P['wall_hi'])
        if o=='W':
            d.line((0,0,0,31),fill=P['wall_dark']); d.line((5,0,5,31),fill=P['wall_light'])
        else:
            d.line((31,0,31,31),fill=P['wall_dark']); d.line((26,0,26,31),fill=P['wall_light'])
    return im

def wall_with_opening(o):
    im=full_wall(o)
    # exact 20px opening: x/y 6..25 inclusive
    if o=='N': box=(6,0,25,5)
    elif o=='S': box=(6,26,25,31)
    elif o=='W': box=(0,6,5,25)
    else: box=(26,6,31,25)
    ImageDraw.Draw(im).rectangle(box, fill=P['transparent'])
    return im

def draw_threshold(d,o):
    # neutral dark threshold, never semantic content.
    if o=='N': d.line((7,6,24,6),fill=P['iron']); d.line((8,7,23,7),fill=P['wall_dark'])
    elif o=='S': d.line((7,25,24,25),fill=P['iron']); d.line((8,24,23,24),fill=P['wall_dark'])
    elif o=='W': d.line((6,7,6,24),fill=P['iron']); d.line((7,8,7,23),fill=P['wall_dark'])
    else: d.line((25,7,25,24),fill=P['iron']); d.line((24,8,24,23),fill=P['wall_dark'])

def passage_open(o):
    im=wall_with_opening(o); draw_threshold(ImageDraw.Draw(im),o); return im

def door_open(o):
    im=wall_with_opening(o); d=ImageDraw.Draw(im); draw_threshold(d,o)
    # Two small jambs and one door leaf opened inward against one side.
    if o=='N':
        d.rectangle((6,0,8,7),fill=P['wood_dark']); d.rectangle((23,0,25,7),fill=P['wood_mid'])
        d.line((7,7,7,17),fill=P['wood_mid']); d.line((8,7,8,17),fill=P['wood_light']); d.point((8,11),fill=P['gold'])
    elif o=='S':
        d.rectangle((6,24,8,31),fill=P['wood_dark']); d.rectangle((23,24,25,31),fill=P['wood_mid'])
        d.line((24,14,24,24),fill=P['wood_mid']); d.line((23,14,23,24),fill=P['wood_light']); d.point((23,20),fill=P['gold'])
    elif o=='W':
        d.rectangle((0,6,7,8),fill=P['wood_dark']); d.rectangle((0,23,7,25),fill=P['wood_mid'])
        d.line((7,7,17,7),fill=P['wood_mid']); d.line((7,8,17,8),fill=P['wood_light']); d.point((11,8),fill=P['gold'])
    else:
        d.rectangle((24,6,31,8),fill=P['wood_dark']); d.rectangle((24,23,31,25),fill=P['wood_mid'])
        d.line((14,24,24,24),fill=P['wood_mid']); d.line((14,23,24,23),fill=P['wood_light']); d.point((20,23),fill=P['gold'])
    return im

def door_locked(o):
    im=wall_with_opening(o); d=ImageDraw.Draw(im)
    # Closed leaf exactly occupies the 20px opening across the wall band.
    if o=='N':
        d.rectangle((6,0,25,5),fill=P['wood_mid']); d.line((6,0,25,0),fill=P['wood_dark']); d.line((6,5,25,5),fill=P['wood_light'])
        for x in (10,15,20): d.line((x,1,x,4),fill=P['wood_dark'])
        cx,cy=16,7
    elif o=='S':
        d.rectangle((6,26,25,31),fill=P['wood_mid']); d.line((6,31,25,31),fill=P['wood_dark']); d.line((6,26,25,26),fill=P['wood_light'])
        for x in (10,15,20): d.line((x,27,x,30),fill=P['wood_dark'])
        cx,cy=16,24
    elif o=='W':
        d.rectangle((0,6,5,25),fill=P['wood_mid']); d.line((0,6,0,25),fill=P['wood_dark']); d.line((5,6,5,25),fill=P['wood_light'])
        for y in (10,15,20): d.line((1,y,4,y),fill=P['wood_dark'])
        cx,cy=7,16
    else:
        d.rectangle((26,6,31,25),fill=P['wood_mid']); d.line((31,6,31,25),fill=P['wood_dark']); d.line((26,6,26,25),fill=P['wood_light'])
        for y in (10,15,20): d.line((27,y,30,y),fill=P['wood_dark'])
        cx,cy=24,16
    # tiny abstract lock badge, still inside same 32px connection cell
    d.rectangle((cx-2,cy-1,cx+2,cy+3),fill=P['gold_dark']); d.rectangle((cx-1,cy,cx+1,cy+2),fill=P['gold'])
    d.point((cx,cy-2),fill=P['gold']); d.point((cx-1,cy-2),fill=P['gold']); d.point((cx+1,cy-2),fill=P['gold'])
    return im

def route_blocked(o):
    im=wall_with_opening(o); d=ImageDraw.Draw(im); draw_threshold(d,o)
    # Abstract red X only: communicates blocked state without inventing physical cause.
    if o=='N': cx,cy=16,11
    elif o=='S': cx,cy=16,20
    elif o=='W': cx,cy=11,16
    else: cx,cy=20,16
    for k in range(-4,5):
        d.point((cx+k,cy+k),fill=P['block']); d.point((cx+k,cy-k),fill=P['block'])
    d.rectangle((cx-1,cy-1,cx+1,cy+1),fill=P['block_dark'])
    return im

MAKERS={'passage_open':passage_open,'door_open':door_open,'door_locked':door_locked,'route_blocked':route_blocked}

def build(root):
    root=Path(root); conn=root/'assets/v3/map/connection'; visual=root/'visual'
    conn.mkdir(parents=True,exist_ok=True); visual.mkdir(parents=True,exist_ok=True)
    assets=[]; hashes={}
    col=0
    for kind in KINDS:
        for o in DIRECTIONS:
            im=MAKERS[kind](o)
            name=f'{kind}_{o.lower()}_01.png'; p=conn/name; save(im,p)
            aid=(f'MAP_{kind.upper()}_{o}_01' if kind!='route_blocked' else f'MAP_ROUTE_BLOCKED_{o}_01')
            assets.append({'id':aid,'file':f'assets/v3/map/connection/{name}','kind':'connection','state':kind,'orientation':o,'width':32,'height':32,'rotationSafe':False,'semantic':True,'atlas':{'col':col,'row':2}})
            hashes[aid]={'file':f'assets/v3/map/connection/{name}','sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size}
            col+=1
    manifest={'contract':'Monsterhulen Tileset Contract V2','batch':'connections-v2','tileSize':32,'openingSpan':20,'assets':assets}
    (visual/'connection-manifest-v2.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (visual/'connection-assets-v2.sha256.json').write_text(json.dumps(hashes,ensure_ascii=False,indent=2,sort_keys=True)+'\n',encoding='utf-8')
    return assets

if __name__=='__main__':
    ap=argparse.ArgumentParser(); ap.add_argument('output'); args=ap.parse_args(); a=build(args.output); print(f'generated {len(a)} connection assets')

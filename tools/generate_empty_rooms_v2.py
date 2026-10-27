#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw
import random, json, argparse

P={
 'floor_bg':(27,34,43,255),'stone_1':(53,63,76,255),'stone_2':(60,70,84,255),
 'stone_3':(67,78,92,255),'stone_4':(48,58,70,255),'stone_dark':(38,46,56,255),
 'stone_chip':(78,89,103,255),'wall_dark':(25,31,39,255),'wall_mid':(67,78,91,255),
 'wall_mid2':(76,87,100,255),'wall_light':(104,116,130,255),'wall_hi':(133,144,156,255),
 'transparent':(0,0,0,0),
}

def save(im,p): p.parent.mkdir(parents=True,exist_ok=True); im.save(p)

def make_floor(seed):
    rnd=random.Random(seed); im=Image.new('RGBA',(32,32),P['floor_bg']); d=ImageDraw.Draw(im)
    tones=[P['stone_1'],P['stone_2'],P['stone_2'],P['stone_3'],P['stone_4']]
    for gy in range(4):
        for gx in range(4):
            x0=gx*8+1; y0=gy*8+1; x1=gx*8+6; y1=gy*8+6
            d.rectangle((x0,y0,x1,y1),fill=rnd.choice(tones))
            corners=[(x0,y0),(x1,y0),(x0,y1),(x1,y1)]
            if rnd.random()<0.8: d.point(rnd.choice(corners),fill=P['stone_chip'])
            if rnd.random()<0.8: d.point(rnd.choice(corners),fill=P['stone_dark'])
            if rnd.random()<0.45:
                side=rnd.randrange(4)
                if side==0: pt=(rnd.randint(x0+1,x1-1),y0)
                elif side==1: pt=(x1,rnd.randint(y0+1,y1-1))
                elif side==2: pt=(rnd.randint(x0+1,x1-1),y1)
                else: pt=(x0,rnd.randint(y0+1,y1-1))
                d.point(pt,fill=P['stone_dark'])
            if rnd.random()<0.28:
                d.point((rnd.randint(x0+2,x1-2),rnd.randint(y0+2,y1-2)),fill=P['stone_dark'])
    return im

def wall_band(o,seed):
    rnd=random.Random(seed); im=Image.new('RGBA',(32,32),P['transparent']); d=ImageDraw.Draw(im)
    if o in 'NS':
        y0,y1=(0,5) if o=='N' else (26,31)
        for seg in range(4):
            x0=seg*8; x1=x0+7; d.rectangle((x0,y0,x1,y1),fill=rnd.choice([P['wall_mid'],P['wall_mid2']]))
            if seg>0: d.line((x0,y0,x0,y1),fill=P['wall_dark'])
            if rnd.random()<0.7: d.point((x0+3,(y0+y1)//2),fill=P['wall_hi'])
        if o=='N': d.line((0,0,31,0),fill=P['wall_dark']); d.line((0,5,31,5),fill=P['wall_light'])
        else: d.line((0,31,31,31),fill=P['wall_dark']); d.line((0,26,31,26),fill=P['wall_light'])
    else:
        x0,x1=(0,5) if o=='W' else (26,31)
        for seg in range(4):
            y0=seg*8; y1=y0+7; d.rectangle((x0,y0,x1,y1),fill=rnd.choice([P['wall_mid'],P['wall_mid2']]))
            if seg>0: d.line((x0,y0,x1,y0),fill=P['wall_dark'])
            if rnd.random()<0.7: d.point(((x0+x1)//2,y0+3),fill=P['wall_hi'])
        if o=='W': d.line((0,0,0,31),fill=P['wall_dark']); d.line((5,0,5,31),fill=P['wall_light'])
        else: d.line((31,0,31,31),fill=P['wall_dark']); d.line((26,0,26,31),fill=P['wall_light'])
    return im

def outer_corner(c,walls):
    im=Image.new('RGBA',(32,32),P['transparent']); pair={'NW':('N','W'),'NE':('N','E'),'SE':('S','E'),'SW':('S','W')}[c]
    for o in pair: im.alpha_composite(walls[o])
    d=ImageDraw.Draw(im); boxes={'NW':(0,0,5,5),'NE':(26,0,31,5),'SE':(26,26,31,31),'SW':(0,26,5,31)}
    d.rectangle(boxes[c],fill=P['wall_mid2'])
    hi={'NW':(5,5),'NE':(26,5),'SE':(26,26),'SW':(5,26)}[c]; dk={'NW':(0,0),'NE':(31,0),'SE':(31,31),'SW':(0,31)}[c]
    d.point(hi,fill=P['wall_hi']); d.point(dk,fill=P['wall_dark']); return im

def inner_corner(c):
    im=Image.new('RGBA',(32,32),P['transparent']); d=ImageDraw.Draw(im)
    if c=='NW':
        d.rectangle((0,0,9,5),fill=P['wall_mid2']); d.rectangle((0,0,5,9),fill=P['wall_mid2']); d.line((0,5,9,5),fill=P['wall_light']); d.line((5,0,5,9),fill=P['wall_light']); d.line((0,0,9,0),fill=P['wall_dark']); d.line((0,0,0,9),fill=P['wall_dark'])
    elif c=='NE':
        d.rectangle((22,0,31,5),fill=P['wall_mid2']); d.rectangle((26,0,31,9),fill=P['wall_mid2']); d.line((22,5,31,5),fill=P['wall_light']); d.line((26,0,26,9),fill=P['wall_light']); d.line((22,0,31,0),fill=P['wall_dark']); d.line((31,0,31,9),fill=P['wall_dark'])
    elif c=='SE':
        d.rectangle((22,26,31,31),fill=P['wall_mid2']); d.rectangle((26,22,31,31),fill=P['wall_mid2']); d.line((22,26,31,26),fill=P['wall_light']); d.line((26,22,26,31),fill=P['wall_light']); d.line((22,31,31,31),fill=P['wall_dark']); d.line((31,22,31,31),fill=P['wall_dark'])
    else:
        d.rectangle((0,26,9,31),fill=P['wall_mid2']); d.rectangle((0,22,5,31),fill=P['wall_mid2']); d.line((0,26,9,26),fill=P['wall_light']); d.line((5,22,5,31),fill=P['wall_light']); d.line((0,31,9,31),fill=P['wall_dark']); d.line((0,22,0,31),fill=P['wall_dark'])
    return im

def build(root):
    root=Path(root); floor=root/'assets/v3/map/floor'; border=root/'assets/v3/map/border'; visual=root/'visual'
    floor.mkdir(parents=True,exist_ok=True); border.mkdir(parents=True,exist_ok=True); visual.mkdir(parents=True,exist_ok=True)
    floors=[]
    for i in range(1,10):
        im=make_floor(7100+i*131); floors.append(im); save(im,floor/f'stone_{i:02d}.png')
    walls={}
    for idx,o in enumerate(['N','E','S','W']):
        walls[o]=wall_band(o,9000+idx); save(walls[o],border/f'wall_{o.lower()}_01.png')
    for c in ['NW','NE','SE','SW']:
        save(outer_corner(c,walls),border/f'corner_outer_{c.lower()}_01.png'); save(inner_corner(c),border/f'corner_inner_{c.lower()}_01.png')
    assets=[]
    for i in range(1,10): assets.append({'id':f'MAP_FLOOR_STONE_{i:02d}','file':f'assets/v3/map/floor/stone_{i:02d}.png','kind':'floor','width':32,'height':32,'rotationSafe':True,'semantic':False,'atlas':{'col':i-1,'row':0}})
    for j,o in enumerate(['N','E','S','W']): assets.append({'id':f'MAP_WALL_{o}_01','file':f'assets/v3/map/border/wall_{o.lower()}_01.png','kind':'border','width':32,'height':32,'rotationSafe':False,'semantic':False,'atlas':{'col':j,'row':1}})
    for j,c in enumerate(['NW','NE','SE','SW'],4): assets.append({'id':f'MAP_CORNER_OUTER_{c}_01','file':f'assets/v3/map/border/corner_outer_{c.lower()}_01.png','kind':'corner_outer','width':32,'height':32,'rotationSafe':False,'semantic':False,'atlas':{'col':j,'row':1}})
    for j,c in enumerate(['NW','NE','SE','SW'],8): assets.append({'id':f'MAP_CORNER_INNER_{c}_01','file':f'assets/v3/map/border/corner_inner_{c.lower()}_01.png','kind':'corner_inner','width':32,'height':32,'rotationSafe':False,'semantic':False,'atlas':{'col':j,'row':1}})
    manifest={'contract':'Monsterhulen Tileset Contract V2','tileSize':32,'mapGrid':{'width':13,'height':13},'atlas':{'width':512,'height':512,'cell':32,'columns':16,'rows':16},'assets':assets}
    (visual/'tileset-manifest-v2.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    return assets

if __name__=='__main__':
    ap=argparse.ArgumentParser(); ap.add_argument('output'); args=ap.parse_args(); a=build(args.output); print(f'generated {len(a)} assets')

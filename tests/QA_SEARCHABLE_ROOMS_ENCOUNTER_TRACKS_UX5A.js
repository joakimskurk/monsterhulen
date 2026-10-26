const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const pass=[],fail=[];const ok=(c,m)=>(c?pass:fail).push(m);
global.document={querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({}),addEventListener:()=>{}};global.window=global;global.navigator={};
for(const code of scripts.slice(0,-1))vm.runInThisContext(code);
let app=scripts[scripts.length-1];
let prefix=app.split('function freshState',1)[0].replace('(()=>{','');
vm.runInThisContext(prefix,{filename:'ux5a-prefix'});
const ids=['GLASS_HEART','WITCH_CAT','CRYSTAL_MACHINE','ZOMBIE_DELIVERY'];
function build(adventureSeed,id,length='VANLIG'){
  let last=null;const rooms=length==='KORT'?9:length==='STORT'?17:13;
  for(let i=0;i<60;i++){
    const layoutSeed=(adventureSeed+Math.imul(i,9973))>>>0;
    try{const d=G.generateDungeon(layoutSeed,rooms);return {d:decorateDungeon(d,null,length,'YNGRE',adventureSeed,id),layoutSeed};}catch(e){last=e;}
  }
  throw last||new Error('no valid dungeon');
}
function findRooms(d){return d.rooms.filter(r=>r.search?.item?.name)}
function sig(d){return findRooms(d).map(r=>`${r.id}:${r.search.item.name}`).sort().join('|')}
function generated(d){return d.rooms.flatMap(r=>(r.events||[]).filter(e=>e&&typeof e==='object'&&e.generated))}
for(const id of ids){
  for(let seed=1;seed<=32;seed++){
    let a,b;try{a=build(seed,id);b=build(seed,id)}catch(e){fail.push(`${id} ${seed} builds: ${e.message}`);continue;}
    const d=a.d,s=d.scenarioSpec,finds=findRooms(d);
    ok(d.rooms.every(r=>r.search?.available===true),`${id} ${seed} every room can be investigated`);
    ok(finds.length>=2,`${id} ${seed} has >=2 optional hidden finds`);
    ok(sig(d)===sig(b.d),`${id} ${seed} hidden-find placement deterministic`);
    const critical=new Set([s.goalRoomId,s.keyRoomId,s.helperRoomId,...(s.itemRoomIds||[]),...(s.clueRoomIds||[])].filter(Boolean));
    for(const r of finds){
      ok(!critical.has(r.id),`${id} ${seed} ${r.id} hidden find is not story-critical`);
      ok(r.id!==d.startRoomId&&r.id!==s.goalRoomId,`${id} ${seed} ${r.id} hidden find avoids start/finale`);
      ok(r.search.searched===false&&r.search.revealed===false&&r.search.taken===false,`${id} ${seed} ${r.id} find starts undisclosed`);
    }
    const encounters=generated(d);
    for(const ev of encounters){
      if(ev.type==='MONSTER')ok(ev.maxHp>=3&&ev.maxHp<=4,`${id} ${seed} ${ev.name} monster hearts 3-4`);
      if(ev.type!=='SKATT'){
        ok(!!ev.purpose&&!!ev.stakes&&!!ev.resolvedWhen&&!!ev.payoff,`${id} ${seed} ${ev.name} has encounter purpose contract`);
        ok(!Array.isArray(ev.progressStages)||ev.progressStages.length>=2,`${id} ${seed} ${ev.name} only authored progress may exist`);
        if(Array.isArray(ev.progressStages)&&ev.progressStages.length>=2)ok(ev.maxProgress===ev.progressStages.length&&ev.progress===0,`${id} ${seed} ${ev.name} authored progress matches stage count`);
        if(ev.type==='FELLE')ok(ev.blocksForward===true,`${id} ${seed} ${ev.name} trap blocks forward movement`);
        if(ev.type==='MYSTISK')ok(!ev.puzzle,`${id} ${seed} ${ev.name} ambient mystery has no random unrelated puzzle`);
      }
    }
    if(finds[0]){
      const before=sig(d),rs=finds[0].search;
      rs.searched=true;rs.attempts=1;rs.revealed=true;rs.taken=true;rs.lastDiceValue=2;rs.lastDiceBand='low';
      const empty=d.rooms.find(r=>!r.search?.item);if(empty)empty.search.searched=true;
      E.enrichDungeon(d,{puzzleLevel:'YNGRE'});
      const kept=d.rooms.find(r=>r.id===finds[0].id).search;
      ok(sig(d)===before,`${id} ${seed} hidden-find plan stable after reenrich`);
      ok(kept.searched===true&&kept.attempts===1&&kept.revealed===true&&kept.taken===true&&kept.lastDiceValue===2&&kept.lastDiceBand==='low',`${id} ${seed} find state survives reenrich`);
      if(empty)ok(empty.search.searched===true&&empty.search.item===null,`${id} ${seed} empty-room investigation survives reenrich`);
    }
    const monster=generated(d).find(ev=>ev.type==='MONSTER');
    if(monster){
      monster.maxHp=2;monster.hp=1;monster.combatStarted=true;delete monster.purpose;delete monster.stakes;delete monster.resolvedWhen;delete monster.payoff;
      E.enrichDungeon(d,{puzzleLevel:'YNGRE'});
      ok(monster.maxHp>=3&&monster.maxHp<=4,`${id} ${seed} active legacy monster max hearts migrates`);
      ok(monster.hp===1,`${id} ${seed} active legacy fight is not healed`);
      ok(!!monster.purpose&&!!monster.stakes&&!!monster.resolvedWhen&&!!monster.payoff,`${id} ${seed} legacy encounter gains purpose contract`);
      monster.maxHp=2;monster.hp=2;monster.combatStarted=false;
      E.enrichDungeon(d,{puzzleLevel:'YNGRE'});
      ok(monster.maxHp>=3&&monster.maxHp<=4&&monster.hp===monster.maxHp,`${id} ${seed} untouched legacy monster upgrades full`);
    }
  }
  for(const length of ['KORT','STORT'])for(let seed=1;seed<=8;seed++){
    let x;try{x=build(seed,id,length)}catch(e){fail.push(`${id} ${length} ${seed} builds: ${e.message}`);continue;}
    const count=findRooms(x.d).length,minimum=length==='KORT'?1:3;
    ok(x.d.rooms.every(r=>r.search?.available===true),`${id} ${length} ${seed} all rooms investigable`);
    ok(count>=minimum,`${id} ${length} ${seed} has >=${minimum} optional hidden finds`);
  }
}
ok(html.includes('data-room-search-start'), 'all-room investigation has explicit start hook');
ok(html.includes('APPEN RØPER IKKE OM DET FINNES ET FUNN HER'), 'investigation does not pre-spoil loot rooms');
ok(html.includes('data-room-search-die'), 'uncertain hidden find uses physical die-face input');
ok(html.includes('function registerRoomSearchDice'), 'room-search dice registration exists');
ok(html.includes("band!=='low'||s.attempts>=2"), 'repeated low hidden-find search is fail-forward');
ok(html.includes('DETTE ER ALLTID ET VALGFRITT FUNN, ALDRI EN STORY-NØKKEL'), 'hidden finds are explicitly optional');
ok(html.includes("if(state.inventory.length>=6){toast('RYGGSEKKEN ER FULL');return;}"), 'full backpack leaves room find untouched');
ok(html.includes('Array.isArray(o.progressStages)&&o.progressStages.length>=2'), 'progress control is gated by authored stages');
ok(!html.includes('ANNEN LØSNING ·'), 'generic blank progress track label removed');
ok(html.includes('HINDRINGEN ER LØST')&&html.includes('MYSTERIET ER LØST')&&html.includes('LØST UTEN KAMP'), 'resolution labels describe encounter purpose');
ok(html.includes('KAMPEN ER FERDIG'), 'zero monster hearts explicitly resolves combat');
ok(html.includes('ET TERNINGKAST AVGJØRER HVA SOM SKJER MED FORSØKET'), 'narrator separates die outcome from whole encounter resolution');
ok(html.includes('FJERNER ALDRI ET MONSTERHJERTE'), 'narrator separates dice from monster hearts');
ok(html.includes('INGEN FREMGANGSRUTER')&&html.includes('DU SKAL IKKE FINNE PÅ TOMME FYLLSTEG'), 'narrator explicitly forbids invented filler steps');
ok(html.includes('normalizeSearchState')&&html.includes('s.item=s.item||null'), 'all-room search state has idempotent normalization');
const reg=(html.match(/function registerEncounterDice\([^]*?\n\}/)||[''])[0];
ok(!/progress\s*(?:\+\+|\+=|=\s*[^;]*\+\s*1)/.test(reg), 'encounter die registration does not auto-advance progress');
ok(!/hp\s*(?:--|-=|=\s*[^;]*-\s*1)/.test(reg), 'encounter die registration does not auto-remove hp');
ok(html.includes('version:12'), 'save schema remains state 12');
console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,blueprints:ids,fail:fail.slice(0,60)},null,2));
if(fail.length)process.exit(1);

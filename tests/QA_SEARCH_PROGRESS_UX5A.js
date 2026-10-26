const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const pass=[],fail=[];const ok=(c,m)=>(c?pass:fail).push(m);
global.document={querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({}),addEventListener:()=>{}};
global.window=global;global.navigator={};
for(const code of scripts.slice(0,-1))vm.runInThisContext(code);
let app=scripts[scripts.length-1];
let prefix=app.split('function freshState',1)[0].replace('(()=>{','');
vm.runInThisContext(prefix,{filename:'ux5a-prefix'});
const ids=['GLASS_HEART','WITCH_CAT','CRYSTAL_MACHINE','ZOMBIE_DELIVERY'];
function build(adventureSeed,id){
  let last=null;
  for(let i=0;i<60;i++){
    const layoutSeed=(adventureSeed+Math.imul(i,9973))>>>0;
    try{
      const d=G.generateDungeon(layoutSeed,13);
      return {d:decorateDungeon(d,null,'VANLIG','YNGRE',adventureSeed,id),layoutSeed};
    }catch(e){last=e;}
  }
  throw last||new Error('no valid dungeon');
}
function typeOf(ev){return typeof ev==='string'?ev:ev?.type}
const treasureNames=new Set((E.TREASURES||[]).map(t=>t.name));
for(const id of ids){
  for(let seed=1;seed<=64;seed++){
    let built;
    try{built=build(seed,id)}catch(e){fail.push(`${id} seed ${seed} builds: ${e.message}`);continue;}
    const d=built.d,s=d.scenarioSpec,spots=d.rooms.filter(r=>r.searchSpot?.version===1);
    ok(spots.length===2,`${id} ${seed} standard adventure has two optional room finds`);
    ok(new Set(spots.map(r=>r.searchSpot.item)).size===spots.length,`${id} ${seed} room finds are unique`);
    for(const r of spots){
      ok(r.id!==d.startRoomId&&r.id!==s.goalRoomId,`${id} ${seed} search find ${r.id} is not start/finale`);
      ok(!(r.events||[]).some(ev=>E.CRITICAL.has(typeOf(ev))),`${id} ${seed} search find ${r.id} avoids critical room`);
      ok(!(r.events||[]).some(ev=>typeOf(ev)==='SKATT'),`${id} ${seed} search find ${r.id} does not stack ambient treasure`);
      ok(treasureNames.has(r.searchSpot.item),`${id} ${seed} search find ${r.searchSpot.item} is curated optional treasure`);
      ok(!(s.gateRequirement?.items||[]).includes(r.searchSpot.item),`${id} ${seed} search find is never progression requirement`);
      ok(r.searchSpot.revealed===false&&r.searchSpot.collected===false,`${id} ${seed} search find starts hidden/uncollected`);
    }
    for(const r of d.rooms)for(const ev of r.events||[]){
      const o=typeof ev==='object'?ev:null;if(!o?.generated||o.type==='SKATT')continue;
      ok(o.progress===0,`${id} ${seed} ${o.name} starts at zero encounter progress`);
      ok(o.maxProgress===3||o.maxProgress===4,`${id} ${seed} ${o.name} has 3-4 progress steps`);
      if(o.type==='MONSTER'){
        ok(o.maxHp===3||o.maxHp===4,`${id} ${seed} ${o.name} has 3-4 monster hearts`);
        ok(o.hp===o.maxHp,`${id} ${seed} ${o.name} starts at full monster hearts`);
      }
    }
  }
}
ok(html.includes('data-search-start'),'room search has explicit start action');
ok(html.includes('data-search-die'),'room search records a physical die face');
ok(html.includes('[1,2,3,4,5,6].map(v=>dieFaceButton'),'room search exposes six physical D6 faces');
ok(html.includes('DERE FANT IKKE NOE Å TA MED ENNÅ'),'low room-search result is fail-forward rather than loot success');
ok(html.includes('spot.revealed=true'),'successful room search reveals the optional find');
ok(html.includes('RYGGSEKKEN ER FULL · FUNNET BLIR LIGGENDE HER'),'full inventory cannot destroy a discovered room find');
ok(html.includes('data-eprogress'),'generated encounters have explicit progress recording');
ok(html.includes('data-esmart'),'generated encounters allow narrator-judged direct smart solutions');
const diceStart=html.indexOf('function registerEncounterDice');
const diceEnd=html.indexOf('function registerClimaxDice',diceStart);
const diceSrc=diceStart>=0&&diceEnd>diceStart?html.slice(diceStart,diceEnd):'';
ok(!!diceSrc,'encounter dice function found');
ok(!/\.progress\s*=|splice\s*\(|resolveGeneratedEncounter|advanceEncounterProgress/.test(diceSrc),'physical encounter die never auto-progresses or resolves encounter');
const encounterStart=html.indexOf('function encounterEventHtml');
const encounterEnd=html.indexOf('function ensureRewardOffers',encounterStart);
const encounterSrc=encounterStart>=0&&encounterEnd>encounterStart?html.slice(encounterStart,encounterEnd):'';
ok(!!encounterSrc,'encounter renderer found');
ok(!encounterSrc.includes('MØTET ER FERDIG'),'generated encounter no longer has generic one-click finished button');
ok(html.includes('KAMPEN ER FERDIG')&&html.includes('resolveGeneratedEncounter'),'zero monster hearts resolves through explicit combat state');
ok(html.includes("version:12")||html.includes("s.version=12"),'save schema remains state 12');
console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,blueprints:ids,fail:fail.slice(0,80)},null,2));
if(fail.length)process.exit(1);

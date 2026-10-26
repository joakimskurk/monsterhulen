const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const pass=[],fail=[];const ok=(c,m)=>(c?pass:fail).push(m);
// Load stable engine modules before the app IIFE.
global.document={querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({}),addEventListener:()=>{}};global.window=global;global.navigator={};
for(const code of scripts.slice(0,-1))vm.runInThisContext(code);
let app=scripts[scripts.length-1];
let prefix=app.split('function freshState',1)[0].replace('(()=>{','');
vm.runInThisContext(prefix,{filename:'adventure-code-prefix'});
const ids=['GLASS_HEART','WITCH_CAT','CRYSTAL_MACHINE','ZOMBIE_DELIVERY'];
function build(seed,id=null){
  let last=null;
  for(let i=0;i<60;i++){
    const layoutSeed=(seed+Math.imul(i,9973))>>>0;
    try{const d=G.generateDungeon(layoutSeed,13);return {d:decorateDungeon(d,null,'VANLIG','YNGRE',seed,id),layoutSeed};}catch(e){last=e;}
  }
  throw last||new Error('no valid dungeon');
}
for(const id of ids){
  const x=build(12345,id).d,s=x.scenarioSpec;
  ok(s.blueprintId===id,id+' stable blueprint id');
  ok(!!s.premise&&!!s.plant&&!!s.payoff,id+' narrator story metadata');
  ok(Array.isArray(x.world?.route)&&x.world.route.length===3,id+' curated route');
}
let a=JSON.stringify(build(22222,null).d);
let b=JSON.stringify(build(22222,null).d);
ok(a===b,'same seed produces byte-identical decorated dungeon JSON');
for(let seed=1;seed<=128;seed++){
  const x1=build(seed,null).d;
  const x2=build(seed,null).d;
  ok(x1.scenarioSpec.blueprintId===x2.scenarioSpec.blueprintId,'blueprint deterministic '+seed);
  ok(JSON.stringify(x1.world.route)===JSON.stringify(x2.world.route),'route deterministic '+seed);
  ok(x1.scenarioSpec.type===ADVENTURE_BLUEPRINT_INDEX[x1.scenarioSpec.blueprintId].type,'blueprint type coherent '+seed);
}
const lock=build(5,'GLASS_HEART').d.scenarioSpec;
ok(lock.keyName==='GLASSNØKKEL'&&lock.goalLabel==='KRYSTALLHJERTET','glass-heart critical pair locked');
const rescue=build(5,'WITCH_CAT').d.scenarioSpec;
ok(rescue.target==='HEKSEKATTEN'&&rescue.clue&&rescue.rescue?.scene,'witch-cat rescue coherent');
const collect=build(5,'CRYSTAL_MACHINE').d.scenarioSpec;
ok(collect.altar==='KRYSTALLMASKINEN'&&collect.parts.join('|')==='RØD KRYSTALL|BLÅ KRYSTALL|GUL KRYSTALL','crystal-machine critical set locked');
const mystery=build(5,'ZOMBIE_DELIVERY').d.scenarioSpec;
ok(mystery.truth.includes('PRØVER Å LEVERE DET TILBAKE')&&mystery.clues.length===3,'zombie mystery curated truth and clues');
ok(html.includes("const ADVENTURE_CODE_VERSION='MH1'"),'adventure code version locked');
ok(html.includes('layoutSeed')&&html.includes('blueprintId')&&html.includes('openNarratorFromCode'),'code carries reproducibility contract');
ok(html.includes('KOPIER FORTELLERKODE')&&html.includes('ÅPNE FORTELLERKODE'),'two-device UI wired');
ok(html.includes('HELE EVENTYRPLANEN')&&html.includes('ALLE ROM · SPOILERE'),'full narrator spoiler plan wired');
console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,blueprints:ids,fail},null,2));if(fail.length)process.exit(1);

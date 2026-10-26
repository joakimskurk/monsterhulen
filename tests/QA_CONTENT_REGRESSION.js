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
vm.runInThisContext(prefix,{filename:'content-regression-prefix'});
const G=global.EventyrGenerator,W=global.EventyrWorld,PZ=global.EventyrPuzzles,E0=global.EventyrEncounters,C0=global.EventyrClimax,CS0=global.HulerCharacterSystem,P0=global.EventyrProgression,R0=global.EventyrCompanions,A0=global.EventyrAssets;

function build(adventureSeed,id,length='VANLIG',puzzleLevel='YNGRE'){
  const rooms=length==='KORT'?9:length==='STORT'?17:13; let last=null;
  for(let i=0;i<80;i++){
    const layoutSeed=(adventureSeed+Math.imul(i,9973))>>>0;
    try{const d=G.generateDungeon(layoutSeed,rooms);return {d:decorateDungeon(d,null,length,puzzleLevel,adventureSeed,id),layoutSeed};}catch(e){last=e;}
  }
  throw last||new Error('no valid dungeon');
}
function knownEntity(id){if(!id)return true;const e=A0.entity(id);return !!e&&!e.unknown;}

ok(scripts.length===11,'11 inline scripts retained');
const registry=A0.validateRegistry();ok(registry.ok,'asset/entity registry validates: '+registry.errors.join(','));

const traitIds=CS0.TRAITS.map(x=>x.id),itemIds=CS0.START_ITEMS.map(x=>x.id);
ok(new Set(traitIds).size===traitIds.length,'character traits have unique ids');
ok(new Set(itemIds).size===itemIds.length,'start items have unique ids');
for(const skill of traitIds){ok(CS0.validateBuild({skill}).ok,`trait ${skill} validates`);for(const startItemId of itemIds)ok(CS0.validateBuild({skill,startItemId}).ok,`build ${skill}+${startItemId} validates`);}

ok(PZ.TEMPLATES.length===36,'36 puzzle templates retained');
const puzzleIds=new Set();
for(const t of PZ.TEMPLATES){
  ok(!puzzleIds.has(t.id),`puzzle id unique ${t.id}`);puzzleIds.add(t.id);
  for(const level of PZ.LEVELS){const b=t.bands?.[level],p={id:t.id,category:t.category,level,prompt:b?.prompt,hint:b?.hint,answer:b?.answer};ok(PZ.validate(p).ok,`puzzle ${t.id}/${level} validates`);}
}

ok(E0.MONSTERS.length===20,'20 monster families retained');
for(const m of E0.MONSTERS){ok(!!m.family&&!!m.entityId,`monster family ${m.family||'?'} has identity`);ok((m.variants||[]).length===2,`monster family ${m.family} has two variants`);ok(knownEntity(m.entityId),`monster ${m.family} entity resolves`);}
for(const [label,bank,min] of [['PERSON',E0.PEOPLE,12],['VENN',E0.FRIENDS,6],['FELLE',E0.TRAPS,6],['MYSTISK',E0.MYSTERIES,6],['SKATT',E0.TREASURES,8]]){ok(bank.length>=min,`${label} content bank size >= ${min}`);const names=bank.map(x=>x.name).filter(Boolean);ok(new Set(names).size===names.length,`${label} names unique`);for(const x of bank)if(x.entityId)ok(knownEntity(x.entityId),`${label} ${x.name||x.entityId} entity resolves`);}
const roomContexts=[{tone:'LYS',beat:'MØTE'},{tone:'MØRK',beat:'SPENNING'},{tone:'RAR',beat:'PUSTEROM'},{tone:'BLANDET',beat:'OPPDAGELSE'}];
for(const type of E0.AMBIENT)for(let i=0;i<40;i++){const room={id:`R${i}`,tone:roomContexts[i%roomContexts.length].tone,beat:roomContexts[i%roomContexts.length].beat};const ev=E0.makeEncounter(type,room,`CONTENT|${type}|${i}`,{puzzleLevel:PZ.LEVELS[i%3]});const v=E0.validateEncounter(ev);ok(v.ok,`${type} generated encounter ${i} validates: ${v.errors.join(',')}`);if(ev.entityId)ok(knownEntity(ev.entityId),`${type} generated entity ${i} resolves`);if(ev.puzzle)ok(PZ.validate(ev.puzzle).ok,`${type} generated puzzle ${i} validates`);}

for(let i=0;i<160;i++){
  const hero=P0.normalizeHero({name:'QA',type:'H14',skill:traitIds[i%traitIds.length],startItemId:itemIds[i%itemIds.length],hp:3,maxHp:3+(i%3),rewards:[],rewardedAdventures:i%8});
  const context={scenarioType:['LOCK','RESCUE','COLLECT','MYSTERY'][i%4],climaxKind:C0.TYPES[i%C0.TYPES.length]};
  const offers=P0.makeOffers(hero,`REWARD|${i}`,context),v=P0.validateOffers(offers,hero);ok(v.ok,`reward offers ${i} validate: ${v.errors.join(',')}`);
  for(const r of offers)ok(!!r.id&&!!r.name&&!!r.desc,`reward offer ${i}/${r.type} complete`);
}

for(const entry of KEY_CATALOG)ok(knownEntity(entry.entityId),`key ${entry.name} entity resolves`);
for(const entry of GOAL_CATALOG)ok(knownEntity(entry.entityId),`goal ${entry.name} entity resolves`);
for(const entry of RESCUE_TARGET_CATALOG)ok(knownEntity(entry.entityId),`rescue ${entry.name} entity resolves`);
for(const set of PART_SET_CATALOG)ok(knownEntity(set.entityId),`part set ${set.id} entity resolves`);
for(const entry of ALTAR_CATALOG)ok(knownEntity(entry.entityId),`altar ${entry.name} entity resolves`);
for(const entry of NARRATOR_ITEM_CATALOG)ok(knownEntity(entry.entityId),`narrator item ${entry.name} entity resolves`);

const ids=['GLASS_HEART','WITCH_CAT','CRYSTAL_MACHINE','ZOMBIE_DELIVERY'];
const lengths=['KORT','VANLIG','STORT'],levels=['YNGRE','MIDT','ELDRE'];
let sampleForRelations=null;
for(const id of ids)for(const length of lengths)for(const level of levels)for(let seed=1;seed<=12;seed++){
  let built;try{built=build(seed,id,length,level)}catch(e){fail.push(`${id}/${length}/${level}/${seed} builds: ${e.message}`);continue;}
  const d=built.d,s=d.scenarioSpec;
  if(!sampleForRelations&&length==='VANLIG')sampleForRelations={d,s};
  const gv=G.validateDungeon(d);ok(gv.ok,`${id}/${length}/${level}/${seed} generator validates: ${(gv.errors||[]).join(',')}`);
  const sv=validateScenario(d,s);ok(sv.ok,`${id}/${length}/${level}/${seed} scenario validates: ${sv.errors.join(',')}`);
  const wv=W.validateWorld(d,s);ok(wv.ok,`${id}/${length}/${level}/${seed} world validates: ${wv.errors.join(',')}`);
  const ev=E0.validateDungeon(d);ok(ev.ok,`${id}/${length}/${level}/${seed} encounters validate: ${ev.errors.join(',')}`);
  const cv=C0.validateDungeon(d,s);ok(cv.ok,`${id}/${length}/${level}/${seed} climax validates: ${cv.errors.join(',')}`);
  for(const r of d.rooms){for(const e of r.events||[]){if(typeof e!=='object')continue;if(e.entityId)ok(knownEntity(e.entityId),`${id}/${seed} event entity ${e.entityId} resolves`);if(e.puzzle)ok(PZ.validate(e.puzzle).ok,`${id}/${seed} room puzzle ${e.puzzle.id} validates`);}}
}

if(sampleForRelations){
  const friend=P0.POOLS.VENN[0],pet=P0.POOLS['KJÆLEDYR'][0];
  for(let i=0;i<64;i++){
    const base=build(1000+i,ids[i%ids.length],'VANLIG','YNGRE'),hero=P0.normalizeHero({name:'QA',type:'H14',skill:'MODIG',hp:3,maxHp:3,rewards:[{...friend,type:'VENN'},{...pet,type:'KJÆLEDYR'}],rewardedAdventures:2});
    const links=R0.planAdventure(hero,base.d,base.d.scenarioSpec,`REL|${i}`);R0.applyAdventureLinks(base.d,links);const rv=R0.validateAdventureLinks(hero,base.d,base.d.scenarioSpec,links);ok(rv.ok,`relation plan ${i} validates: ${rv.errors.join(',')}`);
  }
}

console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,fail:fail.slice(0,100)},null,2));
if(fail.length)process.exit(1);

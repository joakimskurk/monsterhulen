const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const pass=[],fail=[];const ok=(c,m)=>(c?pass:fail).push(m);
global.document={querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({}),addEventListener:()=>{}};global.window=global;global.navigator={};
for(const code of scripts.slice(0,-1))vm.runInThisContext(code);
const app=scripts[scripts.length-1];
const prefix=app.split('function freshState',1)[0].replace('(()=>{','');
vm.runInThisContext(prefix,{filename:'content-regression-prefix'});
vm.runInThisContext('globalThis.__MH_RESCUE=RESCUE_TARGET_CATALOG;globalThis.__MH_BLUEPRINTS=ADVENTURE_BLUEPRINT_INDEX;');
const G=EventyrGenerator,W=EventyrWorld,E=EventyrEncounters,C=EventyrClimax,P=EventyrProgression,CO=EventyrCompanions,PZ=EventyrPuzzles,A=EventyrAssets,CS=HulerCharacterSystem;
const rescue=global.__MH_RESCUE,blueprints=global.__MH_BLUEPRINTS;
const nonempty=v=>typeof v==='string'&&v.trim().length>0;
const unique=a=>new Set(a).size===a.length;
const noNumericBonus=text=>!/(\+\s*1|BONUS\s*DIE|BONUSDIE|EKSTRA\s+TERNING|2D6)/i.test(String(text||''));
const noDiceRequirement=text=>!/(TERNING|D6|BONUSDIE|BONUS\s*DIE|EKSTRA\s+TERNING)/i.test(String(text||''));
const entityOk=id=>!!A.entity(id);

// Asset / hero / identity integrity.
const ar=A.validateRegistry();ok(ar.ok,'asset registry validates');
ok(A.SELECTABLE_HERO_IDS.length===10,'10 selectable base heroes');
ok(unique(A.SELECTABLE_HERO_IDS),'selectable hero ids unique');
for(const id of A.SELECTABLE_HERO_IDS)ok(!!A.hero(id),`hero ${id} resolves`);
ok(CS.TRAITS.length===7,'7 selectable traits');ok(CS.START_ITEMS.length===13,'13 start items');
for(const t of CS.TRAITS)for(const item of CS.START_ITEMS)ok(CS.validateBuild({skill:t.id,startItemId:item.id}).ok,`build ${t.id}/${item.id} valid`);

// Lasting things / progression rewards.
ok(P.POOLS.TING.length===12,'12 lasting things');ok(unique(P.POOLS.TING.map(x=>x.id)),'thing ids unique');ok(unique(P.POOLS.TING.map(x=>x.name)),'thing names unique');
for(const t of P.POOLS.TING){ok(nonempty(t.role)&&nonempty(t.limit)&&nonempty(t.desc),`${t.id} has role/limit/desc`);ok(noNumericBonus(`${t.role} ${t.limit} ${t.desc}`),`${t.id} is affordance not numeric/dice bonus`);ok(!!A.entityForReward({...t,type:'TING'}),`${t.id} resolves to entity art`);}
for(const type of ['EVNE','VENN','KJÆLEDYR']){ok(P.POOLS[type].length=== (type==='EVNE'?12:10),`${type} pool count`);ok(unique(P.POOLS[type].map(x=>x.id)),`${type} ids unique`);ok(unique(P.POOLS[type].map(x=>x.name)),`${type} names unique`);}
for(const scenarioType of ['LOCK','RESCUE','COLLECT','MYSTERY'])for(const climaxKind of C.TYPES)for(let seed=1;seed<=64;seed++){
  const hero=P.normalizeHero({name:'QA',type:'H14',skill:'MODIG',startItemId:'ITEM_ROPE',maxHp:3,hp:3,rewards:[],rewardedAdventures:seed%5});
  const offers=P.makeOffers(hero,seed,{scenarioType,climaxKind});
  ok(P.validateOffers(offers,hero).ok,`offers ${scenarioType}/${climaxKind}/${seed} validate`);
}

// Puzzle bank: 36 templates, 9 categories, 3 age bands, no dice in the puzzle answer itself.
ok(PZ.TEMPLATES.length===36,'36 puzzle templates');
const cats=[...new Set(PZ.TEMPLATES.map(x=>x.category))];ok(cats.length===9,'9 puzzle categories');
for(const cat of cats)ok(PZ.TEMPLATES.filter(x=>x.category===cat).length===4,`${cat} has 4 templates`);
for(const t of PZ.TEMPLATES){
  ok(nonempty(t.id)&&nonempty(t.category)&&nonempty(t.title)&&nonempty(t.scene),`${t.id} base fields`);
  for(const level of PZ.LEVELS){const b=t.bands?.[level];const flat={id:t.id,category:t.category,level,prompt:b?.prompt,hint:b?.hint,answer:b?.answer};ok(PZ.validate(flat).ok,`${t.id}/${level} validates`);ok(noDiceRequirement(`${t.scene} ${b?.prompt} ${b?.hint} ${b?.answer}`),`${t.id}/${level} puzzle itself requires no dice`);}
}

// Treasure / optional find bank: 8 ambient + 6 secret = 14 curated finds.
const finds=[...E.TREASURES,...W.SECRET_REWARDS];ok(E.TREASURES.length===8,'8 ambient treasures');ok(W.SECRET_REWARDS.length===6,'6 secret rewards');ok(finds.length===14,'14 curated optional finds');
ok(unique(finds.map(x=>x.entityId)),'find entity ids unique');ok(unique(finds.map(x=>x.name)),'find names unique');
for(const x of finds){ok(nonempty(x.entityId)&&nonempty(x.name)&&nonempty(x.role)&&nonempty(x.intro)&&nonempty(x.gm),`${x.name} complete find contract`);ok(entityOk(x.entityId),`${x.name} resolves to entity art`);ok(noNumericBonus(`${x.role} ${x.intro} ${x.gm}`),`${x.name} gives affordance not numeric/dice bonus`);}

// NPC and ambient encounter content integrity.
ok(E.PEOPLE.length===12,'12 standard NPCs');ok(unique(E.PEOPLE.map(x=>x.entityId)),'NPC entity ids unique');ok(unique(E.PEOPLE.map(x=>x.name)),'NPC names unique');
for(const n of E.PEOPLE){for(const k of ['entityId','name','intro','want','clue','ways','low','mid','high'])ok(nonempty(n[k]),`${n.name} ${k}`);ok(entityOk(n.entityId),`${n.name} resolves art`);ok(noNumericBonus(`${n.ways} ${Object.values(n.itemHooks||{}).join(' ')}`),`${n.name} hooks do not grant numeric/dice bonus`);}
ok(E.FRIENDS.length===6,'6 ambient friends');ok(unique(E.FRIENDS.map(x=>x.entityId)),'ambient friend ids unique');
for(const f of E.FRIENDS){for(const k of ['entityId','name','intro','want','clue','ways','low','mid','high'])ok(nonempty(f[k]),`${f.name} ${k}`);ok(entityOk(f.entityId),`${f.name} resolves art`);}
ok(E.MONSTERS.length===20,'20 monster families');ok(unique(E.MONSTERS.map(x=>x.entityId)),'monster entity ids unique');
for(const m of E.MONSTERS){ok(Array.isArray(m.variants)&&m.variants.length===2,`${m.entityId} has 2 text variants`);ok(entityOk(m.entityId),`${m.entityId} resolves art`);}

// Persistent friends / pets and profiles.
ok(P.POOLS.VENN.length===10,'10 persistent friends');ok(P.POOLS['KJÆLEDYR'].length===10,'10 persistent pets');
for(const f of P.POOLS.VENN){const pr=CO.returningFriendProfile(f);ok(pr&&nonempty(pr.intro)&&nonempty(pr.want)&&nonempty(pr.ways)&&nonempty(pr.low)&&nonempty(pr.mid)&&nonempty(pr.high),`${f.id} returning profile complete`);ok(!!A.entityForReward({...f,type:'VENN'}),`${f.id} reward art resolves`);}
for(const p of P.POOLS['KJÆLEDYR']){const pr=CO.petProfile(p);ok(pr&&nonempty(pr.signature)&&nonempty(pr.goodFor)&&nonempty(pr.limit)&&Array.isArray(pr.cues),`${p.id} pet profile complete`);ok(!!A.entityForReward({...p,type:'KJÆLEDYR'}),`${p.id} reward art resolves`);ok(noNumericBonus(JSON.stringify(pr)),`${p.id} pet profile is affordance not bonus die`);}

// Rescue catalog.
ok(rescue.length===5,'5 rescue targets');ok(unique(rescue.map(x=>x.id)),'rescue ids unique');ok(unique(rescue.map(x=>x.entityId)),'rescue entity ids unique');
for(const r of rescue){ok(entityOk(r.entityId),`${r.id} resolves art`);ok(Array.isArray(r.clues)&&r.clues.length>=3,`${r.id} has curated clues`);for(const k of ['scene','focus','clue','ways','low','mid','high','returnCue'])ok(nonempty(r.rescue?.[k]),`${r.id} rescue ${k}`);ok(noNumericBonus(JSON.stringify(r)),`${r.id} rescue has no numeric/dice bonus`);}

// Full generated-world content regression across current four blueprints.
const ids=Object.keys(blueprints);ok(ids.length===4,'four active blueprints only');
function build(adventureSeed,id,length='VANLIG',level='YNGRE'){
  const rooms=length==='KORT'?9:length==='STORT'?17:13;let last=null;
  for(let i=0;i<60;i++){const layoutSeed=(adventureSeed+Math.imul(i,9973))>>>0;try{const d=G.generateDungeon(layoutSeed,rooms);return decorateDungeon(d,null,length,level,adventureSeed,id);}catch(e){last=e;}}
  throw last||new Error('no valid dungeon');
}
for(const id of ids)for(let seed=1;seed<=64;seed++){
  let d;try{d=build(seed,id)}catch(e){fail.push(`${id}/${seed} build: ${e.message}`);continue;}
  ok(validateScenario(d,d.scenarioSpec).ok,`${id}/${seed} scenario validates`);
  ok(W.validateWorld(d,d.scenarioSpec).ok,`${id}/${seed} world validates`);
  ok(E.validateDungeon(d).ok,`${id}/${seed} encounters validate`);
  ok(C.validateDungeon(d,d.scenarioSpec).ok,`${id}/${seed} climax validates`);
  const hidden=(d.rooms||[]).flatMap(r=>(r.search?.item?[r.search.item]:[]));
  ok(hidden.every(x=>finds.some(f=>f.name===x.name)),`${id}/${seed} hidden finds come from curated bank`);
}

console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,activeBlueprints:ids,fail:fail.slice(0,100)},null,2));
if(fail.length)process.exit(1);

const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const pass=[],fail=[];const ok=(c,m)=>(c?pass:fail).push(m);
global.document={querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({}),addEventListener:()=>{}};global.window=global;global.navigator={};
for(const code of scripts.slice(0,-1))vm.runInThisContext(code);
let app=scripts[scripts.length-1];
let prefix=app.split('function freshState',1)[0].replace('(()=>{','');
vm.runInThisContext(prefix,{filename:'ux4-prefix'});
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
function prereqRooms(s){
  if(s.type==='LOCK')return [s.keyRoomId];
  if(s.type==='RESCUE')return [s.helperRoomId];
  if(s.type==='COLLECT')return s.itemRoomIds||[];
  return s.clueRoomIds||[];
}
for(const id of ids){
  for(let seed=1;seed<=64;seed++){
    let built;
    try{built=build(seed,id)}catch(e){fail.push(`${id} seed ${seed} builds: ${e.message}`);continue;}
    const d=built.d,s=d.scenarioSpec,gateId=s.gateConnectionId||s.lockConnectionId||d.lockConnectionId,gate=d.connections.find(c=>c.id===gateId);
    ok(!!gate,`${id} ${seed} has progression gate`);
    ok(gate?.locked===true&&gate?.unlocked===false,`${id} ${seed} gate starts locked`);
    const closed=G.bfs(d,d.startRoomId,gateId).dist;
    ok(closed[s.goalRoomId]===undefined,`${id} ${seed} final unreachable before gate`);
    for(const rid of prereqRooms(s))ok(closed[rid]!==undefined,`${id} ${seed} prerequisite ${rid} reachable before gate`);
    const req=s.gateRequirement||gate?.storyGate;
    ok(req?.kind==='FOUND_ALL'&&Array.isArray(req.items)&&req.items.length>=1,`${id} ${seed} explicit prerequisite contract`);
    const hiddenExtras=d.connections.filter(c=>c.hidden&&(c.secret||c.shortcut));
    ok(Array.isArray(hiddenExtras),`${id} ${seed} hidden extras checked as potential bypasses`);
  }
}
ok(html.includes('HEMMELIGE DØRER MÅ OPPDAGES'),'secret door explicitly requires discovery');
ok(html.includes('data-secret-dice'),'secret door uses six-face dice input hook');
ok(html.includes("if(band==='low')")&&html.includes('FANT IKKE DØREN ENNÅ'),'low secret-door roll does not reveal door');
ok(html.includes("c.hidden=false;c.discovered=true")&&html.includes('registerSecretDoorDice'),'successful secret-door search reveals connection');
ok(html.includes('ET GODT TERNINGKAST KAN IKKE HOPPE OVER DENNE PORTEN'),'narrator plan explains hard progression gate');
console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,blueprints:ids,fail:fail.slice(0,50)},null,2));
if(fail.length)process.exit(1);

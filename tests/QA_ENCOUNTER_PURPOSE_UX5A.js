const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const pass=[],fail=[];const ok=(c,m)=>(c?pass:fail).push(m);
global.document={querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({}),addEventListener:()=>{}};global.window=global;global.navigator={};
for(const code of scripts.slice(0,-1))vm.runInThisContext(code);
let app=scripts[scripts.length-1];
let prefix=app.split('function freshState',1)[0].replace('(()=>{','');
vm.runInThisContext(prefix,{filename:'encounter-purpose-prefix'});

const types=['MONSTER','PERSON','VENN','FELLE','MYSTISK'];
const room={id:'QA_ROOM',zoneName:'REGNBUEDALEN',tone:'LYS',beat:'SPENNING'};
for(const type of types){
  for(let seed=1;seed<=120;seed++){
    const ev=E.makeEncounter(type,room,`PURPOSE|${type}|${seed}`,{puzzleLevel:'YNGRE'});
    ok(!!ev.purpose,`${type}/${seed} has purpose`);
    ok(!!ev.stakes,`${type}/${seed} has stakes`);
    ok(!!ev.resolvedWhen,`${type}/${seed} has resolvedWhen`);
    ok(!!ev.payoff,`${type}/${seed} has payoff`);
    ok(!Array.isArray(ev.progressStages)||ev.progressStages.length>=2,`${type}/${seed} progress exists only as authored stages`);
    if(!Array.isArray(ev.progressStages)){
      ok(ev.progress===null&&ev.maxProgress===null,`${type}/${seed} has no generic blank progress track`);
    }
    if(type==='FELLE')ok(ev.blocksForward===true,`${type}/${seed} blocks forward movement`);
    else ok(ev.blocksForward===false,`${type}/${seed} does not become a generic movement gate`);
    if(type==='MYSTISK')ok(!ev.puzzle,`${type}/${seed} has no random unrelated puzzle`);
  }
}

let rainbow=null;
for(let seed=1;seed<=3000&&!rainbow;seed++){
  const ev=E.makeEncounter('FELLE',room,`RAINBOW|${seed}`);
  if(ev.name==='REGNBUENETTET')rainbow=ev;
}
ok(!!rainbow,'REGNBUENETTET can be generated for contract test');
if(rainbow){
  ok(rainbow.blocksForward===true,'REGNBUENETTET is a real forward obstacle');
  ok(rainbow.resolvedWhen.includes('KOMMET FORBI')||rainbow.resolvedWhen.includes('FELLEN TRYGG'),'REGNBUENETTET has explicit solve criterion');
  ok(!!rainbow.payoff,'REGNBUENETTET has explicit payoff');
  ok(rainbow.progress===null&&rainbow.maxProgress===null,'REGNBUENETTET has no arbitrary 3/4-box track');
}

ok(!html.includes('ANNEN LØSNING ·'),'generic ANNEN LØSNING progress UI removed');
ok(html.includes('DU SKAL IKKE FINNE PÅ TOMME FYLLSTEG'),'narrator is explicitly told not to invent filler steps');
ok(html.includes('function blockingForwardEncounter'),'runtime has encounter movement blocker');
ok(html.includes('target.id!==state.previousRoomId'),'blocking obstacle allows retreat but stops forward travel');
ok(html.includes("toast(`${blocker.name} SPERRER VEIEN VIDERE`)"),'blocked forward move gives fiction feedback');
ok(html.includes("o?.type==='FELLE')return'HINDRINGEN ER LØST'"),'trap resolve action is purpose-specific');
ok(html.includes('state.previousRoomId=fromRoomId'),'runtime remembers entry direction for retreat');
ok(html.includes('type===\'MYSTISK\'&&t.useRandomPuzzle===true'),'ambient random puzzles are opt-in instead of automatic');

// Execute the real move() source against a tiny three-room harness to prove trap blocking semantics.
const moveSource=(html.match(/function move\(dir\)\{[\s\S]*?\n\}/)||[''])[0];
const blockerSource=(html.match(/function blockingForwardEncounter\(r=currentRoom\(\)\)\{[\s\S]*?\n\}/)||[''])[0];
ok(!!moveSource&&!!blockerSource,'real movement functions extracted for behavioral trap test');
if(moveSource&&blockerSource){
  const ctx={console};ctx.globalThis=ctx;
  vm.createContext(ctx);
  vm.runInContext(`
    let state;
    const rooms={A:{id:'A',name:'A',events:[]},B:{id:'B',name:'B',events:[]},C:{id:'C',name:'C',events:[]}};
    const conns={w:{id:'BA',a:'B',b:'A',locked:false,unlocked:false},e:{id:'BC',a:'B',b:'C',locked:false,unlocked:false}};
    function currentRoom(){return rooms[state.currentRoomId]}
    function normalizeEvent(e){return typeof e==='string'?{type:e}:e}
    function connectionForDir(id,dir){if(id==='B')return conns[dir]||null;if(id==='A'&&dir==='e')return conns.w;if(id==='C'&&dir==='w')return conns.e;return null}
    function otherRoomId(c,id){return c.a===id?c.b:c.a}
    function roomById(id){return rooms[id]}
    function progressionGateStatus(){return {ready:false,label:'LOCKED'}}
    function toast(x){state.lastToast=x}
    function addLog(x){(state.logs||(state.logs=[])).push(x)}
    function save(){} function render(){} function renderRoom(){} function renderScenario(){}
    function spec(){return {type:'LOCK'}} function completeScenario(){}
    ${blockerSource}
    ${moveSource}
    globalThis.__qa={rooms,run(){
      rooms.B.events=[{type:'FELLE',generated:true,name:'REGNBUENETTET',blocksForward:true}];
      state={currentRoomId:'B',previousRoomId:'A',scenario:{seenGate:false}};
      move('e');const blocked=state.currentRoomId==='B'&&String(state.lastToast||'').includes('SPERRER VEIEN VIDERE');
      state.lastToast='';move('w');const retreated=state.currentRoomId==='A';
      rooms.B.events=[];state={currentRoomId:'B',previousRoomId:'A',scenario:{seenGate:false}};move('e');const forwardWhenClear=state.currentRoomId==='C';
      return {blocked,retreated,forwardWhenClear};
    }};
  `,ctx);
  const r=ctx.__qa.run();
  ok(r.blocked,'active trap blocks forward movement in real move()');
  ok(r.retreated,'active trap still allows retreat in real move()');
  ok(r.forwardWhenClear,'resolved/absent trap allows forward movement');
}

console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,fail:fail.slice(0,80)},null,2));
if(fail.length)process.exit(1);

const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const pass=[],fail=[];const ok=(c,m)=>(c?pass:fail).push(m);
global.document={querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({}),addEventListener:()=>{}};global.window=global;global.navigator={};
for(const code of scripts.slice(0,-1))vm.runInThisContext(code);
let app=scripts[scripts.length-1];
let prefix=app.split('function freshState',1)[0].replace('(()=>{','');
vm.runInThisContext(prefix,{filename:'authored-mysteries-prefix'});

ok(Array.isArray(E.MYSTERIES)&&E.MYSTERIES.length>=6,'mystery bank exists');
ok(E.MYSTERIES.every(m=>m.useRandomPuzzle!==true),'ambient mystery bank has no random-puzzle opt-in');
for(const m of E.MYSTERIES){
  ok(typeof m.improvise==='string'&&m.improvise.length>40,`${m.name} has explicit improv contract`);
}
ok(html.includes("type==='MYSTISK'&&t.useRandomPuzzle===true"),'runtime requires explicit mystery puzzle opt-in');
ok(!html.includes("type==='MYSTISK'&&PZ?PZ.choose"),'runtime has no unconditional mystery puzzle attachment');

const tones=['LYS','MØRK','RAR','BLANDET'],beats=['MØTE','SPENNING','PUSTEROM','OPPDAGELSE'],levels=['YNGRE','MIDT','ELDRE'];
const seen=new Set();
for(let seed=1;seed<=1024;seed++){
  const room={id:`R${seed}`,zoneName:`ZONE_${seed%4}`,tone:tones[seed%tones.length],beat:beats[seed%beats.length]};
  const ev=E.makeEncounter('MYSTISK',room,`AUTHORED_ONLY|${seed}`,{puzzleLevel:levels[seed%levels.length]});
  seen.add(ev.entityId);
  const v=E.validateEncounter(ev);
  ok(v.ok,`mystery ${seed} validates: ${v.errors.join(',')}`);
  ok(!ev.puzzle,`mystery ${seed} has no random puzzle`);
  ok(ev.purpose==='VALGFRITT IMPROVISASJONSMYSTERIUM',`mystery ${seed} explicitly authored as improv mystery`);
  ok(ev.blocksForward===false,`mystery ${seed} does not become story gate`);
  ok(typeof ev.improvisePrompt==='string'&&ev.improvisePrompt.length>40,`mystery ${seed} carries improv prompt`);
}
for(const m of E.MYSTERIES)ok(seen.has(m.entityId),`${m.name} appeared in deterministic sample`);

console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,seen:[...seen],fail:fail.slice(0,50)},null,2));
if(fail.length)process.exit(1);

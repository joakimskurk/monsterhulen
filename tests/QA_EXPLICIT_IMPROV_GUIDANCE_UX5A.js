const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const pass=[],fail=[]; const ok=(c,m)=>(c?pass:fail).push(m);
global.document={querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({}),addEventListener:()=>{}};global.window=global;global.navigator={};
for(const code of scripts.slice(0,-1))vm.runInThisContext(code);
let app=scripts[scripts.length-1];
let prefix=app.split('function freshState',1)[0].replace('(()=>{','');
vm.runInThisContext(prefix,{filename:'ux5a-prefix'});

ok(Array.isArray(E.MYSTERIES)&&E.MYSTERIES.length>=6,'mystery bank exists');
for(const m of E.MYSTERIES){
  ok(typeof m.improvise==='string'&&m.improvise.length>40,`${m.name} declares explicit narrator improvisation`);
}
const room={id:'R_IMPROV',zoneName:'RAR_SONE',tone:'RAR',beat:'PUST',events:[]};
let book=null;
for(let seed=1;seed<500&&!book;seed++){
  const ev=E.makeEncounter('MYSTISK',room,`BOOK-${seed}`,{puzzleLevel:'YNGRE'});
  if(ev.entityId==='MYSTERY_WRITING_BOOK')book=ev;
}
ok(!!book,'writing book can be generated');
if(book){
  ok(book.purpose==='VALGFRITT IMPROVISASJONSMYSTERIUM','writing book is labelled improvisation mystery');
  ok(typeof book.improvisePrompt==='string'&&book.improvisePrompt.includes('INGEN FORHÅNDSBESTEMT BESKJED'),'writing book says message is not predetermined');
  ok(book.blocksForward===false,'writing book is not a story gate');
  const gm=E.gmSummary(book,'MODIG',null,[],[]);
  ok(gm.includes('FORTELLER-IMPROVISASJON'),'narrator summary has prominent improvisation block');
  ok(gm.includes('INGEN SKJULT FASIT'),'narrator summary explicitly says there is no hidden answer');
  ok(gm.includes('DET FINNES IKKE EN STØRRE FORHÅNDSBESTEMT PLAN'),'narrator summary explicitly says there is no larger predetermined plan');
  ok(gm.includes('IKKE GJØR DEN TIL EN NY OBLIGATORISK STORY-NØKKEL'),'book-specific guardrail forbids invented mandatory key');
  ok(gm.includes('KAN GI STEMNING, ET VALGFRITT HINT ELLER EN LITEN SIDEOPPDAGELSE'),'generic improvisation scope is explicit');
}
ok(html.includes("improvisePrompt:t.improvise"),'generated mystery carries improvisation prompt into encounter state');
ok(html.includes("entry.improvise?'VALGFRITT IMPROVISASJONSMYSTERIUM'"),'mystery purpose distinguishes explicit improvisation');
ok(html.includes('DETTE MYSTERIET HAR MED VILJE IKKE EN SKJULT FASIT I APPEN'),'narrator guide explains intentional improvisation');
ok(html.includes('MÅ IKKE OPPRETTE EN NY OBLIGATORISK STORY-NØKKEL'),'improvisation guardrail protects story-critical logic');

console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,fail},null,2));
if(fail.length)process.exit(1);

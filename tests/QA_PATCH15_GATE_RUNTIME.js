const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
const pass=[],fail=[];const ok=(c,m)=>{(c?pass:fail).push(m)};
const ctx={console,TextEncoder,TextDecoder,Uint8Array,Math,Date,JSON,Set,Map,Object,Array,String,Number,Boolean,RegExp,Error,TypeError,parseInt,parseFloat,isFinite,structuredClone:global.structuredClone};ctx.globalThis=ctx;
vm.createContext(ctx);
for(let i=0;i<scripts.length-1;i++){
  try{new vm.Script(scripts[i],{filename:`inline-${i+1}.js`}).runInContext(ctx);ok(true,`module ${i+1} executes`)}
  catch(e){ok(false,`module ${i+1} executes: ${e.message}`);break}
}
ok(!!ctx.EventyrGenerator,'generator api available');
ok(!!ctx.EventyrWorld,'world api available');
ok(!!ctx.EventyrEncounters,'encounter api available');
if(ctx.EventyrGenerator&&ctx.EventyrWorld&&ctx.EventyrEncounters){
  const G=ctx.EventyrGenerator,W=ctx.EventyrWorld,E=ctx.EventyrEncounters;
  const seen={trap:0,rainbow:0,mystery:0,book:0,monster:0};
  for(let seed=1;seed<=200;seed++){
    try{
      const d=G.generateDungeon(seed,13);
      const spec={type:'NONE',goalRoomId:null,keyRoomId:null,lockConnectionId:null};
      d.lockConnectionId=null; d.goalRoomId=null; d.keyRoomId=null;
      for(const r of d.rooms) r.events=[];
      W.enrichDungeon(d,spec,{length:'VANLIG'});
      E.enrichDungeon(d,{puzzleLevel:'YNGRE'});
      const v=E.validateDungeon(d);ok(v.ok,`seed ${seed} encounters validate${v.ok?'':': '+v.errors.join(',')}`);
      for(const r of d.rooms){
        ok(typeof r.desc==='string'&&r.desc.startsWith(r.name+'. '),`seed ${seed} ${r.id} desc begins room name`);
        ok(!r.desc.startsWith(r.zoneName+'. '),`seed ${seed} ${r.id} desc does not begin zone name`);
        for(const ev of r.events||[]){
          if(!ev||typeof ev==='string') continue;
          if(ev.generated&&ev.type==='FELLE'){
            seen.trap++; if(ev.name==='REGNBUENETTET') seen.rainbow++;
            ok(ev.blocksForward===true,`seed ${seed} trap blocks forward`);
            ok(!!ev.purpose&&!!ev.stakes&&!!ev.resolvedWhen&&!!ev.payoff,`seed ${seed} trap has purpose contract`);
            ok(!Array.isArray(ev.progressStages)||ev.progressStages.length>=2,`seed ${seed} trap has no filler progress`);
          }
          if(ev.generated&&ev.type==='MYSTISK'){
            seen.mystery++;
            ok(!ev.puzzle,`seed ${seed} ambient mystery has no random puzzle`);
            if(ev.name==='BOKA SOM SKRIVER TILBAKE'){
              seen.book++;
              ok(typeof ev.improvisePrompt==='string'&&ev.improvisePrompt.includes('INGEN FORHÅNDSBESTEMT BESKJED'),`seed ${seed} book has explicit improv prompt`);
              ok(ev.blocksForward===false,`seed ${seed} book is not story gate`);
            }
          }
          if(ev.generated&&ev.type==='MONSTER'){
            seen.monster++;
            const expected=r.beat==='SPENNING'?4:3;
            ok(ev.maxHp===expected&&ev.hp===expected,`seed ${seed} monster heart scale ${expected}`);
          }
        }
      }
    }catch(e){ok(false,`seed ${seed} runtime generation: ${e.stack||e}`);break}
  }
  const sampleRoom={id:'RTEST',zoneName:'KRYSTALLGROTTEN',tone:'RAR',beat:'MØTE'};
  for(let i=0;i<500;i++){
    const m=E.makeEncounter('MYSTISK',sampleRoom,'MYST|'+i,{puzzleLevel:'YNGRE'});
    seen.mystery++; ok(!m.puzzle,`direct mystery ${i} has no random puzzle`);
    if(m.name==='BOKA SOM SKRIVER TILBAKE'){seen.book++; ok(typeof m.improvisePrompt==='string'&&m.improvisePrompt.includes('INGEN FORHÅNDSBESTEMT BESKJED'),`direct book ${i} explicit improv`); ok(m.blocksForward===false,`direct book ${i} not blocking`);}
    const t=E.makeEncounter('FELLE',sampleRoom,'TRAP|'+i,{puzzleLevel:'YNGRE'});
    if(t.name==='REGNBUENETTET'){seen.rainbow++; ok(t.blocksForward===true&&!!t.resolvedWhen&&!!t.payoff,`direct rainbow ${i} contract`); ok(!Array.isArray(t.progressStages),`direct rainbow ${i} has no generic progress`);}
  }
  ok(seen.trap>0,`generated traps covered: ${seen.trap}`);
  ok(seen.rainbow>0,`REGNBUENETTET covered: ${seen.rainbow}`);
  ok(seen.mystery>0,`generated/direct mysteries covered: ${seen.mystery}`);
  ok(seen.book>0,`BOKA SOM SKRIVER TILBAKE covered: ${seen.book}`);
  ok(seen.monster>0,`generated monsters covered: ${seen.monster}`);
}
console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,fail:fail.slice(0,20)},null,2));
if(fail.length)process.exit(1);

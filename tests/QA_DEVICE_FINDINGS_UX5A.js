const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const pass=[],fail=[];const ok=(c,m)=>(c?pass:fail).push(m);
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
for(let i=0;i<scripts.length;i++)try{new vm.Script(scripts[i]);pass.push(`script ${i+1} syntax`)}catch(e){fail.push(`script ${i+1} syntax: ${e.message}`)}
const move=(html.match(/function move\(dir\)\{[\s\S]*?\n\}/)||[''])[0];
ok(move.includes("state.inventory.splice(keyIndex,1)"),'used story key is removed from inventory');
ok(move.includes('NØKKELEN BLIR SITTENDE I LÅSEN'),'key use is explicit in fiction');
const unlockPos=move.indexOf("c.unlocked=true"), returnPos=move.indexOf("save();render();toast",unlockPos), targetPos=move.indexOf('const target=roomById');
ok(unlockPos>=0&&returnPos>unlockPos&&targetPos>returnPos&&move.slice(returnPos,targetPos).includes('return;'),'opening a ready story gate returns before traversal');
ok(html.includes('<summary>FORTELLERHJELP</summary>'),'puzzle card exposes narrator help');
ok(html.includes('LA BARNET TENKE UTEN TERNING'),'puzzle explicitly says no die for the puzzle itself');
ok(html.includes('DET GIR 1 FREMGANG I MØTET'),'puzzle narrator help explains progress consequence');
ok(html.includes('PUZZLET ER LØST +1 FREMGANG'),'puzzle solve gives explicit progress feedback');
ok(html.includes("ev.progress=Math.min(ev.maxProgress,Math.max(0,ev.progress||0)+1)"),'puzzle solve advances exactly one encounter progress step');
console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,fail},null,2));
if(fail.length)process.exit(1);

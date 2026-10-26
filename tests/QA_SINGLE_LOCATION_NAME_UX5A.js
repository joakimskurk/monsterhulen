const fs=require('fs'),vm=require('vm'),path=require('path');
const root=process.argv[2]||'.';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const pass=[],fail=[];const ok=(c,m)=>(c?pass:fail).push(m);
const scripts=[...html.matchAll(/<script(?:[^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
for(let i=0;i<scripts.length;i++)try{new vm.Script(scripts[i]);pass.push(`script ${i+1} syntax`)}catch(e){fail.push(`script ${i+1} syntax: ${e.message}`)}
ok(!html.includes('id="roomToneBadge"'),'child room banner has no second area-name badge');
ok(!html.includes("$('#roomToneBadge').textContent"),'renderMeta does not render zone as a second location name');
ok(html.includes("const location=room?safeText(room.name):'UKJENT STED'"),'continue summary uses room name only');
ok(!html.includes("const location=room?`${safeText(room.name)}${room.zoneName?"),'continue summary no longer appends zone name');
ok(html.includes('return `<strong>${r.name} · ${r.beat}</strong>'),'narrator current-location heading uses canonical room name');
ok(!html.includes('<b>${critical?\'★ \':\'\'}${r.name}</b> · ${r.zoneName} · ${r.beat}'),'full narrator plan does not present zone as a second location name');
ok(html.includes('room.zoneId=key;room.zoneName=zone.name'),'zone metadata remains available internally');
ok(html.includes("room?.zoneName||''"),'zone metadata still contributes to deterministic encounter generation');
console.log(JSON.stringify({ok:fail.length===0,passCount:pass.length,failCount:fail.length,fail},null,2));
if(fail.length)process.exit(1);

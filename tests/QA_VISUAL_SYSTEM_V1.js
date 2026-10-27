const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const files={
  tokens:fs.readFileSync(path.join(root,'visual/tokens-v1.css'),'utf8'),
  skin:fs.readFileSync(path.join(root,'visual/runtime-skin-v1.css'),'utf8'),
  proto:fs.readFileSync(path.join(root,'prototypes/visual-system-v1/index.html'),'utf8'),
  system:fs.readFileSync(path.join(root,'visual/VISUAL_SYSTEM_V1.md'),'utf8'),
  asset:fs.readFileSync(path.join(root,'visual/ASSET_CONTRACT_VISUAL_V1.md'),'utf8')
};
let pass=0,fail=0;function ok(cond,name){if(cond){pass++;console.log('PASS',name)}else{fail++;console.error('FAIL',name)}}
ok(files.skin.includes('No gameplay/state selectors'),'skin declares visual-only boundary');
ok(!/display\s*:\s*none[^\n]*#(?:interactBtn|dmBtn|bagBtn)/i.test(files.skin),'skin does not hide core named actions');
ok(files.skin.includes('--mh-touch:48px')||files.tokens.includes('--mh-touch:48px'),'48px touch token exists');
ok(files.proto.includes('MÅNESTEINHALLEN'),'prototype contains canonical room example');
ok(files.proto.includes('SE DEG RUNDT'),'prototype keeps exploratory action');
ok(files.proto.includes('FORTELLER'),'prototype exposes narrator entry');
ok(files.proto.includes('RYGGSEKK'),'prototype exposes inventory');
ok(files.proto.includes('♥ ♥ ♥'),'prototype shows heart state');
ok(files.asset.includes('Asset Contract 2.4.0'),'visual asset doc preserves current asset contract');
ok(files.asset.includes('no baked-in Norwegian/English text'),'asset art forbids baked-in UI text');
ok(files.system.includes('one visible room identity'),'visual system preserves one-room-identity rule');
ok(files.system.includes('owned items do not auto-apply solutions'),'visual system preserves child action rule');
ok(files.system.includes('hidden graph information must not leak'),'visual system protects knowledge state');
ok(!files.proto.includes('http://')&&!files.proto.includes('https://'),'prototype has no remote dependencies');
console.log(`RESULT ${pass} PASS / ${fail} FAIL`);process.exitCode=fail?1:0;

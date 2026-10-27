const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const specPath = path.join(ROOT, 'visual', 'asset-size-standard-v2.json');
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

let pass = 0;
let fail = 0;
function check(name, ok) {
  if (ok) { pass++; console.log('PASS', name); }
  else { fail++; console.error('FAIL', name); }
}
function same(a,b){ return JSON.stringify(a)===JSON.stringify(b); }

check('runtime grid is 13x13', spec.runtimeGrid.columns===13 && spec.runtimeGrid.rows===13);
check('logical cell is 32px', spec.runtimeGrid.logicalCellPx===32);
check('full map is 416x416 at 1x', spec.runtimeGrid.mapWidthPx1x===416 && spec.runtimeGrid.mapHeightPx1x===416);
check('fractional scaling forbidden', spec.runtimeGrid.fractionalScalingAllowed===false);
check('atlas is 512x512', spec.atlas.width===512 && spec.atlas.height===512);
check('atlas slots are 32x32', spec.atlas.slotWidth===32 && spec.atlas.slotHeight===32);
check('atlas is 16x16 slots', spec.atlas.columns===16 && spec.atlas.rows===16);
check('floor is 32x32', same(spec.classes.mapFloor.canvas,[32,32]));
check('wall is 32x32 with 6px depth', same(spec.classes.mapWall.canvas,[32,32]) && spec.classes.mapWall.wallDepthPx===6);
check('outer corner is 32x32', same(spec.classes.mapCornerOuter.canvas,[32,32]));
check('inner corner is 32x32', same(spec.classes.mapCornerInner.canvas,[32,32]));
check('connection is 32x32 with 20px opening', same(spec.classes.mapConnection.canvas,[32,32]) && spec.classes.mapConnection.openingSpanPx===20);
check('map actor is 32x32 with 24x28 safe box', same(spec.classes.mapActor.canvas,[32,32]) && same(spec.classes.mapActor.visibleMax,[24,28]) && spec.classes.mapActor.baselineY===30);
check('marker is 32x32 with 24x24 safe box', same(spec.classes.mapMarker.canvas,[32,32]) && same(spec.classes.mapMarker.visibleMax,[24,24]));
check('map item is 32x32 with 22x22 safe box', same(spec.classes.mapItem.canvas,[32,32]) && same(spec.classes.mapItem.visibleMax,[22,22]));
check('UI icon is 24x24 with 20x20 safe box', same(spec.classes.uiIcon.canvas,[24,24]) && same(spec.classes.uiIcon.visibleMax,[20,20]));
check('UI ornaments are 16x16 and non-stretching', same(spec.classes.uiOrnamentCorner.canvas,[16,16]) && same(spec.classes.uiOrnamentEdge.canvas,[16,16]) && spec.classes.uiOrnamentCorner.stretchAllowed===false);
check('character compatibility sizes preserved', same(spec.assetContract24Compatibility.character.thumbnail,[64,64]) && same(spec.assetContract24Compatibility.character.large,[128,128]));
check('item compatibility sizes preserved', same(spec.assetContract24Compatibility.item.thumbnail,[32,32]) && same(spec.assetContract24Compatibility.item.large,[64,64]));
check('scene compatibility sizes preserved', same(spec.assetContract24Compatibility.scene.thumbnail,[64,48]) && same(spec.assetContract24Compatibility.scene.large,[192,128]));
check('symbolic compatibility sizes preserved', same(spec.assetContract24Compatibility.symbolic.thumbnail,[32,32]) && same(spec.assetContract24Compatibility.symbolic.large,[64,64]));
check('state remains outside art', ['current','selected','reachable','focus','fog'].every(x=>spec.runtimeStateNotBakedIntoArt.includes(x)));
check('manual atlas cropping forbidden', spec.generationWorkingMaster.manualAtlasCroppingAllowed===false);

console.log(`RESULT ${pass} PASS / ${fail} FAIL`);
process.exitCode = fail ? 1 : 0;

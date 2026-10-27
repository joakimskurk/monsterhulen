const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const svg=fs.readFileSync(path.join(root,'visual/ui-symbols-v1_1.svg'),'utf8');
const doc=fs.readFileSync(path.join(root,'visual/UI_SYMBOLS_V1_1.md'),'utf8');
const required=['mh-map','mh-eye','mh-backpack','mh-narrator','mh-lock','mh-blocked','mh-current','mh-visited','mh-travel','mh-clue','mh-trade','mh-friend','mh-guardian','mh-reward'];
let pass=0,fail=0;function check(n,o){if(o){pass++;console.log('PASS',n)}else{fail++;console.log('FAIL',n)}}
check('sprite is SVG',svg.trimStart().startsWith('<svg'));
check('all 14 symbols present',required.every(id=>svg.includes(`id="${id}"`)));
check('symbol IDs unique',(svg.match(/<symbol id=/g)||[]).length===14);
check('no embedded text elements',!/<text\b/i.test(svg));
check('uses currentColor',svg.includes('currentColor'));
check('icons use 24x24 viewboxes',(svg.match(/viewBox="0 0 24 24"/g)||[]).length>=15);
check('docs require visible labels',doc.includes('icons supplement visible labels'));
check('docs prohibit per-cell current marker',doc.includes('never on every underlying grid cell'));
console.log(`RESULT ${pass} PASS / ${fail} FAIL`);if(fail)process.exit(1);

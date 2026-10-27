(()=>{
 const A={"hero_H01_witch":"assets/v13/hero_H01_witch.png","map_lock":"assets/v13/map_lock.png","room_mushroom":"assets/v13/room_mushroom.png","button_blue":"assets/v13/button_blue.png","item_key":"assets/v13/item_key.png","button_green":"assets/v13/button_green.png","item_lantern":"assets/v13/item_lantern.png","hero_H06_wizard":"assets/v13/hero_H06_wizard.png","item_rope":"assets/v13/item_rope.png","room_lake":"assets/v13/room_lake.png","hero_H20_forest_elf":"assets/v13/hero_H20_forest_elf.png","hero_H14_human":"assets/v13/hero_H14_human.png","button_orange":"assets/v13/button_orange.png","ui_panel_dark":"assets/v13/ui_panel_dark.png","hero_H09_elf":"assets/v13/hero_H09_elf.png","hero_H19_cat":"assets/v13/hero_H19_cat.png","item_crystal":"assets/v13/item_crystal.png","hero_H11_dwarf":"assets/v13/hero_H11_dwarf.png","map_current":"assets/v13/map_current.png","map_chest":"assets/v13/map_chest.png","room_cave":"assets/v13/room_cave.png","map_unknown":"assets/v13/map_unknown.png","button_purple":"assets/v13/button_purple.png","hero_H15_panda":"assets/v13/hero_H15_panda.png"};
 const HERO={"CHAR_HERO_14":"hero_H14_human","CHAR_HERO_15":"hero_H15_panda","CHAR_HERO_19":"hero_H19_cat","CHAR_HERO_01":"hero_H01_witch","CHAR_HERO_06":"hero_H06_wizard","CHAR_HERO_09":"hero_H09_elf","CHAR_HERO_20":"hero_H20_forest_elf","CHAR_HERO_11":"hero_H11_dwarf"};
 const $=(s,r=document)=>r.querySelector(s);
 function sceneFor(room){
   const t=((room?.name||'')+' '+(room?.desc||'')).toUpperCase();
   if(/SOPP|SPORE|MYCEL/.test(t)) return [A.room_mushroom,'SOPPHULE'];
   if(/SJØ|VANN|FOSS|ELV|INNSJØ/.test(t)) return [A.room_lake,'UNDERJORDISK VANN'];
   return [A.room_cave,'HULE'];
 }
 function itemAsset(text){
   const t=(text||'').toUpperCase();
   if(/NØKKEL|KEY/.test(t)) return A.item_key;
   if(/TAU|REP/.test(t)) return A.item_rope;
   if(/LYKT|LANTERN/.test(t)) return A.item_lantern;
   if(/KRYSTALL|RUNE|MÅNE|SOL|STJERNE/.test(t)) return A.item_crystal;
   return '';
 }
 function ensureScene(){
   const panel=$('.mobilePanel[data-panel="room"]'); if(!panel)return;
   let box=$('#v13Scene');
   if(!box){box=document.createElement('div');box.id='v13Scene';box.className='v13Scene';box.innerHTML='<img alt="" aria-hidden="true"><span class="v13SceneLabel"></span>';const h=panel.querySelector('h3');h.insertAdjacentElement('afterend',box);}
   let room=null;try{room=typeof currentRoom==='function'?currentRoom():null}catch(e){}
   const [src,label]=sceneFor(room); box.querySelector('img').src=src;box.querySelector('.v13SceneLabel').textContent=label;
 }
 function skinItems(){
   document.querySelectorAll('#inventory .slot.filled').forEach(slot=>{
     const src=itemAsset(slot.textContent); if(!src)return;
     const ico=slot.querySelector('.ico'); if(!ico)return;
     let img=ico.querySelector('.v13Item'); if(!img){img=document.createElement('img');img.className='v13Item';img.alt='';img.setAttribute('aria-hidden','true');ico.prepend(img);}
     img.src=src;
   });
 }
 function skinHero(){
   document.querySelectorAll('.entityHeroMain,.entityMapHero').forEach(el=>{
     const key=HERO[el.dataset.entityId||''],src=key?A[key]:'';
     if(!src)return;
     let img=el.querySelector('.v13HeroSprite');
     if(!img){img=document.createElement('img');img.className='v13HeroSprite';img.alt='';img.setAttribute('aria-hidden','true');el.appendChild(img);}
     img.src=src;el.classList.add('v13HeroLoaded');
   });
 }
 function refresh(){ensureScene();skinItems();skinHero();}
 const mo=new MutationObserver(()=>requestAnimationFrame(refresh));
 window.addEventListener('load',()=>{refresh();mo.observe(document.body,{subtree:true,childList:true,characterData:true});});
 window.MonsterhulenVisualV13={refresh};
})();

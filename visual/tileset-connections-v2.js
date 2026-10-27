(()=>{
 const ROOT='assets/v3/map/';
 const A={
  floors:[1,2,3,4,5,6,7,8,9].map(n=>`${ROOT}floor/stone_${String(n).padStart(2,'0')}.png`),
  wall:{N:`${ROOT}border/wall_n_01.png`,E:`${ROOT}border/wall_e_01.png`,S:`${ROOT}border/wall_s_01.png`,W:`${ROOT}border/wall_w_01.png`},
  outer:{NW:`${ROOT}border/corner_outer_nw_01.png`,NE:`${ROOT}border/corner_outer_ne_01.png`,SE:`${ROOT}border/corner_outer_se_01.png`,SW:`${ROOT}border/corner_outer_sw_01.png`},
  inner:{NW:`${ROOT}border/corner_inner_nw_01.png`,NE:`${ROOT}border/corner_inner_ne_01.png`,SE:`${ROOT}border/corner_inner_se_01.png`,SW:`${ROOT}border/corner_inner_sw_01.png`},
  connection:{
   passage_open:{N:`${ROOT}connection/passage_open_n_01.png`,E:`${ROOT}connection/passage_open_e_01.png`,S:`${ROOT}connection/passage_open_s_01.png`,W:`${ROOT}connection/passage_open_w_01.png`},
   door_open:{N:`${ROOT}connection/door_open_n_01.png`,E:`${ROOT}connection/door_open_e_01.png`,S:`${ROOT}connection/door_open_s_01.png`,W:`${ROOT}connection/door_open_w_01.png`},
   door_locked:{N:`${ROOT}connection/door_locked_n_01.png`,E:`${ROOT}connection/door_locked_e_01.png`,S:`${ROOT}connection/door_locked_s_01.png`,W:`${ROOT}connection/door_locked_w_01.png`},
   route_blocked:{N:`${ROOT}connection/route_blocked_n_01.png`,E:`${ROOT}connection/route_blocked_e_01.png`,S:`${ROOT}connection/route_blocked_s_01.png`,W:`${ROOT}connection/route_blocked_w_01.png`}
  }
 };
 const DIRS=['N','E','S','W'];
 function img(src,cls,rot){const im=document.createElement('img');im.className=cls;im.src=src;im.alt='';im.setAttribute('aria-hidden','true');if(rot)im.style.transform=`rotate(${rot}deg)`;return im;}
 function visible(t){return t&&t.classList.contains('tile')&&!t.classList.contains('fog');}
 function doorEl(t,d){return t.querySelector(`:scope > i.door${d}`);}
 function blockedDirs(){
   // DOM-only: patch-15 already exposes canonical trap blocking as × on movement controls.
   const out=new Set();
   document.querySelectorAll('[data-move]').forEach(b=>{
     const d=String(b.dataset.move||'').toUpperCase();
     if(d&&/^×/.test(String(b.textContent||'').trim()))out.add(d);
   });
   return out;
 }
 function connectionKind(el,dir,blocked,current){
   if(!el)return null;
   if(el.classList.contains('locked'))return 'door_locked';
   if(current&&blocked.has(dir))return 'route_blocked';
   if(el.classList.contains('shortcut')||el.classList.contains('secret'))return 'passage_open';
   return 'door_open';
 }
 function apply(){
   const map=document.querySelector('#map'); if(!map)return;
   const tiles=[...map.children].filter(n=>n.classList&&n.classList.contains('tile'));
   const w=parseInt(getComputedStyle(map).getPropertyValue('--map-w'))||0; if(!w||!tiles.length)return;
   const h=Math.ceil(tiles.length/w); map.style.setProperty('--mh-map-h',h); map.style.setProperty('width',`calc(${w} * 32px)`,'important'); map.style.setProperty('height',`calc(${h} * 32px)`,'important');
   const at=(x,y)=>x>=0&&y>=0&&x<w&&y<h?tiles[y*w+x]:null;
   const blocked=blockedDirs();
   tiles.forEach((t,i)=>{
     t.querySelectorAll('.mhRoomFloor,.mhRoomStruct,.mhConnection').forEach(n=>n.remove());
     if(!visible(t))return;
     const x=i%w,y=Math.floor(i/w),current=t.classList.contains('current');
     const seed=((x+17)*73856093)^((y+31)*19349663);
     const fi=Math.abs(seed)%A.floors.length,rot=((Math.abs(seed>>>3)%4)*90);
     t.prepend(img(A.floors[fi],'mhRoomFloor',rot));
     const j={N:t.classList.contains('joinN'),E:t.classList.contains('joinE'),S:t.classList.contains('joinS'),W:t.classList.contains('joinW')};
     const doors={N:doorEl(t,'N'),E:doorEl(t,'E'),S:doorEl(t,'S'),W:doorEl(t,'W')};
     const addStruct=s=>t.appendChild(img(s,'mhRoomStruct'));
     // Generic wall only when neither same-room join nor canonical connection occupies that edge.
     if(!j.N&&!doors.N)addStruct(A.wall.N); if(!j.E&&!doors.E)addStruct(A.wall.E); if(!j.S&&!doors.S)addStruct(A.wall.S); if(!j.W&&!doors.W)addStruct(A.wall.W);
     if(!j.N&&!j.W)addStruct(A.outer.NW); if(!j.N&&!j.E)addStruct(A.outer.NE); if(!j.S&&!j.E)addStruct(A.outer.SE); if(!j.S&&!j.W)addStruct(A.outer.SW);
     const n=at(x,y-1),e=at(x+1,y),s=at(x,y+1),ww=at(x-1,y);
     const diagNW=j.N&&j.W&&visible(n)&&visible(ww)&&n.classList.contains('joinW')&&ww.classList.contains('joinN');
     const diagNE=j.N&&j.E&&visible(n)&&visible(e)&&n.classList.contains('joinE')&&e.classList.contains('joinN');
     const diagSE=j.S&&j.E&&visible(s)&&visible(e)&&s.classList.contains('joinE')&&e.classList.contains('joinS');
     const diagSW=j.S&&j.W&&visible(s)&&visible(ww)&&s.classList.contains('joinW')&&ww.classList.contains('joinS');
     if(j.N&&j.W&&!diagNW)addStruct(A.inner.NW); if(j.N&&j.E&&!diagNE)addStruct(A.inner.NE); if(j.S&&j.E&&!diagSE)addStruct(A.inner.SE); if(j.S&&j.W&&!diagSW)addStruct(A.inner.SW);
     for(const d of DIRS){const el=doors[d]; if(!el)continue; const kind=connectionKind(el,d,blocked,current); if(kind)t.appendChild(img(A.connection[kind][d],`mhConnection mhConnection-${kind} mhConnection-${d}`));}
   });
   map.dataset.emptyRoomsV2='applied'; map.dataset.connectionsV2='applied';
 }
 let queued=false; function queue(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()});}
 const map=document.querySelector('#map'); if(map){new MutationObserver(queue).observe(map,{childList:true});queue();}
 document.addEventListener('click',()=>setTimeout(queue,0),true);
 window.MH_TILESET_CONNECTIONS_V2={apply};
})();

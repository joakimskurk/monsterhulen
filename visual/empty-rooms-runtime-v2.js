(()=>{
 const ROOT='assets/v3/map/';
 const A={
  floors:[1,2,3,4,5,6,7,8,9].map(n=>`${ROOT}floor/stone_${String(n).padStart(2,'0')}.png`),
  wall:{N:`${ROOT}border/wall_n_01.png`,E:`${ROOT}border/wall_e_01.png`,S:`${ROOT}border/wall_s_01.png`,W:`${ROOT}border/wall_w_01.png`},
  outer:{NW:`${ROOT}border/corner_outer_nw_01.png`,NE:`${ROOT}border/corner_outer_ne_01.png`,SE:`${ROOT}border/corner_outer_se_01.png`,SW:`${ROOT}border/corner_outer_sw_01.png`},
  inner:{NW:`${ROOT}border/corner_inner_nw_01.png`,NE:`${ROOT}border/corner_inner_ne_01.png`,SE:`${ROOT}border/corner_inner_se_01.png`,SW:`${ROOT}border/corner_inner_sw_01.png`}
 };
 function img(src,cls,rot){const im=document.createElement('img');im.className=cls;im.src=src;im.alt='';im.setAttribute('aria-hidden','true');if(rot)im.style.transform=`rotate(${rot}deg)`;return im;}
 function visible(t){return t&&t.classList.contains('tile')&&!t.classList.contains('fog');}
 function apply(){
   const map=document.querySelector('#map'); if(!map) return;
   const tiles=[...map.children].filter(n=>n.classList&&n.classList.contains('tile'));
   const w=parseInt(getComputedStyle(map).getPropertyValue('--map-w'))||0; if(!w||!tiles.length)return;
   const h=Math.ceil(tiles.length/w); map.style.setProperty('--mh-map-h',h); map.style.setProperty('width',`calc(${w} * 32px)`,'important'); map.style.setProperty('height',`calc(${h} * 32px)`,'important');
   const at=(x,y)=>x>=0&&y>=0&&x<w&&y<h?tiles[y*w+x]:null;
   tiles.forEach((t,i)=>{
     t.querySelectorAll('.mhRoomFloor,.mhRoomStruct').forEach(n=>n.remove());
     if(!visible(t)) return;
     const x=i%w,y=Math.floor(i/w);
     const seed=((x+17)*73856093)^((y+31)*19349663);
     const fi=Math.abs(seed)%A.floors.length,rot=((Math.abs(seed>>>3)%4)*90);
     t.prepend(img(A.floors[fi],'mhRoomFloor',rot));
     const j={N:t.classList.contains('joinN'),E:t.classList.contains('joinE'),S:t.classList.contains('joinS'),W:t.classList.contains('joinW')};
     const add=s=>t.appendChild(img(s,'mhRoomStruct'));
     if(!j.N)add(A.wall.N); if(!j.E)add(A.wall.E); if(!j.S)add(A.wall.S); if(!j.W)add(A.wall.W);
     if(!j.N&&!j.W)add(A.outer.NW); if(!j.N&&!j.E)add(A.outer.NE); if(!j.S&&!j.E)add(A.outer.SE); if(!j.S&&!j.W)add(A.outer.SW);
     const n=at(x,y-1),e=at(x+1,y),s=at(x,y+1),ww=at(x-1,y);
     const diagNW=j.N&&j.W&&visible(n)&&visible(ww)&&n.classList.contains('joinW')&&ww.classList.contains('joinN');
     const diagNE=j.N&&j.E&&visible(n)&&visible(e)&&n.classList.contains('joinE')&&e.classList.contains('joinN');
     const diagSE=j.S&&j.E&&visible(s)&&visible(e)&&s.classList.contains('joinE')&&e.classList.contains('joinS');
     const diagSW=j.S&&j.W&&visible(s)&&visible(ww)&&s.classList.contains('joinW')&&ww.classList.contains('joinS');
     if(j.N&&j.W&&!diagNW)add(A.inner.NW); if(j.N&&j.E&&!diagNE)add(A.inner.NE); if(j.S&&j.E&&!diagSE)add(A.inner.SE); if(j.S&&j.W&&!diagSW)add(A.inner.SW);
   });
   map.dataset.emptyRoomsV2='applied';
 }
 let queued=false; function queue(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()});}
 const map=document.querySelector('#map'); if(map){new MutationObserver(queue).observe(map,{childList:true});queue();}
 document.addEventListener('click',()=>setTimeout(queue,0),true);
 window.MH_EMPTY_ROOMS_V2={apply};
})();

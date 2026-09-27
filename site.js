const plates=[...document.querySelectorAll("[data-plate]")];
const layers=[...document.querySelectorAll(".bg img")];
const chapters=[...document.querySelectorAll(".hero,.chapter,.doors,.peach")];
let idx=0;

function setLayer(id){
  layers.forEach(img=>img.classList.toggle("on",img.dataset.layer===id));
}
function current(){
  const mid=window.scrollY+window.innerHeight*0.42;
  let id=layers[0]?.dataset.layer||"hero";
  plates.forEach(el=>{if(mid>=el.offsetTop)id=el.dataset.plate;});
  setLayer(id);
  chapters.forEach((el,i)=>{if(mid>=el.offsetTop)idx=i;});
}
function go(n){
  idx=Math.max(0,Math.min(chapters.length-1,n));
  chapters[idx]?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
}

current();
window.addEventListener("scroll",current,{passive:true});
window.addEventListener("resize",current);

document.addEventListener("keydown",e=>{
  if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;
  if(e.key==="ArrowDown"||e.key==="PageDown"||e.key===" "){e.preventDefault();go(idx+1);}
  if(e.key==="ArrowUp"||e.key==="PageUp"){e.preventDefault();go(idx-1);}
  if(e.key==="Home"){e.preventDefault();go(0);}
  if(e.key==="End"){e.preventDefault();go(chapters.length-1);}
  if(e.key==="w"||e.key==="W")location.hash="approach";
  if(e.key==="p"||e.key==="P")location.href="https://stevoblevo.github.io/peachfall/";
  if(e.key==="g"||e.key==="G")location.href="https://stevoblevo.github.io/goober/";
  if(e.key==="r"||e.key==="R")location.href="https://stevoblevo.github.io/goober/run/";
});

const dock=document.createElement("nav");
dock.className="dock";
dock.setAttribute("aria-label","House doors");
dock.innerHTML=`
  <a href="#rooms">Rooms</a>
  <a href="#approach">Watch</a>
  <a href="https://stevoblevo.github.io/peachfall/">Play</a>
  <a href="https://stevoblevo.github.io/goober/">World</a>
  <a href="https://stevoblevo.github.io/goober/run/">Run</a>
`;
document.body.append(dock);

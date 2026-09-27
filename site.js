const plates=document.querySelectorAll("[data-plate]");
const layers=[...document.querySelectorAll(".bg img")];
const cards=[...document.querySelectorAll(".card[data-key]")];
function current(){
  const mid=window.scrollY+window.innerHeight*0.42;
  let id=layers[0]?.dataset.layer||"hero";
  plates.forEach(el=>{ if(mid>=el.offsetTop) id=el.dataset.plate; });
  layers.forEach(img=>img.classList.toggle("on",img.dataset.layer===id));
}
current();
window.addEventListener("scroll",current,{passive:true});
window.addEventListener("resize",current);
window.addEventListener("keydown",e=>{
  if(e.target.matches("input,textarea")) return;
  const k=e.key.toLowerCase();
  if(k==="escape"){ window.scrollTo({top:0,behavior:"smooth"}); return; }
  if(k==="w"){ location.href="https://stevoblevo.github.io/peachfall/"; return; }
  if(k==="p"){ location.href="https://stevoblevo.github.io/peachfall/"; return; }
  if(k==="r"){ location.href="https://stevoblevo.github.io/goober/run/"; return; }
  if(k==="g"){ location.href="https://stevoblevo.github.io/goober/"; return; }
  const card=cards.find(c=>c.dataset.key===e.key);
  if(card) card.click();
});

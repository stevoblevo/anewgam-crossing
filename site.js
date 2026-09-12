const plates=document.querySelectorAll("[data-plate]");
const layers=[...document.querySelectorAll(".bg img")];
function current(){
  const mid=window.scrollY+window.innerHeight*0.42;
  let id=layers[0]?.dataset.layer||"hero";
  plates.forEach(el=>{
    const top=el.offsetTop;
    if(mid>=top)id=el.dataset.plate;
  });
  layers.forEach(img=>img.classList.toggle("on",img.dataset.layer===id));
}
current();
window.addEventListener("scroll",current,{passive:true});
window.addEventListener("resize",current);

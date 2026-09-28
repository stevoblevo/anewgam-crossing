/* Honey / Dora v0.1 — pure deterministic rules. No network, DOM or model calls. */
(function(root, factory){const api=factory(); if(typeof module==='object'&&module.exports)module.exports=api;else root.HoneyCore=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const VERSION=1, ACTIONS=['plant','forage','brew','belong','invite','space','rest'];
const copy=x=>JSON.parse(JSON.stringify(x));
const key=(q,r)=>q+','+r;
function newGame(seed=23){
 seed=(Number(seed)>>>0)||23;
 const board=[];for(let q=-2;q<=2;q++)for(let r=-2;r<=2;r++)if(Math.abs(q+r)<=2){
 let type=q===0&&r===0?'hive':['-1,0','0,1'].includes(key(q,r))?'water':['0,-1','1,0'].includes(key(q,r))?'flower':'meadow';
 board.push({id:key(q,r),q,r,type,used:false});}
 return {version:VERSION,seed,day:1,actionsLeft:3,turn:0,nectar:0,honey:0,belong:0,planted:0,won:false,board,
 baer:{tile:'2,-1',invited:false,awayUntil:0},trace:[{turn:0,event:'arrive',text:'A little garden. Three bees. A seat left open.'}]};
}
function tile(s,id){return s.board.find(t=>t.id===id);}
function baerAt(s,id){return !s.baer.invited&&s.day>s.baer.awayUntil&&s.baer.tile===id;}
function explain(s,a,id){
 if(!ACTIONS.includes(a))return 'Unknown action.';
 if(s.won)return 'The teapot is ready. Keep this garden or start a new one.';
 const t=tile(s,id);
 if(a==='plant'&&(!t||t.type!=='meadow'))return 'Choose an empty meadow to plant.';
 if(a==='forage'&&(!t||t.type!=='flower'))return 'Choose a flower to gather nectar.';
 if(['plant','forage'].includes(a)&&baerAt(s,id))return 'Baer needs space here. Choose another tile, offer nectar, or give space.';
 if(a==='forage'&&t.used)return 'This flower rests until the next day.';
 if(a==='brew'&&s.nectar<2)return 'Two nectar make one honey.';
 if(a==='belong'&&s.honey<1)return 'Brew one honey before sharing.';
 if(a==='belong'&&s.belong>=3)return 'Three gifts are ready; plant a flower to finish the garden.';
 if(a==='invite'&&s.baer.invited)return 'Baer has already chosen a seat.';
 if(a==='invite'&&s.nectar<2)return 'An optional invitation costs two nectar. Giving space is also kind.';
 if(a==='space'&&s.baer.invited)return 'Baer is resting by the garden.';
 return '';
}
function legal(s){const out=[];for(const a of ACTIONS){if(['plant','forage'].includes(a)){for(const t of s.board)if(!explain(s,a,t.id))out.push({action:a,tile:t.id});}else if(!explain(s,a))out.push({action:a});}return out;}
function step(state,action,id){
 const error=explain(state,action,id);if(error)return {state,error};
 const s=copy(state);let text='';const t=tile(s,id);
 if(action==='plant'){t.type='flower';s.planted++;text='A blossom takes root. It can feed a bee today.';}
 if(action==='forage'){t.used=true;s.nectar+=2;text='A bee brings two nectar home. This flower now rests.';}
 if(action==='brew'){s.nectar-=2;s.honey++;text='Two nectar become one warm drop of honey.';}
 if(action==='belong'){s.honey--;s.belong++;text=['A first cup for someone who arrives.','A second cup; the garden makes room.','The third cup is poured. A place to return to.'][s.belong-1];}
 if(action==='invite'){s.nectar-=2;s.baer.invited=true;text='Baer accepts the nectar and chooses a seat. Still a monster; still his choice.';}
 if(action==='space'){s.baer.awayUntil=s.day+1;text='You leave a clear path. Baer wanders elsewhere through tomorrow.';}
 if(action==='rest')text='The bees pause. Nothing is lost while you are away.';
 s.turn++;s.actionsLeft--;s.trace.push({turn:s.turn,event:action,text});
 s.won=s.belong>=3&&s.planted>=1;
 if(s.won){s.trace.push({turn:s.turn,event:'ready',text:'The teapot is ready. Keep the garden; its story can continue.'});}
 if(s.actionsLeft===0){s.day++;s.actionsLeft=3;s.board.forEach(t=>t.used=false);
 const path=['2,-1','1,-2','-1,-1','-2,1','0,2','2,0'];s.baer.tile=path[(s.seed+s.day)%path.length];
 if(!s.won)s.trace.push({turn:s.turn,event:'dawn',text:'Another dawn. Every flower can give again.'});}
 s.trace=s.trace.slice(-80);return {state:s,error:null};
}
function validate(s){
 if(!s||typeof s!=='object'||Array.isArray(s)||s.version!==VERSION)return 'Unknown save version.';
 for(const k of ['seed','day','actionsLeft','turn','nectar','honey','belong','planted'])if(!Number.isSafeInteger(s[k])||s[k]<0||s[k]>4294967295)return 'Invalid counter: '+k;
 if(s.day<1||s.actionsLeft<1||s.actionsLeft>3||s.belong>3||s.nectar>999||s.honey>999||s.planted>19||s.day>100000||s.turn>300000)return 'Counter outside supported range.';
 if(typeof s.won!=='boolean'||s.won!==(s.belong>=3&&s.planted>=1))return 'Invalid outcome.';
 const expected=newGame(s.seed).board;
 if(!Array.isArray(s.board)||s.board.length!==19)return 'Invalid board.';
 const seen=new Set();for(const t of s.board){if(!t||!expected.some(e=>e.id===t.id&&e.q===t.q&&e.r===t.r)||seen.has(t.id)||!['hive','water','flower','meadow'].includes(t.type)||typeof t.used!=='boolean')return 'Invalid tile.';seen.add(t.id);}
 for(const t of expected.filter(t=>['water','hive'].includes(t.type)))if(tile(s,t.id).type!==t.type)return 'Fixed terrain changed.';
 if(s.board.filter(t=>t.type==='hive').length!==1)return 'Invalid hive count.';
 if(!s.baer||typeof s.baer.invited!=='boolean'||!seen.has(s.baer.tile)||!Number.isSafeInteger(s.baer.awayUntil)||s.baer.awayUntil<0||s.baer.awayUntil>100001)return 'Invalid Baer.';
 if(!Array.isArray(s.trace)||s.trace.length>80||s.trace.some(e=>!e||typeof e.text!=='string'||e.text.length>400||typeof e.event!=='string'||e.event.length>30||!Number.isSafeInteger(e.turn)))return 'Invalid trace.';
 return '';
}
function parseSave(text){if(typeof text!=='string'||text.length>65536)throw Error('Save must be under 64 KB.');const v=JSON.parse(text);const err=validate(v);if(err)throw Error(err);return copy(v);}
function demoAction(s){
 if(s.won)return null;
 if(s.planted<1)return legal(s).find(x=>x.action==='plant')||{action:'space'};
 if(s.honey>0&&s.belong<3)return {action:'belong'};
 if(s.nectar>=2)return {action:'brew'};
 return legal(s).find(x=>x.action==='forage')||{action:'rest'};
}
return {VERSION,ACTIONS,newGame,step,legal,explain,validate,parseSave,demoAction,baerAt};
});

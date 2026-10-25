const path=require('node:path');
const repoRoot=path.resolve(__dirname,'..');
const fs = require('fs');
const vm = require('vm');
const assert = require('assert/strict');
const {createCanvas} = require('@napi-rs/canvas');
const html = fs.readFileSync(repoRoot + '/index.html','utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const viewport={width:Number(process.env.WIDTH||800),height:Number(process.env.HEIGHT||730)};
class Element {
 constructor(id){this.id=id;this.listeners={};this.dataset={};this.attrs={};this.checked=false;this.disabled=false;this.hidden=false;this.value='';this.textContent='';this.children=[];this.classList={add:()=>{},remove:()=>{}};}
 addEventListener(name,fn){(this.listeners[name] ||= []).push(fn);}
 setAttribute(k,v){this.attrs[k]=v;}
 getAttribute(k){return this.attrs[k];}
 focus(){}
 querySelectorAll(){return this.children;}
 getBoundingClientRect(){return{...viewport,left:0,top:0};}
 set innerHTML(v){this._html=v;if(this.id==='structures'){this.children=[...v.matchAll(/data-structure="([^"]+)"/g)].map(m=>{const e=new Element(m[1]);e.dataset.structure=m[1];return e;});}}
 get innerHTML(){return this._html||'';}
 fire(name,extra={}){for(const fn of this.listeners[name]||[])fn({target:this,preventDefault(){},...extra});}
}
const elements={};
for(const m of html.matchAll(/id="([^"]+)"/g))elements[m[1]]=new Element(m[1]);
for(const id of ['show-body','transparent-lungs','show-labels','show-air'])elements[id].checked=true;
elements.phase.value='20';elements.speed.value='1';elements['body-opacity'].value='15';
const actual=createCanvas(viewport.width,viewport.height),canvas=elements.anatomy;
canvas.getContext=(...a)=>actual.getContext(...a);canvas.parentElement=new Element('wrap');canvas.setPointerCapture=()=>{};
Object.defineProperties(canvas,{width:{get:()=>actual.width,set:v=>actual.width=v},height:{get:()=>actual.height,set:v=>actual.height=v}});
const views=['body','organs','alveoli'].map(view=>{const el=new Element(view);el.dataset.view=view;return el;});
const document={baseURI:"https://lucianocp10.github.io/Variados-/",getElementById:id=>elements[id],querySelectorAll:()=>views,addEventListener(){},hidden:false,fullscreenElement:null,documentElement:{}};
let failure='none';let calls=[];
async function fakeFetch(url){
 const name=url.pathname.split('/').pop();calls.push(name);
 if(failure==='lungs'&&name.startsWith('lungs'))return{ok:false,status:404};
 if(failure==='torso'&&name.startsWith('torso'))throw new Error('offline');
 const b=fs.readFileSync(repoRoot+'/'+name);return{ok:true,arrayBuffer:async()=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)};
}
const context=vm.createContext({document,window:{matchMedia:()=>({matches:false}),devicePixelRatio:1},ResizeObserver:class{observe(){}},requestAnimationFrame(){},setTimeout,clearTimeout,TextDecoder,AbortController,URL,fetch:fakeFetch,console:{...console,warn(){}},Math,Map});

vm.runInContext(script,context);
const run=code=>vm.runInContext(code,context);
(async()=>{
 await new Promise(setImmediate);
 assert.equal(run('glbAssets.lungsStatus'),'ready');assert.equal(run('glbAssets.torsoStatus'),'ready');assert.equal(run('importedActive()'),true);
 assert.equal(elements['retry-model'].hidden,true);
 run("glbAssets.lungs=null;glbAssets.lungsStatus='idle';combinedGLB=null");failure='lungs';
 await run('loadGLBModels()');assert.equal(run('glbAssets.lungsStatus'),'error');assert.equal(run('modelMeshes()===meshes'),true);assert.equal(elements['retry-model'].hidden,false);
 failure='none';calls=[];await run('loadGLBModels()');assert.equal(run('importedActive()'),true);assert.equal(calls.length,1);assert.ok(calls[0].startsWith('lungs'));
 run("glbAssets.torso=null;glbAssets.torsoStatus='idle';combinedGLB=null");failure='torso';await run('loadGLBModels()');assert.equal(run('glbAssets.torsoStatus'),'error');assert.equal(run('importedActive()'),true);assert.equal(run('modelMeshes().filter(m=>m.group===\"lungs\").every(m=>m.source===\"glb\")'),true);assert.match(elements['model-status'].textContent,/Tronco esquemático/);
 failure='none';await run('loadGLBModels()');assert.equal(run('glbAssets.torsoStatus'),'ready');assert.equal(elements['retry-model'].hidden,true);
 console.log(JSON.stringify({passed:true,checks:['async GLB loading','missing respiratory file fallback','retry without refetching ready assets','partial torso failure','torso retry']}));
})().catch(e=>{console.error(e);process.exitCode=1;});

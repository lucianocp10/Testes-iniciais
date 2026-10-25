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
const document={getElementById:id=>elements[id],querySelectorAll:()=>views,addEventListener(){},hidden:false,fullscreenElement:null,documentElement:{}};
const context=vm.createContext({document,window:{matchMedia:()=>({matches:false}),devicePixelRatio:1},ResizeObserver:class{observe(){}},requestAnimationFrame(){},setTimeout(){},TextDecoder,console,Math,Map});
vm.runInContext(script,context);
const run=code=>vm.runInContext(code,context);
const lungs=fs.readFileSync(repoRoot+'/lungs-with-trachea-respiratory-system.glb'),torso=fs.readFileSync(repoRoot+'/torso-with-removable-organs.glb');
context.lungsBuffer=lungs.buffer.slice(lungs.byteOffset,lungs.byteOffset+lungs.byteLength);
context.torsoBuffer=torso.buffer.slice(torso.byteOffset,torso.byteOffset+torso.byteLength);
run(`glbAssets.lungs=installGLB(parseAnatomyGLB(lungsBuffer,()=>true,p=>sourcePoints(p)).records);glbAssets.lungsStatus='ready';glbAssets.torso=installGLB(parseAnatomyGLB(torsoBuffer,id=>id==='torso_shell'||/heart|cardiac|coronary|LAD|aorta|artery|vein|vena|pulmonary_trunk/.test(id||''),p=>sourcePoints(p,true)).records);glbAssets.torsoStatus='ready';setView('body');`);
assert.equal(run('glbAssets.lungs.length'),29);
assert.equal(run('glbAssets.lungs.filter(m=>m.group==="lungs").length'),5);
assert.equal(run('parseAnatomyGLB(lungsBuffer,()=>true,p=>p).animationCount'),0);
assert.equal(run('modelMeshes().filter(m=>m.group==="lungs").every(m=>m.source==="glb")'),true);
assert.equal(run('modelMeshes().filter(m=>m.group==="body").some(m=>m.anatomicalId==="torso_shell")'),true);
assert.equal(run('modelMeshes().filter(m=>m.source==="glb").every(m=>m.vertices.every(p=>p.every(Number.isFinite)))'),true);
assert.throws(()=>run('parseAnatomyGLB(lungsBuffer.slice(0,100),()=>true,p=>p)'),/inválido/);
assert.equal(run('glbAssets.lungs.filter(m=>m.anatomicalId.startsWith("R_lung")).every(m=>m.vertices.every(p=>p[0]<0))'),true);

const click=id=>elements[id].fire('click');
assert.equal(elements['detail-title'].textContent,'Uma viagem a cada respiração.');
assert.equal(run('meshes.every(m=>m.vertices.every(p=>p.every(Number.isFinite)))'),true);
assert.equal(run('microMeshes.every(m=>m.vertices.every(p=>p.every(Number.isFinite)))'),true);
assert.equal(run('meshes.every(m=>typeof m.group === "string")'),true);
assert.equal(elements.structures.children.length,12);
const snap=(name,code='')=>{run(code+'; camera.target=camera.goal.slice();camera.distance=camera.goalDistance;render()');if(process.env.SNAPSHOT_DIR){fs.mkdirSync(process.env.SNAPSHOT_DIR,{recursive:true});fs.writeFileSync(path.join(process.env.SNAPSHOT_DIR,(process.env.TAG||'')+name+'.png'),actual.toBuffer('image/png'));}};
snap('preview-body');
views[1].fire('click');assert.equal(run('state.body'),false);assert.equal(run('state.ribs'),false);snap('preview-organs');
views[2].fire('click');assert.equal(run('state.view'),'alveoli');assert.equal(elements['show-body'].disabled,true);assert.match(elements['detail-text'].textContent,/difusão/);snap('preview-alveoli');
views[0].fire('click');assert.equal(elements['show-body'].disabled,false);
click('inhale');assert.equal(run('state.playing'),false);const down=run('transform([0,-1.35,0],"diaphragm",(1-Math.cos(state.phase*TAU))/2)[1]');
click('exhale');const up=run('transform([0,-1.35,0],"diaphragm",(1-Math.cos(state.phase*TAU))/2)[1]');assert.ok(down<up,'Diaphragm descends on inhalation');
assert.ok(run('transform([1,0,0],"lungs",1)[0] > transform([1,0,0],"lungs",0)[0]'));
click('play');assert.equal(run('state.playing'),true);
click('route-start');assert.equal(run('state.selected'),'nasal');
for(let i=0;i<6;i++)click('route-next');assert.equal(run('state.selected'),'alveolos');assert.equal(run('state.view'),'alveoli');
click('route-next');assert.equal(elements['route-banner'].hidden,true);
click('reset');assert.equal(run('state.view'),'body');assert.equal(run('state.selected'),'geral');assert.equal(run('state.ribs'),false);
run('selectStructure("costelas")');assert.equal(run('state.ribs'),true);
snap('preview-ribs');
run('selectStructure("faringe",true)');assert.ok(run('camera.yaw')<-.5);snap('preview-profile');
click('reset');run('camera.yaw=Math.PI');snap('preview-back');
run('selectStructure("pleura")');snap('preview-pleura');
const before=run('camera.goalDistance');click('zoom-in');assert.ok(run('camera.goalDistance')<before);
const beforePhase=run('state.phase');run('frame(1000);frame(1040);frame(1080)');assert.notEqual(run('state.phase'),beforePhase);
// Bound every preset so a selected target remains in front of the camera.
for(const id of run('Object.keys(info)')){run('selectStructure('+JSON.stringify(id)+',true);camera.target=camera.goal.slice();camera.distance=camera.goalDistance;render()');assert.ok(run('hitFaces.every(f=>f.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.z>0))'));
}
// Isolate every imported lobe, then restore the whole body; animation uses the same phase.
for(const id of ['right','left','R_lung_superior','R_lung_middle','R_lung_inferior','L_lung_superior','L_lung_inferior','trachea','bronchi']){
 elements['isolate-organ'].value=id;elements['isolate-organ'].fire('change');
 assert.equal(run('state.view'),'organs');
 assert.ok(run('modelMeshes().filter(isVisible).length')>0);
 assert.equal(run('modelMeshes().filter(isVisible).every(isolationMatches)'),true);
 assert.equal(run('modelMeshes().filter(isVisible).some(m=>m.group==="body")'),false);
 if(id==='R_lung_middle')snap('glb-isolated-middle');
}
views[0].fire('click');assert.equal(run('state.isolate'),'all');assert.equal(run('state.body'),true);
const initialOpacity=run('shapeStyle(glbAssets.torso.find(m=>m.group==="body")).alpha');
elements['body-opacity'].value='35';elements['body-opacity'].fire('input');assert.ok(run('shapeStyle(glbAssets.torso.find(m=>m.group==="body")).alpha')>initialOpacity);
click('reset');snap('glb-body');views[1].fire('click');snap('glb-organs');
click('inhale');snap('glb-inhale');click('exhale');snap('glb-exhale');
elements['model-source'].value='schematic';elements['model-source'].fire('change');assert.equal(run('modelMeshes()===meshes'),true);
elements['model-source'].value='glb';elements['model-source'].fire('change');assert.equal(run('importedActive()'),true);
console.log(JSON.stringify({passed:true,structures:elements.structures.children.length,meshes:run('meshes.length'),microMeshes:run('microMeshes.length'),faces:run('meshes.reduce((n,m)=>n+m.faces.length,0)'),importedMeshes:run('modelMeshes().filter(m=>m.source==="glb").length'),importedFaces:run('modelMeshes().filter(m=>m.source==="glb").reduce((s,m)=>s+m.faces.length,0)'),checks:['GLB header and bounds','five independent lobes','anatomical laterality','organ/lobe isolation','GLB/schematic switch','geometry','body/organ toggle','alveoli view','breathing direction','pause/play','air-path walkthrough','reset','camera presets','zoom','animation']}));

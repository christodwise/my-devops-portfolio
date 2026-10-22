import{r as l,j as e}from"./index-BGvBToUO.js";import{e as B,U,f as V,M as H,R as O,g as W,u as g,P as L,V as f,_ as P,h as N,i as w,a as Y,s as u,b as h,D as v,A as C,c as $,d as q,p as M,C as J}from"./ChristoSprite-AzEzBPXR.js";function K(o,t,r,s){var n;return n=class extends B{constructor(a){super({vertexShader:t,fragmentShader:r,...a});for(const i in o)this.uniforms[i]=new U(o[i]),Object.defineProperty(this,i,{get(){return this.uniforms[i].value},set(c){this.uniforms[i].value=c}});this.uniforms=V.clone(this.uniforms)}},n.key=H.generateUUID(),n}const Q=()=>parseInt(O.replace(/\D+/g,"")),X=Q(),Z=K({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new w,sectionColor:new w,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new f,worldPlanePosition:new f},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${X>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),ee=l.forwardRef(({args:o,cellColor:t="#000000",sectionColor:r="#2080ff",cellSize:s=.5,sectionSize:n=1,followCamera:a=!1,infiniteGrid:i=!1,fadeDistance:c=100,fadeStrength:y=1,fadeFrom:S=1,cellThickness:b=.5,sectionThickness:z=1,side:G=N,...k},F)=>{W({GridMaterial:Z});const m=l.useRef(null);l.useImperativeHandle(F,()=>m.current,[]);const p=new L,_=new f(0,1,0),T=new f(0,0,0);g(E=>{p.setFromNormalAndCoplanarPoint(_,T).applyMatrix4(m.current.matrixWorld);const x=m.current.material,R=x.uniforms.worldCamProjPosition,A=x.uniforms.worldPlanePosition;p.projectPoint(E.camera.position,R.value),A.value.set(0,0,0).applyMatrix4(m.current.matrixWorld)});const I={cellSize:s,sectionSize:n,cellColor:t,sectionColor:r,cellThickness:b,sectionThickness:z},D={fadeDistance:c,fadeStrength:y,fadeFrom:S,infiniteGrid:i,followCamera:a};return l.createElement("mesh",P({ref:m,frustumCulled:!1},k),l.createElement("gridMaterial",P({transparent:!0,"extensions-derivatives":!0,side:G},I,D)),l.createElement("planeGeometry",{args:o}))}),d=.26,j=2.85;function oe(){const o=document.createElement("canvas");o.width=4,o.height=128;const t=o.getContext("2d"),r=t.createLinearGradient(0,0,0,128);return r.addColorStop(0,"rgba(95,227,255,0)"),r.addColorStop(1,"rgba(95,227,255,0.32)"),t.fillStyle=r,t.fillRect(0,0,4,128),new J(o)}const te=()=>{const o=l.useRef(null),t=90,r=l.useMemo(()=>{const s=new Float32Array(t*3);for(let n=0;n<t;n++){const a=.4+Math.random()*.9,i=Math.random()*Math.PI*2;s.set([Math.cos(i)*a,Math.random()*3.2,Math.sin(i)*a],n*3)}return s},[]);return g((s,n)=>{const a=o.current.geometry.attributes.position;for(let i=0;i<t;i++){let c=a.getY(i)+n*.35;c>3.4&&(c=.2),a.setY(i,c)}a.needsUpdate=!0}),e.jsxs("points",{ref:o,children:[e.jsx("bufferGeometry",{children:e.jsx("bufferAttribute",{attach:"attributes-position",args:[r,3]})}),e.jsx("pointsMaterial",{color:h.holo,size:.035,transparent:!0,opacity:.8,blending:C,depthWrite:!1})]})},ie=({progress:o})=>{const t=l.useRef(null),r=l.useMemo(oe,[]);return g(()=>{const s=o.current;t.current.position.y=d+s*j,t.current.visible=s>.01&&s<.99}),e.jsxs("group",{children:[e.jsxs("mesh",{position:[0,d/2,0],children:[e.jsx("cylinderGeometry",{args:[1.25,1.35,d,u(48)]}),e.jsx("meshStandardMaterial",{color:"#0F2466",roughness:.4,metalness:.3})]}),e.jsxs("mesh",{position:[0,d+.005,0],"rotation-x":-Math.PI/2,children:[e.jsx("ringGeometry",{args:[.95,1.12,u(64)]}),e.jsx("meshBasicMaterial",{color:h.holo,toneMapped:!1})]}),e.jsxs("mesh",{position:[0,d+.004,0],"rotation-x":-Math.PI/2,children:[e.jsx("circleGeometry",{args:[.9,u(48)]}),e.jsx("meshBasicMaterial",{color:h.holo,transparent:!0,opacity:.18,toneMapped:!1})]}),e.jsxs("mesh",{position:[0,d+1.6,0],children:[e.jsx("cylinderGeometry",{args:[1.05,1.05,3.2,u(48),1,!0]}),e.jsx("meshBasicMaterial",{map:r,transparent:!0,blending:C,depthWrite:!1,side:v,toneMapped:!1})]}),e.jsx($,{position:[0,d,.05],height:j,reveal:o}),e.jsxs("mesh",{ref:t,"rotation-x":-Math.PI/2,children:[e.jsx("ringGeometry",{args:[.7,.78,u(64)]}),e.jsx("meshBasicMaterial",{color:h.holo,transparent:!0,opacity:.9,toneMapped:!1,side:v})]}),e.jsx(te,{})]})},re=()=>{const{camera:o,size:t}=q(),r=l.useMemo(()=>new f(0,1.55,0),[]),s=l.useMemo(()=>new f,[]);return g((n,a)=>{const i=t.width/t.height<.9;s.set(M.x*.6,(i?1.3:2.1)-M.y*.3,i?Math.max(10.5,6/(t.width/t.height)):9.4),o.position.lerp(s,1-Math.exp(-4*Math.min(a,.05))),r.y=i?2.55:1.55,o.lookAt(r)}),null},ae=({progress:o})=>e.jsxs(Y,{fov:32,children:[e.jsx(ee,{position:[0,0,0],args:[30,30],cellSize:.6,cellThickness:.8,cellColor:"#1F3C9E",sectionSize:3,sectionThickness:1.2,sectionColor:"#3A6BFF",fadeDistance:16,fadeStrength:1.5,infiniteGrid:!0}),e.jsx(ie,{progress:o}),e.jsx(re,{})]});export{ae as default};

(()=>{"use strict";var e={6702:(e,t,n)=>{var o=n(9104),r=n(5210),a=n(8734),i=n(1758);function l(e,t,n,o,r,a){const l=(0,i.g2)("router-view");return(0,i.uX)(),(0,i.Wv)(l)}const s=(0,i.pM)({name:"App"});var c=n(2807);const p=(0,c.A)(s,[["render",l]]),u=p;var d=n(1573),h=n(455);const f=[{path:"/",component:()=>Promise.all([n.e(121),n.e(477)]).then(n.bind(n,6477)),children:[{path:"",component:()=>Promise.all([n.e(121),n.e(176)]).then(n.bind(n,8176)),name:"home"},{path:"eventDay/:id",component:()=>Promise.all([n.e(121),n.e(130)]).then(n.bind(n,8130)),name:"eventDay"},{path:"event/:id",component:()=>Promise.all([n.e(121),n.e(795)]).then(n.bind(n,2795)),name:"event"},{path:"loadingSheet/:id",component:()=>Promise.all([n.e(121),n.e(84)]).then(n.bind(n,7084)),name:"loadingSheet"},{path:"events",component:()=>Promise.all([n.e(121),n.e(260)]).then(n.bind(n,2260)),name:"events"},{path:"newEvent",component:()=>Promise.all([n.e(121),n.e(314)]).then(n.bind(n,314)),name:"NewEvent"},{path:"equipments",component:()=>Promise.all([n.e(121),n.e(767)]).then(n.bind(n,4767)),name:"equipments"}]},{path:"/login",component:()=>Promise.all([n.e(121),n.e(433)]).then(n.bind(n,8433)),children:[{path:"",component:()=>Promise.all([n.e(121),n.e(801)]).then(n.bind(n,5801))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([n.e(121),n.e(271)]).then(n.bind(n,3271))}],m=f;var v=n(8993),b=n(1903),g=n(53),y=n(660);const w=(0,d.wE)((function(){const e=h.Bt,t=(0,h.aE)({scrollBehavior:()=>({left:0,top:0}),routes:m,history:e("")});return t.beforeEach(((e,t,n)=>{console.log("Path: ",e);var o=v.A.getItem("Token");o?y.axios.post(g.A.RestUrl+"Autentication/Validate",{Token:o}).then((t=>{"/login"==e.path?n({path:"/"}):n()})).catch((e=>{n({path:"/login"})})):"/login"==e.path||"event"==e.name||"loadingSheet"==e.name?n():n({path:"/login"})})),t}));async function P(e,t){const n=e(u);n.use(r.A,t);const o=(0,a.IG)("function"===typeof w?await w({}):w);return{app:n,router:o}}var A=n(4806);const j={config:{},plugins:{AppFullscreen:A.A,LocalStorage:v.A,SessionStorage:b.A}},k="";async function O({app:e,router:t},n){let o=!1;const r=e=>{try{return t.resolve(e).href}catch(e){}return Object(e)===e?null:e},a=e=>{if(o=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const t=r(e);null!==t&&(window.location.href=t,window.location.reload())},i=window.location.href.replace(window.location.origin,"");for(let r=0;!1===o&&r<n.length;r++)try{await n[r]({app:e,router:t,ssrContext:null,redirect:a,urlPath:i,publicPath:k})}catch(e){return e&&e.url?void a(e.url):void console.error("[Quasar] boot error:",e)}!0!==o&&(e.use(t),e.mount("#q-app"))}P(o.Ef,j).then((e=>{const[t,o]=void 0!==Promise.allSettled?["allSettled",e=>e.map((e=>{if("rejected"!==e.status)return e.value.default;console.error("[Quasar] boot error:",e.reason)}))]:["all",e=>e.map((e=>e.default))];return Promise[t]([Promise.resolve().then(n.bind(n,5152)),Promise.resolve().then(n.bind(n,660)),Promise.resolve().then(n.bind(n,6420))]).then((t=>{const n=o(t).filter((e=>"function"===typeof e));O(e,n)}))}))},660:(e,t,n)=>{n.r(t),n.d(t,{api:()=>i,axios:()=>r.A,default:()=>l});var o=n(1573),r=n(2303),a=n(8993);n(1903);const i=r.A.create({baseURL:"https://api.example.com"}),l=(0,o.zj)((({app:e})=>{r.A.interceptors.request.use((async e=>{var t=a.A.getItem("Token");return void 0!=t&&null!=t&&(e.headers={Authorization:`Bearer ${t}`,"Content-Type":"application/json"}),e})),e.config.globalProperties.$axios=r.A,e.config.globalProperties.$api=i}))},53:(e,t,n)=>{n.d(t,{A:()=>r});let o={RestUrl:"http://gest-event.somee.com/api/"};const r=o},5152:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});var o=n(1573),r=n(3537);const a={failed:"Action failed",success:"Action was successful"},i={"en-US":a},l=(0,o.zj)((({app:e})=>{const t=(0,r.hU)({locale:"en-US",globalInjection:!0,messages:i});e.use(t)}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,n),a.exports}n.m=e,(()=>{var e=[];n.O=(t,o,r,a)=>{if(!o){var i=1/0;for(p=0;p<e.length;p++){for(var[o,r,a]=e[p],l=!0,s=0;s<o.length;s++)(!1&a||i>=a)&&Object.keys(n.O).every((e=>n.O[e](o[s])))?o.splice(s--,1):(l=!1,a<i&&(i=a));if(l){e.splice(p--,1);var c=r();void 0!==c&&(t=c)}}return t}a=a||0;for(var p=e.length;p>0&&e[p-1][2]>a;p--)e[p]=e[p-1];e[p]=[o,r,a]}})(),(()=>{n.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return n.d(t,{a:t}),t}})(),(()=>{n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,o)=>(n.f[o](e,t),t)),[]))})(),(()=>{n.u=e=>"js/"+e+"."+{84:"015d8904",130:"a2031504",176:"a138a733",260:"3061ea95",271:"511f1f0f",314:"28ec4791",433:"4ae3435c",477:"6b7459aa",767:"31faa754",795:"9ab43c02",801:"70ad0f19"}[e]+".js"})(),(()=>{n.miniCssF=e=>{}})(),(()=>{n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="gest-event:";n.l=(o,r,a,i)=>{if(e[o])e[o].push(r);else{var l,s;if(void 0!==a)for(var c=document.getElementsByTagName("script"),p=0;p<c.length;p++){var u=c[p];if(u.getAttribute("src")==o||u.getAttribute("data-webpack")==t+a){l=u;break}}l||(s=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,n.nc&&l.setAttribute("nonce",n.nc),l.setAttribute("data-webpack",t+a),l.src=o),e[o]=[r];var d=(t,n)=>{l.onerror=l.onload=null,clearTimeout(h);var r=e[o];if(delete e[o],l.parentNode&&l.parentNode.removeChild(l),r&&r.forEach((e=>e(n))),t)return t(n)},h=setTimeout(d.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=d.bind(null,l.onerror),l.onload=d.bind(null,l.onload),s&&document.head.appendChild(l)}}})(),(()=>{n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{n.p=""})(),(()=>{var e={524:0};n.f.j=(t,o)=>{var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var a=new Promise(((n,o)=>r=e[t]=[n,o]));o.push(r[2]=a);var i=n.p+n.u(t),l=new Error,s=o=>{if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var a=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",l.name="ChunkLoadError",l.type=a,l.request=i,r[1](l)}};n.l(i,s,"chunk-"+t,t)}},n.O.j=t=>0===e[t];var t=(t,o)=>{var r,a,[i,l,s]=o,c=0;if(i.some((t=>0!==e[t]))){for(r in l)n.o(l,r)&&(n.m[r]=l[r]);if(s)var p=s(n)}for(t&&t(o);c<i.length;c++)a=i[c],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(p)},o=globalThis["webpackChunkgest_event"]=globalThis["webpackChunkgest_event"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=n.O(void 0,[121],(()=>n(6702)));o=n.O(o)})();
"use strict";(globalThis["webpackChunkgest_event"]=globalThis["webpackChunkgest_event"]||[]).push([[84],{7084:(e,t,a)=>{a.r(t),a.d(t,{default:()=>I});var l=a(1758),n=a(8790),s=a(9104);const o={class:"closePageButton"},i={class:"flex full-width"},u=["src"];function c(e,t,a,c,d,r){const g=(0,l.g2)("q-btn"),h=(0,l.g2)("q-avatar"),p=(0,l.g2)("q-item-section"),b=(0,l.g2)("q-item-label"),v=(0,l.g2)("q-item"),m=(0,l.g2)("q-list"),f=(0,l.g2)("q-expansion-item"),k=(0,l.g2)("q-page"),_=(0,l.gN)("ripple");return(0,l.uX)(),(0,l.Wv)(k,null,{default:(0,l.k6)((()=>[(0,l.Lk)("div",o,[(0,l.bF)(g,{icon:"close",flat:"",round:"",dense:"",onClick:e.closeEventDay},null,8,["onClick"])]),t[0]||(t[0]=(0,l.Lk)("div",{class:"text-h5 bg-secondary titelEvent q-mb-xs",style:{"margin-top":"-30px"}},"Hoja de Carga ",-1)),(0,l.Lk)("div",i,[(0,l.bF)(m,{bordered:"",class:"rounded-borders full-width"},{default:(0,l.k6)((()=>[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(e.sheetTypes,(e=>(0,l.bo)(((0,l.uX)(),(0,l.Wv)(f,{"expand-separator":"",label:e.name,"default-opened":"","header-class":"bg-accent text-white text-h6 botonDesplegableBlanco",class:"bg-grey-5"},{default:(0,l.k6)((()=>[(0,l.bF)(m,{style:{"margin-top":"4px"}},{default:(0,l.k6)((()=>[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(e.sheetList,(e=>(0,l.bo)(((0,l.uX)(),(0,l.Wv)(v,{clickable:"",class:"itemLoadSheet"},{default:(0,l.k6)((()=>[(0,l.bF)(p,{avatar:""},{default:(0,l.k6)((()=>[(0,l.bF)(h,{square:""},{default:(0,l.k6)((()=>[(0,l.Lk)("img",{src:e.urlImg},null,8,u)])),_:2},1024)])),_:2},1024),(0,l.bF)(p,null,{default:(0,l.k6)((()=>[(0,l.bF)(b,null,{default:(0,l.k6)((()=>[(0,l.eW)((0,n.v_)(e.name),1)])),_:2},1024),(0,l.bo)((0,l.bF)(b,{caption:""},{default:(0,l.k6)((()=>[(0,l.eW)((0,n.v_)(e.comment),1)])),_:2},1536),[[s.aG,null!=e.comment&&""!=e.comment]])])),_:2},1024),(0,l.bo)((0,l.bF)(p,{avatar:""},{default:(0,l.k6)((()=>[(0,l.eW)("Cantidad: "+(0,n.v_)(e.quantity),1)])),_:2},1536),[[s.aG,null!=e.quantity&&""!=e.quantity]])])),_:2},1024)),[[_]]))),256))])),_:2},1024)])),_:2},1032,["label"])),[[s.aG,void 0!=e.sheetList&&e.sheetList.length>0]]))),256))])),_:1})])])),_:1})}a(239);var d=a(8734),r=a(455),g=(a(1597),a(4907)),h=a(660),p=a(53);const b=(0,l.pM)({name:"EventDay",setup(){const e=(0,r.rd)(),t=(0,r.lq)(),a=(0,d.KR)(),n=(0,g.A)(),s=(0,d.KR)(),o=(0,d.KR)([]),i=(0,d.KR)([]);function u(){h.axios.get(p.A.RestUrl+"LoadingSheet/allSheetTypes").then((e=>{i.value=e.data,console.log(e.data),c()})).catch((e=>{console.log(e)}))}function c(){h.axios.get(p.A.RestUrl+"LoadingSheet/loadingSheet",{params:{hash:t.params.id}}).then((e=>{console.log(e),i.value.forEach((t=>{t.sheetList=e.data.filter((e=>e.idLoadingSheetType==t.id))}))})).catch((e=>{console.log(e)}))}return(0,l.sV)((()=>{console.log(t.params),a.value=t.params.id,s.value=n.localStorage.getItem("User");p.A.RestUrl;u()})),{hash:a,events:o,sheetTypes:i,closeEventDay(){e.push({path:`/event/${a.value}`})}}}});var v=a(2807),m=a(7716),f=a(1693),k=a(3999),_=a(8841),A=a(124),q=a(5173),y=a(3952),L=a(3796),x=a(9626),F=a(8582),C=a.n(F);const E=(0,v.A)(b,[["render",c]]),I=E;C()(b,"components",{QPage:m.A,QBtn:f.A,QList:k.A,QExpansionItem:_.A,QItem:A.A,QItemSection:q.A,QAvatar:y.A,QItemLabel:L.A}),C()(b,"directives",{Ripple:x.A})}}]);
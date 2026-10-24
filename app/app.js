/* STRATINK™ clickable prototype — vanilla JS, hash routing, localStorage. All data is SAMPLE data. */
(function(){
/* i18n: English-only for now. To re-add a language: add its strings to S below, add it to LANGS, and restore a switcher (set st.lang). RTL locales listed in RTL get dir="rtl" via route(). */
const LANGS=[["en","English"]];
/* Icons: inline SVGs reused from the original Stratink prototype (custom inline SVG, stroke style, no icon font/CDN).
   Original: camera, megaphone, car, folder, building, truck, box, tools, bell. Added in the same stroke style: home, gear, grid, upload, users, check, doc. */
const ICONS={
camera:'<path d="M4 8h3l1.4-2h7.2L17 8h3v11H4V8Z"/><circle cx="12" cy="14" r="3.3"/>',
megaphone:'<path d="M4 13h3l8 4V7l-8 4H4v2Z"/><path d="M17 10a4 4 0 0 1 0 4"/><path d="M8 14l1.2 4H12"/>',
car:'<path d="M5 15h14l-1.4-5.2A2.5 2.5 0 0 0 15.2 8H8.8a2.5 2.5 0 0 0-2.4 1.8L5 15Z"/><path d="M6 15v3"/><path d="M18 15v3"/><circle cx="8" cy="16.5" r="1"/><circle cx="16" cy="16.5" r="1"/>',
folder:'<path d="M3 7h7l2 2h9v10H3V7Z"/>',
building:'<path d="M5 21V4h9v17"/><path d="M14 9h5v12"/><path d="M8 8h2M8 12h2M8 16h2M16 13h1"/>',
truck:'<path d="M3 7h11v9H3V7Z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
box:'<path d="M4 8l8-4 8 4v9l-8 4-8-4V8Z"/><path d="M4 8l8 4 8-4"/><path d="M12 12v9"/>',
tools:'<path d="M14 6l4 4"/><path d="M4 20l7-7"/><path d="M13 5l6 6-2 2-6-6 2-2Z"/><path d="M7 5a4 4 0 0 0 5 5l-6 6a3 3 0 0 1-2-5l3-3Z"/>',
bell:'<path d="M18 16v-5a6 6 0 0 0-12 0v5l-2 2h16l-2-2Z"/><path d="M9.5 20a2.5 2.5 0 0 0 5 0"/>',
home:'<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4v-9Z"/>',
gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
grid:'<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
upload:'<path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 16v4h16v-4"/>',
users:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5 5"/>',
check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
doc:'<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>'};
const ic=k=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[k]}</svg>`;
const RTL=["ar","fa"];
const S={en:{
value:"For BC strata councils: notices, maintenance and records in one place — fewer emails, clearer decisions.",
sample:"Sample data",demoBanner:"Demo prototype — all names, units and numbers are sample data.",
home:"Home",requests:"Requests",docs:"Documents",notices:"Notices",more:"More",dash:"Dashboard",
welcome:"Welcome home",unitLine:"Sample Tower (demo) · Unit 0101-SAMPLE",
mNew:"Report maintenance",mNewSub:"Submit & track",nTitle:"Notices & updates",nSub:"From your council",dTitle:"Documents & bylaws",dSub:"Bylaws, minutes, forms",
moreSvc:"More services",parking:"Visitor parking",packages:"Package tracking",market:"Service marketplace",amen:"Amenity booking",
recent:"Latest notices",myReq:"My requests",none:"Nothing here yet.",
cat:"Category",catPh:"Choose a category",c_common:"Common area",c_unit:"In-suite (affects common property)",c_leak:"Leak / water",c_sec:"Security / access",c_other:"Other",
loc:"Location",locPh:"e.g. Lobby front door",desc:"Description",descPh:"What happened? When did you notice it?",urg:"Urgency",u_low:"Low",u_med:"Medium",u_high:"Urgent (safety or water)",
photo:"Photo (optional)",submit:"Submit request",req:"This field is required.",minDesc:"Please write at least 10 characters.",
sent:"Request submitted",sentMsg:"Your council and manager have been notified. Reference:",viewStatus:"View status",
st_submitted:"Submitted",st_assigned:"Assigned",st_resolved:"Resolved",stD_submitted:"Received by council",stD_assigned:"Assigned to a contractor",stD_resolved:"Work completed",pending:"Pending",
ack:"Acknowledge",acked:"Acknowledged — thank you",postedBy:"Posted by",
preview:"Preview",dl:"Download",
lang:"Language",settings:"Settings",
role:"Your role",roleNote:"Your role comes from your account invite. This picker exists only for the demo.",demoPick:"DEMO ONLY: switch view",resident:"Resident",council:"Council member",
reset:"Reset demo data",signout:"Sign out (restart join flow)",
joinT:"Join your building",joinSub:"STRATINK™ is invite-only. Your strata council adds owners and residents.",code:"Invite or building code",codePh:"e.g. DEMO-4821",codeHint:"Demo code: DEMO-4821 (resident) or COUNCIL-DEMO (council)",badCode:"That code wasn't recognised. Check your invite or ask your council.",cont:"Continue",
unitT:"Confirm your unit",unitSub:"We found this invite. Please confirm the details are yours.",unit:"Unit",name:"Name on strata roll",confirm:"Yes, this is my unit",notMe:"Not my unit — contact council",
cdT:"Council dashboard",cdSub:"Sample Tower (demo) · Strata Plan SAMPLE",
mByStatus:"Maintenance by status",mByAge:"Open requests by age",d0:"< 7 days",d7:"7–30 days",d30:"> 30 days",
postN:"Post a notice",nRates:"Notice read & acknowledge rates",read:"Read",ackR:"Acknowledged",
upDoc:"Upload a document",decisions:"Decisions awaiting approval",approve:"Approve",decline:"Decline",approved:"Approved",declined:"Declined",votes:"council votes",
roster:"Owner list & invites",rosterSub:"Upload a CSV (unit,name,email) or paste lines. Invites are not sent in this demo.",parse:"Create invites",invites:"Invites created (not sent — demo)",
nTitleL:"Title",nBody:"Message",needAck:"Ask residents to acknowledge",post:"Post notice",posted:"Notice posted",
docCat:"Category",file:"File",upload:"Upload",uploaded:"Document added",
dc_bylaws:"Bylaws & rules",dc_minutes:"Minutes",dc_forms:"Forms",dc_ins:"Insurance & finance",
allReq:"All requests",setSt:"Update status",
},
/* Add locales here, e.g. fr:{...}, keyed like `en`. Missing keys fall back to English. */
};
const KEY="stratink-demo-v1";
const day=864e5,now=Date.now();
function seed(){return{lang:"en",role:null,joined:false,pending:null,
 requests:[
  {id:"SR-1001",cat:"c_common",loc:"Parkade gate (sample)",desc:"Sample: gate closes slowly.",urg:"u_med",status:"assigned",at:now-12*day,hist:{submitted:now-12*day,assigned:now-10*day}},
  {id:"SR-1002",cat:"c_leak",loc:"P1 storage (sample)",desc:"Sample: water stain on ceiling.",urg:"u_high",status:"submitted",at:now-2*day,hist:{submitted:now-2*day}},
  {id:"SR-1003",cat:"c_sec",loc:"Lobby fob reader (sample)",desc:"Sample: fob reader intermittent.",urg:"u_med",status:"submitted",at:now-41*day,hist:{submitted:now-41*day}},
  {id:"SR-1004",cat:"c_common",loc:"Gym light (sample)",desc:"Sample: light flickers.",urg:"u_low",status:"resolved",at:now-20*day,hist:{submitted:now-20*day,assigned:now-18*day,resolved:now-15*day}}],
 notices:[
  {id:"n1",title:"Sample: Annual fire inspection — suite access",body:"SAMPLE NOTICE. The annual fire alarm and sprinkler inspection requires access to every suite. Please ensure access or contact the council if you need to arrange a time. Pets should be secured.",by:"Council (sample)",at:now-1*day,needAck:true,read:68,ackd:41,mine:false},
  {id:"n2",title:"Sample: Window washing next week",body:"SAMPLE NOTICE. Exterior window washing will take place on the east side. Please keep balcony doors closed.",by:"Property manager (sample)",at:now-6*day,needAck:false,read:74,ackd:0,mine:false},
  {id:"n3",title:"Sample: AGM package available",body:"SAMPLE NOTICE. The AGM package including budget and proposed resolutions is in Documents › Minutes.",by:"Council (sample)",at:now-9*day,needAck:true,read:59,ackd:52,mine:false}],
 docs:[
  {id:"d1",cat:"dc_bylaws",name:"Sample Bylaws (consolidated).pdf",body:"SAMPLE DOCUMENT — not a real bylaw.\n\nDivision 1 — Duties of owners, tenants, occupants and visitors\n1. An owner must pay strata fees on or before the first day of the month.\n2. A resident must not cause a nuisance or hazard to another person.\n\nDivision 3 — Pets\n3. A resident may keep reasonable numbers of small pets, subject to the rules."},
  {id:"d2",cat:"dc_minutes",name:"Sample Council Minutes – Sept.pdf",body:"SAMPLE MINUTES — illustrative only.\n\nCall to order: 7:00 PM\nPresent: Council members A, B, C (sample)\n\n1. Maintenance report reviewed.\n2. Motion to obtain quotes for parkade gate repair — carried.\n3. Adjournment: 8:10 PM"},
  {id:"d3",cat:"dc_forms",name:"Sample Form K – Notice of Tenant's Responsibilities.pdf",body:"SAMPLE FORM — layout illustration only. Refer to the official BC Strata Property Act forms."},
  {id:"d4",cat:"dc_ins",name:"Sample Insurance Summary.pdf",body:"SAMPLE INSURANCE SUMMARY — illustrative only. No real policy data."}],
 decisions:[
  {id:"q1",title:"Sample: Approve parkade gate repair quote",detail:"Lowest of three sample quotes.",votes:"2/5",state:null},
  {id:"q2",title:"Sample: Renovation request — Unit 0304-SAMPLE (flooring)",detail:"Resident requests approval to replace flooring.",votes:"1/5",state:null},
  {id:"q3",title:"Sample: Adopt new bike room rule",detail:"Draft rule for discussion.",votes:"0/5",state:null}],
 invites:[],acks:{}
};}
let st;try{st=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!st)st=seed();
const d0=new Date();const iso=n=>{const d=new Date(Date.now()+n*day);return d.toISOString().slice(0,10)};
st.passes=st.passes||[{id:"P1",plate:"SAMPLE1",name:"Sample Guest",date:iso(0),from:"18:00",to:"22:00"}];
st.packages=st.packages||[{id:"K1",carrier:"Sample Courier Co.",desc:"Small box",at:Date.now()-1*day,picked:false},{id:"K2",carrier:"Demo Parcel Express",desc:"Envelope",at:Date.now()-3*day,picked:true},{id:"K3",carrier:"Sample Courier Co.",desc:"Large box",at:Date.now()-2*3600e3,picked:false}];
st.quotes=st.quotes||[];st.bookings=st.bookings||[{id:"B1",amenity:"Party room (sample)",date:iso(5),slot:"18:00–21:00"}];
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
// URL seeding for screenshots/demo links: ?demo=resident|council
const q=new URLSearchParams(location.search);
if(q.get("demo")){st.role=q.get("demo");st.joined=true}
st.lang="en";
save();
const t=k=>(S[st.lang]&&S[st.lang][k])||S.en[k]||k;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const ago=ts=>{const d=Math.floor((Date.now()-ts)/day);return d<1?"today":d+"d ago"};
const app=document.getElementById("app");
function toast(m){const el=document.getElementById("toast");el.textContent=m;el.style.display="block";clearTimeout(toast.t);toast.t=setTimeout(()=>el.style.display="none",2600)}
const sub=(title,back)=>`<header class="sub row"><a class="back" href="#${back}" aria-label="Back"><span class="chev" aria-hidden="true">‹</span></a><h1>${title}</h1></header>`;
const banners=()=>{let b=`<div class="banner demo" role="note">${t("demoBanner")}</div>`;
return b};
function tabbar(cur){const r=st.role==="council"?[["/council",ic("grid"),t("dash")],["/requests",ic("camera"),t("requests")],["/notices",ic("megaphone"),t("notices")],["/documents",ic("folder"),t("docs")],["/settings",ic("gear"),t("more")]]
 :[["/home",ic("home"),t("home")],["/requests",ic("camera"),t("requests")],["/notices",ic("megaphone"),t("notices")],["/documents",ic("folder"),t("docs")],["/settings",ic("gear"),t("more")]];
 return `<nav class="tabbar" aria-label="Main">${r.map(([h,i,l])=>`<a href="#${h}" ${cur===h?'aria-current="page"':""}><span aria-hidden="true">${i}</span>${l}</a>`).join("")}</nav>`}
const statusPill=s=>`<span class="pill s-${s}">${t("st_"+s)}</span>`;
const sampleTag=`<span class="tag">${t("sample")}</span>`;

const V={};
V.join=()=>`<div class="top"><div class="brand"><img class="brand-logo" src="logo_transparent.png" alt="STRATINK™" width="140" height="36"></div><h1>${t("joinT")}</h1><p>${t("joinSub")}</p></div>${banners()}
<main><form id="f-join" novalidate><label for="code">${t("code")}</label><input id="code" name="code" autocomplete="off" placeholder="${t("codePh")}" aria-describedby="code-h code-e" required>
<p id="code-h" class="muted">${t("codeHint")}</p><p id="code-e" class="err" role="alert"></p><button class="btn primary">${t("cont")}</button></form></main>`;
V.unit=()=>{const p=st.pending;if(!p)return V.join();return `${sub(t("unitT"),"/join")}<main><p>${t("unitSub")}</p>
<div class="card"><p class="muted">${t("unit")}</p><h3>${esc(p.unit)}</h3><p class="muted">${t("name")}</p><h3>${esc(p.name)}</h3><p class="muted">${t("role")}</p><h3>${t(p.role)}</h3> ${sampleTag}</div>
<button class="btn primary" id="confirm">${t("confirm")}</button><a class="btn ghost" href="#/join">${t("notMe")}</a></main>`};
V.home=()=>{const n=st.notices.slice(0,2),mine=st.requests.filter(r=>r.mine);return `<div class="top"><div class="row between"><div class="brand"><img class="brand-logo" src="logo_transparent.png" alt="STRATINK™" width="140" height="36"></div><a class="iconbtn" href="#/notices" aria-label="${t("notices")}"><span aria-hidden="true">${ic("bell")}</span></a></div>
<h1>${t("welcome")}</h1><p>${t("unitLine")}</p><p class="value">${t("value")}</p></div>${banners()}
<main><div class="tiles big">
<a class="tile t2" href="#/notices" aria-label="${t("nTitle")}"><span class="ic" aria-hidden="true">${ic("megaphone")}</span><span><b>${t("nTitle")}</b><br><small>${t("nSub")}</small></span></a>
<a class="tile t1" href="#/requests/new" aria-label="${t("mNew")}"><span class="ic" aria-hidden="true">${ic("camera")}</span><span><b>${t("mNew")}</b><br><small>${t("mNewSub")}</small></span></a>
<a class="tile t4" href="#/documents" aria-label="${t("dTitle")}"><span class="ic" aria-hidden="true">${ic("folder")}</span><span><b>${t("dTitle")}</b><br><small>${t("dSub")}</small></span></a>
${[[ic("car"),"parking","t3","Register a guest"],[ic("box"),"packages","t5","Deliveries & pickup"],[ic("tools"),"market","t6","Request a quote"],[ic("building"),"amen","t7","Reserve a space"]].map(([i,k,c,sub])=>`<a class="tile ${c}" href="#/${k}" aria-label="${t(k)}"><span class="ic" aria-hidden="true">${i}</span><span><b>${t(k)}</b><br><small>${sub}</small></span></a>`).join("")}
</div>
<h2>${t("recent")} ${sampleTag}</h2>${n.map(noticeCard).join("")}
${mine.length?`<h2>${t("myReq")}</h2>`+mine.map(reqCard).join(""):""}</main>${tabbar("/home")}`};
const noticeCard=n=>`<a class="card" href="#/notices/${n.id}"><h3>${esc(n.title)}</h3><p>${esc(n.by)} · ${ago(n.at)} ${n.needAck?(st.acks[n.id]?" · "+ic("check")+" "+t("acked"):" · "+t("ack")+"?"):""}</p></a>`;
const reqCard=r=>`<a class="card" href="#/requests/${r.id}"><div class="row between"><h3>${esc(r.loc)}</h3>${statusPill(r.status)}</div><p>${r.id} · ${t(r.cat)} · ${ago(r.at)}</p></a>`;
V.requests=()=>{const list=st.role==="council"?st.requests:st.requests.filter(r=>r.mine||true);
 return `${sub(st.role==="council"?t("allReq"):t("requests"),st.role==="council"?"/council":"/home")}<main><a class="btn primary" href="#/requests/new">+ ${t("mNew")}</a><h2>${t("requests")} ${sampleTag}</h2>${list.slice().sort((a,b)=>b.at-a.at).map(reqCard).join("")}</main>${tabbar("/requests")}`};
V.newReq=()=>`${sub(t("mNew"),"/requests")}<main><form id="f-req" novalidate>
<label for="cat">${t("cat")}</label><select id="cat" required aria-describedby="cat-e"><option value="">${t("catPh")}</option>${["c_common","c_unit","c_leak","c_sec","c_other"].map(c=>`<option value="${c}">${t(c)}</option>`).join("")}</select><p id="cat-e" class="err" role="alert"></p>
<label for="loc">${t("loc")}</label><input id="loc" required placeholder="${t("locPh")}" aria-describedby="loc-e"><p id="loc-e" class="err" role="alert"></p>
<label for="desc">${t("desc")}</label><textarea id="desc" required minlength="10" placeholder="${t("descPh")}" aria-describedby="desc-e"></textarea><p id="desc-e" class="err" role="alert"></p>
<fieldset style="border:0;padding:0;margin:0"><legend><label as="span" style="margin-bottom:6px">${t("urg")}</label></legend><div class="chips">${["u_low","u_med","u_high"].map((u,i)=>`<label class="chip" style="margin:0;font-weight:600"><input type="radio" name="urg" value="${u}" ${i==1?"checked":""} style="width:auto;margin-inline-end:6px">${t(u)}</label>`).join("")}</div></fieldset>
<label for="photo">${t("photo")}</label><input id="photo" type="file" accept="image/*">
<button class="btn primary">${t("submit")}</button></form></main>${tabbar("/requests")}`;
V.reqDetail=id=>{const r=st.requests.find(x=>x.id===id);if(!r)return V.requests();const order=["submitted","assigned","resolved"],ci=order.indexOf(r.status);
 const conf=sessionStorage.getItem("justSent")===id;sessionStorage.removeItem("justSent");
 return `${sub(r.id,"/requests")}<main>${conf?`<div class="card" style="border-color:var(--green);background:#F2FAEE" role="status"><h3>${ic("check")} ${t("sent")}</h3><p>${t("sentMsg")} <b>${r.id}</b></p></div>`:""}
<div class="card"><div class="row between"><h3>${esc(r.loc)}</h3>${statusPill(r.status)}</div><p>${t(r.cat)} · ${t(r.urg)}</p><p style="margin-top:8px;color:var(--text)">${esc(r.desc)}</p></div>
<h2>${t("viewStatus")}</h2><ol class="timeline">${order.map((s,i)=>`<li class="${i<ci?"done":i===ci?(s==="resolved"?"done":"now"):""}"><b>${t("st_"+s)}</b><small>${r.hist[s]?new Date(r.hist[s]).toLocaleDateString(st.lang)+" · "+t("stD_"+s):t("pending")}</small></li>`).join("")}</ol>
${st.role==="council"&&r.status!=="resolved"?`<button class="btn secondary" id="advance" data-id="${r.id}">${t("setSt")}: ${t("st_"+order[ci+1])}</button>`:""}</main>${tabbar("/requests")}`};
V.notices=()=>`${sub(t("nTitle"),st.role==="council"?"/council":"/home")}<main>${st.role==="council"?`<a class="btn primary" href="#/council/notice">+ ${t("postN")}</a>`:""}<h2>${t("notices")} ${sampleTag}</h2>${st.notices.map(noticeCard).join("")}</main>${tabbar("/notices")}`;
V.notice=id=>{const n=st.notices.find(x=>x.id===id);if(!n)return V.notices();if(!n.seen){n.seen=1;save()}const a=st.acks[id];
 return `${sub(t("notices"),"/notices")}<main><article class="card"><h3 style="font-size:18px">${esc(n.title)}</h3><p>${t("postedBy")} ${esc(n.by)} · ${new Date(n.at).toLocaleDateString(st.lang)}</p><p style="color:var(--text);margin-top:12px;font-size:15px">${esc(n.body)}</p></article>
${n.needAck?(a?`<p class="card center" role="status" style="background:#F2FAEE">${ic("check")} ${t("acked")}</p>`:`<button class="btn primary" id="ack" data-id="${id}">${t("ack")}</button>`):""}</main>${tabbar("/notices")}`};
V.documents=()=>{const cats=["dc_bylaws","dc_minutes","dc_forms","dc_ins"];return `${sub(t("dTitle"),st.role==="council"?"/council":"/home")}<main>${st.role==="council"?`<a class="btn primary" href="#/council/upload">+ ${t("upDoc")}</a>`:""}
${cats.map(c=>{const d=st.docs.filter(x=>x.cat===c);return `<h2>${t(c)}</h2>`+(d.length?d.map(x=>`<a class="card row between" href="#/documents/${x.id}"><span>${ic("doc")} ${esc(x.name)}</span><span class="pill s-submitted">${t("preview")}</span></a>`).join(""):`<p class="muted">${t("none")}</p>`)}).join("")}</main>${tabbar("/documents")}`};
V.doc=id=>{const d=st.docs.find(x=>x.id===id);if(!d)return V.documents();return `${sub(t("preview"),"/documents")}<main><p class="muted">${t(d.cat)} · ${sampleTag}</p><h2>${esc(d.name)}</h2>
${d.img?`<img src="${d.img}" alt="${esc(d.name)}" style="max-width:100%;border-radius:8px">`:`<div class="doc" tabindex="0" aria-label="${t("preview")}">${esc(d.body||"(Preview not available for this file type in the demo.)").replace(/\n/g,"<br>")}</div>`}
<button class="btn ghost" onclick="alert('Download is disabled in this demo.')">${t("dl")}</button></main>${tabbar("/documents")}`};
V.council=()=>{const R=st.requests,c=s=>R.filter(r=>r.status===s).length,open=R.filter(r=>r.status!=="resolved"),age=d=>(Date.now()-d)/day;
 const a0=open.filter(r=>age(r.at)<7).length,a7=open.filter(r=>age(r.at)>=7&&age(r.at)<=30).length,a30=open.filter(r=>age(r.at)>30).length;
 return `<div class="top council"><div class="row between"><div class="brand row"><img class="brand-logo" src="logo_transparent.png" alt="STRATINK™" width="140" height="36"><span>${t("council")}</span></div><a class="iconbtn" href="#/settings" aria-label="${t("settings")}"><span aria-hidden="true">${ic("gear")}</span></a></div><h1>${t("cdT")}</h1><p>${t("cdSub")}</p><p class="value">${t("value")}</p></div>${banners()}
<main><h2>${t("mByStatus")} ${sampleTag}</h2><div class="stats">${["submitted","assigned","resolved"].map(s=>`<a class="stat" href="#/requests" style="text-decoration:none"><b>${c(s)}</b><span>${t("st_"+s)}</span></a>`).join("")}</div>
<h2>${t("mByAge")} ${sampleTag}</h2><div class="stats"><div class="stat"><b>${a0}</b><span>${t("d0")}</span></div><div class="stat"><b>${a7}</b><span>${t("d7")}</span></div><div class="stat"><b style="color:${a30?"var(--red)":"var(--royal)"}">${a30}</b><span>${t("d30")}</span></div></div>
<h2>${t("nRates")} ${sampleTag}</h2>${st.notices.slice(0,3).map(n=>`<a class="card" href="#/notices/${n.id}"><h3>${esc(n.title)}</h3><p>${t("read")} ${n.read}%</p><div class="bar" aria-hidden="true"><i style="width:${n.read}%;background:var(--royal)"></i></div>${n.needAck?`<p style="margin-top:6px">${t("ackR")} ${n.ackd}%</p><div class="bar" aria-hidden="true"><i style="width:${n.ackd}%"></i></div>`:""}</a>`).join("")}
<div class="tiles" style="margin-top:12px"><a class="tile t2" href="#/council/notice"><span class="ic" aria-hidden="true">${ic("megaphone")}</span><b>${t("postN")}</b></a><a class="tile t4" href="#/council/upload"><span class="ic" aria-hidden="true">${ic("upload")}</span><b>${t("upDoc")}</b></a><a class="tile t3 wide" href="#/council/roster"><span class="ic" aria-hidden="true">${ic("users")}</span><b>${t("roster")}</b></a></div>
<h2>${t("decisions")} ${sampleTag}</h2>${st.decisions.map(d=>`<div class="card"><h3>${esc(d.title)}</h3><p>${esc(d.detail)} · ${d.votes} ${t("votes")}</p>${d.state?`<p><b>${t(d.state)}</b></p>`:`<div class="row"><button class="btn secondary" style="margin-top:10px" data-dec="${d.id}" data-v="approved">${t("approve")}</button><button class="btn ghost" style="margin-top:10px" data-dec="${d.id}" data-v="declined">${t("decline")}</button></div>`}</div>`).join("")}
</main>${tabbar("/council")}`};
V.postNotice=()=>`${sub(t("postN"),"/council")}<main><form id="f-notice" novalidate><label for="nt">${t("nTitleL")}</label><input id="nt" required aria-describedby="nt-e"><p id="nt-e" class="err" role="alert"></p>
<label for="nb">${t("nBody")}</label><textarea id="nb" required aria-describedby="nb-e"></textarea><p id="nb-e" class="err" role="alert"></p>
<label style="display:flex;gap:8px;align-items:center;font-weight:600"><input type="checkbox" id="na" checked style="width:auto"> ${t("needAck")}</label><button class="btn primary">${t("post")}</button></form></main>${tabbar("/council")}`;
V.upload=()=>`${sub(t("upDoc"),"/council")}<main><form id="f-up" novalidate><label for="uc">${t("docCat")}</label><select id="uc">${["dc_bylaws","dc_minutes","dc_forms","dc_ins"].map(c=>`<option value="${c}">${t(c)}</option>`).join("")}</select>
<label for="uf">${t("file")}</label><input id="uf" type="file" required aria-describedby="uf-e"><p id="uf-e" class="err" role="alert"></p><p class="muted">Stays in this browser only (demo). Text and image files can be previewed.</p><button class="btn primary">${t("upload")}</button></form></main>${tabbar("/documents")}`;
V.roster=()=>`${sub(t("roster"),"/council")}<main><p class="muted">${t("rosterSub")}</p><form id="f-roster"><label for="rf">CSV</label><input id="rf" type="file" accept=".csv,text/csv,text/plain">
<label for="rt">…or paste</label><textarea id="rt" placeholder="0101-SAMPLE, Sample Owner A, owner.a@example.com"></textarea><button class="btn primary">${t("parse")}</button></form>
${st.invites.length?`<h2>${t("invites")}</h2><table><thead><tr><th>${t("unit")}</th><th>${t("name")}</th><th>Code</th></tr></thead><tbody>${st.invites.map(i=>`<tr><td>${esc(i.unit)}</td><td>${esc(i.name)}</td><td><code>${i.code}</code></td></tr>`).join("")}</tbody></table>`:""}</main>${tabbar("/council")}`;
V.settings=()=>`${sub(t("settings"),st.joined?(st.role==="council"?"/council":"/home"):"/join")}<main>${st.joined?`<h2>${t("role")}</h2><p class="muted">${t("roleNote")}</p><div class="card demo"><p><b>${t("demoPick")}</b></p><div class="chips" style="margin-top:8px"><button class="chip" data-role="resident" aria-pressed="${st.role==="resident"}">${t("resident")}</button><button class="chip" data-role="council" aria-pressed="${st.role==="council"}">${t("council")}</button></div></div>`:""}
<h2>${t("moreSvc")}</h2>${[["car","parking"],["box","packages"],["tools","market"],["building","amen"]].map(([i,k])=>`<a class="card row" href="#/${k}">${ic(i)} ${t(k)}</a>`).join("")}
<button class="btn ghost" id="signout">${t("signout")}</button><button class="btn ghost" id="reset">${t("reset")}</button></main>${st.joined?tabbar("/settings"):""}`;

const PROVIDERS={clean:["Sample Sparkle Cleaning (demo)","Demo Fresh Home Services"],move:["Sample Movers Ltd. (demo)","Demo Junk Away"],handy:["Demo Handy Helpers","Sample FixIt Crew (demo)"],trade:["Sample Spark Electrical (demo)","Demo Flow Plumbing"]};
const PCAT={clean:"Cleaning",move:"Moving & junk removal",handy:"Handyman & small repairs",trade:"Electricians & plumbers"};
const AMEN=["Party room (sample)","Guest suite (sample)","Meeting room (sample)","Moving elevator (sample)"],SLOTS=["09:00–12:00","12:00–15:00","15:00–18:00","18:00–21:00"];
const back=()=>st.role==="council"?"/council":"/home";
V.parking=()=>`${sub(t("parking"),back())}<main><form id="f-park" novalidate>
<label for="pp">Licence plate</label><input id="pp" required autocomplete="off" placeholder="e.g. DEMO123" aria-describedby="pp-e"><p id="pp-e" class="err" role="alert"></p>
<label for="pg">Guest name</label><input id="pg" required aria-describedby="pg-e"><p id="pg-e" class="err" role="alert"></p>
<label for="pd">Date</label><input id="pd" type="date" required value="${iso(0)}" aria-describedby="pd-e"><p id="pd-e" class="err" role="alert"></p>
<div class="row"><div style="flex:1"><label for="pf">From</label><input id="pf" type="time" value="18:00" required></div><div style="flex:1"><label for="pt">To</label><input id="pt" type="time" value="22:00" required></div></div>
<button class="btn primary">Register visitor</button></form>
<h2>Visitor passes ${sampleTag}</h2>${st.passes.slice().reverse().map(p=>`<div class="card"><div class="row between"><h3>${ic("car")} ${esc(p.plate)}</h3><button class="chip" data-delpass="${p.id}" aria-label="Cancel pass for ${esc(p.plate)}">Cancel</button></div><p>${esc(p.name)} · ${p.date} · ${p.from}–${p.to}</p></div>`).join("")||`<p class="muted">${t("none")}</p>`}</main>${tabbar("")}`;
V.packages=()=>`${sub(t("packages"),back())}<main><p class="muted">Delivery notices for your unit. Mark a package picked up once you've collected it.</p><h2>Deliveries ${sampleTag}</h2>
${st.packages.slice().sort((a,b)=>a.picked-b.picked||b.at-a.at).map(k=>`<div class="card"><div class="row between"><h3>${ic("box")} ${esc(k.desc)}</h3><span class="pill ${k.picked?"s-resolved":"s-assigned"}">${k.picked?"Picked up":"Waiting"}</span></div><p>${esc(k.carrier)} · arrived ${ago(k.at)}</p>
<label style="display:flex;gap:8px;align-items:center;font-weight:600;margin-top:10px"><input type="checkbox" data-pkg="${k.id}" ${k.picked?"checked":""} style="width:auto"> Picked up</label></div>`).join("")}</main>${tabbar("")}`;
V.market=()=>`${sub(t("market"),back())}<main><p class="muted">Book local service providers for your home. All providers below are fictional examples.</p>
${Object.keys(PCAT).map(c=>`<h2>${PCAT[c]}</h2>${PROVIDERS[c].map((n,i)=>`<a class="card row between" href="#/market/${c}-${i}"><span>${ic("tools")} ${esc(n)}</span><span class="tag">${t("sample")}</span></a>`).join("")}`).join("")}
${st.quotes.length?`<h2>My quote requests</h2>`+st.quotes.slice().reverse().map(q=>`<div class="card"><h3>${esc(q.provider)}</h3><p>${q.ref} · ${esc(q.when)} · Sent</p></div>`).join(""):""}</main>${tabbar("")}`;
V.quote=id=>{const [c,i]=id.split("-");const n=PROVIDERS[c]&&PROVIDERS[c][i];if(!n)return V.market();const done=sessionStorage.getItem("quoteDone");sessionStorage.removeItem("quoteDone");
 return `${sub("Request a quote","/market")}<main>${done?`<div class="card" role="status" style="border-color:var(--green);background:#F2FAEE"><h3>${ic("check")} Quote request sent</h3><p>Reference ${done}. The provider will reply in the app. No payment is taken. (Demo: nothing is actually sent.)</p></div>`:""}
<div class="card"><h3>${esc(n)}</h3><p>${PCAT[c]} · fictional provider</p></div><form id="f-quote" data-provider="${esc(n)}" novalidate>
<label for="qd">What do you need?</label><textarea id="qd" required aria-describedby="qd-e" placeholder="e.g. Two-bedroom deep clean"></textarea><p id="qd-e" class="err" role="alert"></p>
<label for="qw">Preferred date</label><input id="qw" type="date" required value="${iso(3)}" aria-describedby="qw-e"><p id="qw-e" class="err" role="alert"></p>
<button class="btn primary">Request quote</button></form></main>${tabbar("")}`};
V.amen=()=>`${sub(t("amen"),back())}<main><form id="f-amen" novalidate>
<label for="aa">Amenity</label><select id="aa">${AMEN.map(a=>`<option>${a}</option>`).join("")}</select>
<label for="ad">Date</label><input id="ad" type="date" required value="${iso(2)}" aria-describedby="ad-e"><p id="ad-e" class="err" role="alert"></p>
<fieldset style="border:0;padding:0;margin:0"><legend style="font-weight:700;color:var(--navy);margin:14px 0 6px">Time slot</legend><div class="chips">${SLOTS.map((x,i)=>`<label class="chip" style="margin:0;font-weight:600"><input type="radio" name="slot" value="${x}" ${i==3?"checked":""} style="width:auto;margin-inline-end:6px">${x}</label>`).join("")}</div></fieldset>
<button class="btn primary">Confirm booking</button></form>
<h2>My bookings ${sampleTag}</h2>${st.bookings.slice().reverse().map(b=>`<div class="card"><div class="row between"><h3>${ic("building")} ${esc(b.amenity)}</h3><button class="chip" data-delbook="${b.id}" aria-label="Cancel booking for ${esc(b.amenity)}">Cancel</button></div><p>${b.date} · ${b.slot} · Confirmed</p></div>`).join("")||`<p class="muted">${t("none")}</p>`}</main>${tabbar("")}`;

function route(){const h=(location.hash||"#/").slice(1),p=h.split("/").filter(Boolean);
 document.documentElement.lang=st.lang;document.documentElement.dir=RTL.includes(st.lang)?"rtl":"ltr";
 let html;
 if(!st.joined&&!["join","unit","settings"].includes(p[0]))return location.replace("#/join");
 switch(p[0]){case"join":html=V.join();break;case"unit":html=V.unit();break;case"home":html=st.role==="council"?V.council():V.home();break;
  case"requests":html=p[1]==="new"?V.newReq():p[1]?V.reqDetail(p[1]):V.requests();break;
  case"notices":html=p[1]?V.notice(p[1]):V.notices();break;case"documents":html=p[1]?V.doc(p[1]):V.documents();break;
  case"council":html=st.role!=="council"?V.home():p[1]==="notice"?V.postNotice():p[1]==="upload"?V.upload():p[1]==="roster"?V.roster():V.council();break;
  case"settings":html=V.settings();break;case"parking":html=V.parking();break;case"packages":html=V.packages();break;case"market":html=p[1]?V.quote(p[1]):V.market();break;case"amen":html=V.amen();break;default:return location.replace(st.role==="council"?"#/council":"#/home")}
 app.innerHTML=html;app.scrollTop=0;window.scrollTo(0,0);const h1=app.querySelector("h1");if(h1){h1.tabIndex=-1;}}
function setErr(id,msg){const el=document.getElementById(id),e=document.getElementById(id+"-e");el.setAttribute("aria-invalid",msg?"true":"false");e.textContent=msg||"";return !msg}
app.addEventListener("submit",e=>{e.preventDefault();const f=e.target;
 if(f.id==="f-join"){const v=f.code.value.trim().toUpperCase();const inv=st.invites.find(i=>i.code===v);
  const p=v==="DEMO-4821"?{unit:"0101-SAMPLE",name:"Sample Resident",role:"resident"}:v==="COUNCIL-DEMO"?{unit:"0202-SAMPLE",name:"Sample Council Member",role:"council"}:inv?{unit:inv.unit,name:inv.name,role:"resident"}:null;
  if(!v)return setErr("code",t("req"));if(!p)return setErr("code",t("badCode"));st.pending=p;save();location.hash="#/unit"}
 if(f.id==="f-req"){const ok=[setErr("cat",f.cat.value?"":t("req")),setErr("loc",f.loc.value.trim()?"":t("req")),setErr("desc",!f.desc.value.trim()?t("req"):f.desc.value.trim().length<10?t("minDesc"):"")];
  if(ok.includes(false)){f.querySelector("[aria-invalid=true]").focus();return}
  const id="SR-"+(1000+st.requests.length+1);st.requests.push({id,cat:f.cat.value,loc:f.loc.value.trim(),desc:f.desc.value.trim(),urg:f.urg.value,status:"submitted",at:Date.now(),hist:{submitted:Date.now()},mine:true});save();sessionStorage.setItem("justSent",id);location.hash="#/requests/"+id}
 if(f.id==="f-notice"){const ok=[setErr("nt",f.nt.value.trim()?"":t("req")),setErr("nb",f.nb.value.trim()?"":t("req"))];if(ok.includes(false))return;
  st.notices.unshift({id:"n"+Date.now(),title:f.nt.value.trim(),body:f.nb.value.trim(),by:"You (council, demo)",at:Date.now(),needAck:f.na.checked,read:0,ackd:0});save();toast(t("posted"));location.hash="#/council"}
 if(f.id==="f-up"){const file=f.uf.files[0];if(!setErr("uf",file?"":t("req")))return;const d={id:"d"+Date.now(),cat:f.uc.value,name:file.name};
  const done=()=>{st.docs.push(d);save();toast(t("uploaded"));location.hash="#/documents/"+d.id};const r=new FileReader();
  if(file.type.startsWith("text")&&file.size<200000){r.onload=()=>{d.body=r.result;done()};r.readAsText(file)}else if(file.type.startsWith("image")&&file.size<1500000){r.onload=()=>{d.img=r.result;done()};r.readAsDataURL(file)}else done()}
 if(f.id==="f-park"){const ok=[setErr("pp",f.pp.value.trim()?"":t("req")),setErr("pg",f.pg.value.trim()?"":t("req")),setErr("pd",f.pd.value?"":t("req"))];if(ok.includes(false))return;
  st.passes.push({id:"P"+Date.now(),plate:f.pp.value.trim().toUpperCase(),name:f.pg.value.trim(),date:f.pd.value,from:f.pf.value,to:f.pt.value});save();toast("Visitor pass registered");route()}
 if(f.id==="f-quote"){const ok=[setErr("qd",f.qd.value.trim()?"":t("req")),setErr("qw",f.qw.value?"":t("req"))];if(ok.includes(false))return;
  const ref="Q-"+(2000+st.quotes.length+1);st.quotes.push({ref,provider:f.dataset.provider,when:f.qw.value,desc:f.qd.value.trim()});save();sessionStorage.setItem("quoteDone",ref);route()}
 if(f.id==="f-amen"){if(!setErr("ad",f.ad.value?"":t("req")))return;st.bookings.push({id:"B"+Date.now(),amenity:f.aa.value,date:f.ad.value,slot:f.slot.value});save();toast("Booking confirmed");route()}
 if(f.id==="f-roster"){const go=txt=>{txt.split(/\r?\n/).map(l=>l.split(",").map(s=>s.trim())).filter(c=>c[0]&&!/^unit$/i.test(c[0])).forEach(c=>st.invites.push({unit:c[0],name:c[1]||"",email:c[2]||"",code:"INV-"+Math.random().toString(36).slice(2,6).toUpperCase()}));save();route()};
  const file=f.rf.files[0];if(file){const r=new FileReader();r.onload=()=>go(r.result);r.readAsText(file)}else go(f.rt.value)}
});
app.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
 if(b.dataset.delpass){st.passes=st.passes.filter(p=>p.id!==b.dataset.delpass);save();route();return}
 if(b.dataset.delbook){st.bookings=st.bookings.filter(p=>p.id!==b.dataset.delbook);save();route();return}
 if(b.id==="confirm"){st.role=st.pending.role;st.joined=true;st.pending=null;save();location.hash=st.role==="council"?"#/council":"#/home"}
 if(b.id==="ack"){st.acks[b.dataset.id]=1;const n=st.notices.find(x=>x.id===b.dataset.id);n.ackd=Math.min(100,n.ackd+1);save();route()}
 if(b.id==="advance"){const r=st.requests.find(x=>x.id===b.dataset.id);r.status=r.status==="submitted"?"assigned":"resolved";r.hist[r.status]=Date.now();save();route()}
 if(b.dataset.dec){st.decisions.find(d=>d.id===b.dataset.dec).state=b.dataset.v;save();route()}
 if(b.dataset.role){st.role=b.dataset.role;save();location.hash=st.role==="council"?"#/council":"#/home"}
 if(b.id==="signout"){st.joined=false;st.role=null;save();location.hash="#/join"}
 if(b.id==="reset"){const l=st.lang;st=seed();st.lang=l;save();location.hash="#/join";route()}
});
app.addEventListener("change",e=>{const c=e.target.closest("[data-pkg]");if(!c)return;st.packages.find(k=>k.id===c.dataset.pkg).picked=c.checked;save();toast(c.checked?"Marked picked up":"Marked waiting");route()});
addEventListener("hashchange",route);route();
})();

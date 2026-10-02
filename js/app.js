const {D,L,G}=window.DATA;
let S={d:{},xp:0,sk:0,last:"",p:{},rev:{},lg:[]},V="home",cur=1,st=0,REF=null,NAV=false;
try{S=Object.assign(S,JSON.parse(localStorage.getItem("ep2")||"{}"))}catch(e){}
const $=id=>document.getElementById(id),today=()=>new Date().toDateString();
const sv=()=>{try{localStorage.setItem("ep2",JSON.stringify(S))}catch(e){}if(REF)REF.set(JSON.parse(JSON.stringify(S))).catch(()=>{})};
const P=d=>S.p[d]||(S.p[d]={q:{},x:{},fl:0,ch:0,rf:"",lr:0});
const un=n=>n==1||(S.d[n-1]&&S.d[n-1]!=today());
const qok=d=>L[d].q.every((q,i)=>P(d).q[i]===q.a);
const steps=d=>{const p=P(d);return[!!p.lr,!!p.fl,qok(d),!!(p.ch&&(p.rf||"").length>=30)]};
const nd=()=>[...Array(21).keys()].map(i=>i+1).find(i=>!S.d[i])||21;
function go(v,d){V=v;if(d){cur=d;st=0}NAV=false;R(1)}
function side(){let h=`<div class="brand">ExpressPath</div>`;
[["home","Home"],["review","Review"+(Object.keys(S.rev).length?" ("+Object.keys(S.rev).length+")":"")],["gloss","Glossary"]].forEach(n=>h+=`<button class="nv ${V==n[0]?"on":""}" onclick="go('${n[0]}')">${n[1]}</button>`);
for(let w=0;w<3;w++){h+=`<div class="wk">Week ${w+1}</div>`;for(let i=w*7+1;i<=w*7+7;i++)h+=`<button class="dy ${S.d[i]?"ok":""} ${V=="lesson"&&cur==i?"on":""}" ${un(i)?"":"disabled"} onclick="go('lesson',${i})"><span class="nm">${S.d[i]?"\u2713":i}</span>${D[i-1][0]}</button>`}
return h+`<div class="ft">${S.xp} XP &middot; ${S.sk}-day streak<br>${REF?"Signed in. Progress synced.":"Progress saved on this device."}</div>`}
function home(){const n=Object.keys(S.d).length,c=nd(),ok=un(c);
let h=`<h1>Learn Express.js in 21 days</h1><p class="sub">One lesson a day. You build a Task Management API as you go.</p>
<div class="card"><b>${n} of 21 days complete</b><div class="bar"><i style="width:${n/21*100}%"></i></div></div>
<div class="card"><span class="hl">${n==21?"All done":"Up next"}</span><h2 style="margin-top:12px">Day ${c}: ${D[c-1][0]}</h2><p class="sub">${D[c-1][1]}.</p>`+(ok?`<button class="btn" onclick="go('lesson',${c})">${S.p[c]?"Continue":"Start"} lesson</button>`:`<p class="msg">Day ${c-1} is done. Come back tomorrow for Day ${c}.</p>`)+`</div>
<div class="row"><div class="card st"><b>${S.xp}</b><span>XP earned</span></div><div class="card st"><b>${S.sk}</b><span>day streak</span></div><div class="card st"><b>${S.lg.length}</b><span>days logged in</span></div></div>`;
return h}
function qh(d,i){const q=L[d].q[i],a=P(d).q[i];let h=`<div class="q"><b>${i+1}. ${q.q}</b>`;
q.o.forEach((t,j)=>h+=`<button class="o ${a===undefined?"":j==q.a&&a==q.a?"r":j==a?"w":""}" ${a==q.a?"disabled":""} onclick="pick(${d},${i},${j})">${t}</button>`);
if(a!==undefined)h+=`<p class="ex">${a==q.a?"Correct. ":"Not quite. "}${q.e}</p>`+(a!=q.a?`<button class="btn g" onclick="retry(${d},${i})">Try again</button>`:"");return h+"</div>"}
function pick(d,i,j){const p=P(d),q=L[d].q[i];p.q[i]=j;if(j==q.a){delete S.rev[d+"-"+i];if(!p.x[i]){p.x[i]=1;S.xp+=10}}else S.rev[d+"-"+i]=q.c;sv();R()}
function retry(d,i){delete P(d).q[i];R()}
function chk(d){const f=L[d].fill,v=[...document.querySelectorAll(".f")].map(x=>x.value.trim().toLowerCase()),ok=f.a.every((a,i)=>v[i]==a.toLowerCase());
if(ok&&!P(d).fl){P(d).fl=1;S.xp+=15;sv()}$("fm").textContent=ok?"Correct. Read the finished code and say what each line does.":"Not yet. Reread the lesson code and think about what each blank does.";$("fm").style.color=ok?"var(--ac)":"var(--bad)"}
function lesson(){const d=cur,t=D[d-1],l=L[d],p=P(d),s=steps(d);
if(!un(d))return `<h1>Day ${d}: ${t[0]}</h1><div class="card"><p class="msg">Locked. Finish day ${d-1}, then come back tomorrow.</p></div>`;
const nx=`<p><button class="btn" onclick="st=${st+1};R(1)">Continue</button></p>`;
let h=`<p class="sub">Week ${Math.ceil(d/7)} &middot; Day ${d} of 21</p><h1>${t[0]}</h1><p class="sub">Task API step: ${t[2]}</p><div class="steps">`+["Learn","Practice","Quiz","Build"].map((n,i)=>`<button class="sp ${i==st?"on":""} ${s[i]?"ok":""}" onclick="st=${i};R(1)">${n}</button>`).join("")+`</div>`;
if(st==0)h+=l.s.map(x=>`<section><h2>${x[0]}</h2>${x[1]}</section>`).join("")+`<p><button class="btn" onclick="P(${d}).lr=1;sv();st=1;R(1)">I have read this. Continue</button></p>`;
if(st==1)h+=`<h2>Complete the code</h2><p>Fill each blank, then check.</p><pre><code>${l.fill.code.split("___").map((x,i,a)=>x.replace(/</g,"&lt;")+(i<a.length-1?`<input class="f" aria-label="blank ${i+1}">`:"")).join("")}</code></pre><button class="btn" onclick="chk(${d})">Check</button><p id="fm" class="msg"></p>`+(p.fl?nx:"");
if(st==2)h+=`<h2>Quiz</h2>`+l.q.map((_,i)=>qh(d,i)).join("")+(s[2]?nx:"");
if(st==3){h+=`<h2>Can you do this?</h2><p>${l.ch}</p><label><input type="checkbox" ${p.ch?"checked":""} onchange="P(${d}).ch=this.checked?1:0;sv();R()"> I built it in my own editor and it works</label><h2>Reflect</h2><p>${l.rf}</p><textarea oninput="P(${d}).rf=this.value;sv()" onblur="R()">${(p.rf||"").replace(/</g,"&lt;")}</textarea>
<h2>Finish the day</h2><ul class="ck">`+["Read the lesson","Completed the practice code","All quiz questions correct","Built the challenge and wrote a reflection (30+ characters)"].map((x,i)=>`<li class="${s[i]?"y":""}">${x}</li>`).join("")+`</ul>`+(S.d[d]?`<p class="msg">Day ${d} complete. Come back tomorrow for the next one.</p>`:`<button class="btn" ${s.every(Boolean)?"":"disabled"} onclick="fin(${d})">Complete day (+50 XP)</button>`)}
return h}
function fin(d){if(!steps(d).every(Boolean)||S.d[d])return;const t=today(),y=new Date(Date.now()-864e5).toDateString();S.d[d]=t;S.xp+=50;S.sk=S.last==t?S.sk:S.last==y?S.sk+1:1;S.last=t;sv();go("home")}
function review(){const k=Object.keys(S.rev);return `<h1>Review</h1><p class="sub">Questions you missed return here until you answer them correctly.</p>`+(k.length?k.map(x=>{const[d,i]=x.split("-").map(Number);return `<div class="card"><p class="msg">Day ${d}: ${D[d-1][0]}</p>${qh(d,i)}</div>`}).join(""):`<div class="card">Nothing to review yet.</div>`)}
function gloss(){return `<h1>Glossary</h1><p class="sub">Each term, three ways.</p>`+G.map(g=>`<div class="card"><b>${g[0]}</b><div class="lv"><b>Simple.</b> ${g[1]}</div><div class="lv"><b>In our project.</b> ${g[2].replace(/</g,"&lt;")}</div><div class="lv"><b>Technical.</b> ${g[3]}</div></div>`).join("")}
function R(top){$("sb").innerHTML=side();$("m").innerHTML=V=="home"?home():V=="lesson"?lesson():V=="review"?review():gloss();document.body.classList.toggle("nav",NAV);if(top)scrollTo(0,0)}
cur=nd();R();
(async()=>{try{const u=window.claude&&await claude.use("user"),db=window.claude&&await claude.use("db");if(u&&db){const id=await u.id();REF=db.collection("data/users/"+id).doc("progress2");const r=await REF.get();if(r.exists)S=Object.assign(S,JSON.parse(JSON.stringify(r.data())));if(!S.lg.includes(today())){S.lg.push(today());sv()}cur=nd();R()}}catch(e){}})();

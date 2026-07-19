/* ===================================================================
   RUTHLESS SYNDICATE: interactions & content
   =================================================================== */

/* ---- image pool (real photos w/ graceful gradient fallback) ---- */
const IMG = {
  tee:    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80',
  hoodie: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80',
  gloves: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?auto=format&fit=crop&w=700&q=80',
  shorts: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
  cap:    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80',
  crop:   'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=700&q=80',
  legging:'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=700&q=80',
  bag:    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
  loyaltyFront: 'assets/loyalty-tee-front.jpg',
  loyaltyBack:  'assets/loyalty-tee-back.jpg',
  fighter:'assets/tommy-mcmillen.jpg',
  athlete:'assets/steven-nguyen.png',
  boxer:  'assets/shane-jordan.png',
  bjj:    'assets/charles-rosa.jpg',
  hoops:  'assets/kai-lau-quan.jpg',
  train:  'assets/mike-fontanez.jpg',
};

/* ---- products ---- */
const PRODUCTS = [
  { name:'Ruthless Standard Tee',    cat:'mens',        cats:['mens','new'], price:'$38', old:null,  badge:'New',  img:IMG.tee },
  { name:'Grind Heavyweight Hoodie', cat:'mens',        cats:['mens'],       price:'$72', old:null,  badge:null,   img:IMG.hoodie },
  { name:'Fight Camp Boxing Gloves', cat:'accessories', cats:['accessories'],price:'$89', old:null,  badge:'Pro',  img:IMG.gloves },
  { name:'Cage Fight Shorts',        cat:'mens',        cats:['mens','new'], price:'$54', old:null,  badge:'New',  img:IMG.shorts },
  { name:'Syndicate Snapback',       cat:'accessories', cats:['accessories'],price:'$32', old:'$40', badge:'Sale', img:IMG.cap },
  { name:"Discipline Sports Crop",   cat:'womens',      cats:['womens','new'],price:'$42',old:null,  badge:'New',  img:IMG.crop },
  { name:'Relentless Leggings',      cat:'womens',      cats:['womens'],     price:'$58', old:null,  badge:null,   img:IMG.legging },
  { name:'Loyalty Gym Duffel',       cat:'accessories', cats:['accessories'],price:'$68', old:null,  badge:null,   img:IMG.bag },
  { name:'Black Ruthless Syndicate "Loyalty" Tee', cat:'mens', cats:['mens','new'], price:'$38', old:null, badge:'New', img:IMG.loyaltyFront, imgHover:IMG.loyaltyBack },
];

/* ---- athletes ---- */
const ATHLETES = [
  { name:'Tommy "Gunz" McMillen', nick:'UFC / MMA', sport:'Mixed Martial Arts', img:IMG.fighter,
    bio:"Dana White's Contender Series winner in 2025. Explosive power and calculated aggression, UFC debut set for March 2026. Blue-collar work ethic that refuses to break under pressure." },
  { name:'Shane Jordan', nick:'"Suga", BKFC', sport:'Bare-Knuckle Boxing', img:IMG.boxer, pos:'top',
    bio:"Rising bare-knuckle bantamweight out of LA with Boston ties. Grit, discipline and fearless determination, trainer at Brawler gym and a dedicated girl dad." },
  { name:'Steven Nguyen', nick:'"Ninja"', sport:'Mixed Martial Arts', img:IMG.athlete, pos:'top',
    bio:"Speed, precision and high fight IQ. Blends technical striking with relentless pace, focus, loyalty and quiet confidence inside the cage." },
  { name:'Mike Fontanez', nick:'"Blessed Southpaw", 12-0-1', sport:'Professional Boxing', img:IMG.train, pos:'30% center',
    bio:"Undefeated super welterweight out of Nashua, NH. 6'0\" southpaw, 12-0-1 with 8 KOs, signed with CES Boxing. Technical precision meets knockout power." },
  { name:'Charles Rosa', nick:'"Boston Strong", UFC Vet', sport:'Mixed Martial Arts', img:IMG.bjj,
    bio:"Seasoned UFC veteran out of Boston. Built on grit, durability and elite Brazilian jiu-jitsu, competes with heart and relentless pressure." },
  { name:'Kai Lau Quan', nick:'KAIPRODIGY', sport:'Basketball', img:IMG.hoops, pos:'10% center',
    bio:"One of Boston City League's most dynamic scorers. 20+ PPG, 1,000+ career points in three seasons, founded KAIPRODIGY Giveback, raising $7K+ for the Greater Boston Food Bank." },
];

/* ---- team ---- */
const TEAM = [
  { name:'Phil Martin', role:'CEO / Founder', ini:'PM',
    bio:'The visionary behind Ruthless Syndicate. Leads brand direction, culture and high-level decisions: strong, steady and unshakable.' },
  { name:'Eric Reid', role:'COO / Co-Founder', ini:'ER',
    bio:'The operational force. Builds systems that scale and cultures that win. Standards over hype, results over noise.' },
  { name:'Ron Martin', role:'CFO / Co-Founder', ini:'RM',
    bio:'Ensures the machine runs efficiently: financial strategy, capital allocation and smart, sustainable growth.' },
  { name:'Kenny French', role:'Director of Talent & Brand', ini:'KF',
    bio:'The connector. Manages athlete relationships and sponsorships, protecting the culture while expanding the reach.' },
];

/* ---- render helpers ---- */
const el = (html) => { const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; };

function renderShop(filter='all'){
  const grid = document.getElementById('shopGrid');
  grid.innerHTML='';
  PRODUCTS.filter(p => filter==='all' || p.cats.includes(filter)).forEach(p=>{
    const card = el(`
      <article class="card" data-cat="${p.cats.join(' ')}">
        <div class="card__media">
          ${p.badge ? `<span class="card__badge">${p.badge}</span>`:''}
          <div class="media">
            <div class="media__img" style="background-image:url('${p.img}')"></div>
            ${p.imgHover ? `<div class="media__img media__img--hover" style="background-image:url('${p.imgHover}')"></div>` : ''}
          </div>
          <div class="card__quick"><button class="btn btn--primary btn--block add-btn">Add to Cart</button></div>
        </div>
        <div class="card__body">
          <p class="card__cat">${labelFor(p.cat)}</p>
          <h3 class="card__name">${p.name}</h3>
          <p class="card__price">${p.old?`<s>${p.old}</s>`:''}${p.price}</p>
        </div>
      </article>`);
    card.querySelector('.add-btn').addEventListener('click', (e)=>{ e.stopPropagation(); addToCart(p.name); });
    grid.appendChild(card);
  });
  observeReveals();
}

const labelFor = (c)=>({mens:"Men's",womens:"Women's",accessories:'Accessories',new:'New Release'}[c]||c);

function renderAthletes(){
  const grid = document.getElementById('athleteGrid');
  ATHLETES.forEach(a=>{
    grid.appendChild(el(`
      <article class="athlete reveal">
        <div class="media__img" style="background-image:url('${a.img}');background-position:${a.pos||'center'}"></div>
        <div class="athlete__info">
          <p class="athlete__sport">${a.sport}</p>
          <h3 class="athlete__name">${a.name}</h3>
          <p class="athlete__nick">${a.nick}</p>
          <p class="athlete__bio">${a.bio}</p>
        </div>
      </article>`));
  });
}

function renderTeam(){
  const grid = document.getElementById('teamGrid');
  TEAM.forEach(m=>{
    grid.appendChild(el(`
      <article class="member reveal">
        <div class="member__ini">${m.ini}</div>
        <h3 class="member__name">${m.name}</h3>
        <p class="member__role">${m.role}</p>
        <p class="member__bio">${m.bio}</p>
      </article>`));
  });
}

/* ---- cart ---- */
let cartCount = 0;
function addToCart(name){
  cartCount++;
  const c = document.getElementById('cartCount');
  c.textContent = cartCount;
  c.animate([{transform:'scale(1)'},{transform:'scale(1.5)'},{transform:'scale(1)'}],{duration:300,easing:'ease'});
  toast(`Added: ${name}`);
}

/* ---- toast ---- */
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('is-show'), 2600);
}

/* ---- filters ---- */
function initFilters(){
  document.getElementById('filters').addEventListener('click', e=>{
    const chip = e.target.closest('.chip');
    if(!chip) return;
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('is-active'));
    chip.classList.add('is-active');
    renderShop(chip.dataset.filter);
  });
}

/* ---- nav ---- */
function initNav(){
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const onScroll = ()=> nav.classList.toggle('is-stuck', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  toggle.addEventListener('click', ()=>{
    const open = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
  });
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
    links.classList.remove('is-open'); toggle.classList.remove('is-open');
  }));
  document.getElementById('cartBtn').addEventListener('click', ()=> toast(cartCount ? `${cartCount} item(s) in your bag` : 'Your bag is empty'));
}

/* ---- signup ---- */
function initSignup(){
  const form = document.getElementById('signupForm');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    document.getElementById('signupNote').textContent = "You're in. Welcome to the Syndicate.";
    form.reset();
  });
}

/* ---- reveal on scroll ---- */
let io;
function observeReveals(){
  if(!io){
    io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  }
  document.querySelectorAll('.reveal:not(.is-in)').forEach(r=>io.observe(r));
}

/* ---- intro ---- */
function initIntro(){
  const body = document.body;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    body.classList.add('is-text-in','is-revealed');
    return;
  }
  body.classList.add('is-loading');
  requestAnimationFrame(()=> requestAnimationFrame(()=> body.classList.add('is-text-in')));
  setTimeout(()=>{
    body.classList.add('is-revealed');
    body.classList.remove('is-loading');
  }, 1500);
}

/* ---- init ---- */
document.addEventListener('DOMContentLoaded', ()=>{
  renderShop();
  renderAthletes();
  renderTeam();
  initFilters();
  initNav();
  initSignup();
  observeReveals();
  initIntro();
});

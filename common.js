/* ===================================================================
   RUTHLESS SYNDICATE: shared catalog, card markup, cart, nav
   Loaded by both index.html and shop.html.
   =================================================================== */

const el = (html) => { const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; };

/* ---- products (names, prices and photos mirror ruthlesssyndicate.com) ---- */
const shopImg = (slug) => ({ img:`assets/shop-${slug}-front.jpg`, imgHover:`assets/shop-${slug}-back.jpg` });

const PRODUCTS = [
  { name:'Black Tommy Gunz McMillen Unisex T-Shirt Drop II', cat:'mens', cats:['mens','new'], price:46, old:null, badge:'New', best:true, ...shopImg('tommy-drop2') },
  { name:'Steven "Ninja" Nguyen Black Oversized Crop Tee', cat:'mens', cats:['mens','new'], price:46, old:null, badge:'Limited', best:true, ...shopImg('ninja-crop') },
  { name:'Black Ruthless Syndicate "Loyalty" Tee', cat:'mens', cats:['mens'], price:30, old:null, badge:null, best:true, ...shopImg('loyalty-tee-black') },
  { name:'Black Ruthless Syndicate "Loyalty" Hoodie', cat:'mens', cats:['mens'], price:60, old:null, badge:null, ...shopImg('loyalty-hoodie-black') },
  { name:'White Ruthless Syndicate "Loyalty" Hoodie', cat:'mens', cats:['mens'], price:60, old:null, badge:null, ...shopImg('loyalty-hoodie-white') },
  { name:'Pink Ruthless Syndicate "Loyalty" Hoodie', cat:'mens', cats:['mens'], price:60, old:null, badge:null, ...shopImg('loyalty-hoodie-pink') },
  { name:'Heather Gray Ruthless Syndicate "Loyalty" Tee', cat:'mens', cats:['mens'], price:30, old:null, badge:null, ...shopImg('loyalty-tee-gray') },
  { name:'Pink Ruthless Syndicate "Loyalty" T-Shirt', cat:'mens', cats:['mens'], price:30, old:null, badge:null, ...shopImg('loyalty-tee-pink') },
  { name:'Black Ruthless Syndicate Tee (OG Logo)', cat:'mens', cats:['mens'], price:30, old:null, badge:null, ...shopImg('og-tee-black') },
  { name:'Red Ruthless Syndicate Tee (OG Logo)', cat:'mens', cats:['mens'], price:30, old:null, badge:null, ...shopImg('og-tee-red') },
  { name:'Blue Ruthless Syndicate Tee (OG Logo)', cat:'mens', cats:['mens'], price:30, old:null, badge:null, soldOut:true, ...shopImg('og-tee-blue') },
  { name:'Black Ruthless Syndicate "Loyalty" Snapback Hat', cat:'accessories', cats:['accessories'], price:30, old:null, badge:null, soldOut:true, ...shopImg('loyalty-hat-black') },
  { name:'Gray/Black Ruthless Syndicate "Loyalty" Snapback Hat', cat:'accessories', cats:['accessories'], price:30, old:null, badge:null, soldOut:true, ...shopImg('loyalty-hat-gray') },
];

const labelFor = (c)=>({mens:"Men's",womens:"Women's",accessories:'Accessories',new:'New Release'}[c]||c);
const money = (n)=>`$${n}`;

/* ---- product card (shared by the home best-sellers strip and the shop grid) ---- */
function productCard(p, extraClass=''){
  const card = el(`
    <article class="card${p.soldOut?' card--sold':''}${extraClass?' '+extraClass:''}" data-cat="${p.cats.join(' ')}">
      <div class="card__media">
        ${p.soldOut ? `<span class="card__badge card__badge--sold">Sold Out</span>`
                    : p.badge ? `<span class="card__badge">${p.badge}</span>`:''}
        <div class="media">
          <div class="media__img" style="background-image:url('${p.img}')"></div>
          ${p.imgHover ? `<div class="media__img media__img--hover" style="background-image:url('${p.imgHover}')"></div>` : ''}
        </div>
        <div class="card__quick"><button class="btn btn--primary btn--block add-btn"${p.soldOut?' disabled':''}>${p.soldOut?'Sold Out':'Add to Cart'}</button></div>
      </div>
      <div class="card__body">
        <p class="card__cat">${labelFor(p.cat)}</p>
        <h3 class="card__name">${p.name}</h3>
        <p class="card__price">${p.old?`<s>${money(p.old)}</s>`:''}${money(p.price)}</p>
      </div>
    </article>`);
  if(!p.soldOut) card.querySelector('.add-btn').addEventListener('click', (e)=>{ e.stopPropagation(); addToCart(p.name); });
  return card;
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

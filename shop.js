/* ===================================================================
   RUTHLESS SYNDICATE: all-products page
   Search, category filters, sorting and a front/back quick-view.
   =================================================================== */

const state = { q:'', cat:'all', sort:'featured' };

const SORTS = {
  featured: (a,b)=> (b.best?1:0)-(a.best?1:0) || (a.soldOut?1:0)-(b.soldOut?1:0),
  priceUp:  (a,b)=> a.price-b.price,
  priceDown:(a,b)=> b.price-a.price,
  nameAz:   (a,b)=> a.name.localeCompare(b.name),
};

function visibleProducts(){
  const q = state.q.trim().toLowerCase();
  return PRODUCTS
    .filter(p => state.cat==='all' || p.cats.includes(state.cat))
    .filter(p => !q || p.name.toLowerCase().includes(q))
    .slice()
    .sort(SORTS[state.sort]);
}

function renderShop(){
  const grid  = document.getElementById('shopGrid');
  const empty = document.getElementById('shopEmpty');
  const list  = visibleProducts();

  grid.innerHTML = '';
  list.forEach((p,i)=>{
    const card = productCard(p, 'reveal');
    card.style.setProperty('--stagger', `${Math.min(i,11)*45}ms`);
    // clicking the artwork (not the Add button) opens the quick-view
    card.querySelector('.card__media').addEventListener('click', e=>{
      if(e.target.closest('.add-btn')) return;
      openQuickView(p);
    });
    grid.appendChild(card);
  });

  empty.hidden = list.length > 0;
  const count = document.getElementById('shopCount');
  count.textContent = `${list.length} ${list.length===1?'piece':'pieces'}`;
  observeReveals();
}

/* ---- quick view ---- */
let lastFocus = null;
function openQuickView(p){
  const m = document.getElementById('quickView');
  lastFocus = document.activeElement;
  m.querySelector('.qv__name').textContent  = p.name;
  m.querySelector('.qv__cat').textContent   = labelFor(p.cat);
  m.querySelector('.qv__price').textContent = money(p.price);
  m.querySelector('.qv__stock').textContent = p.soldOut ? 'Sold out' : 'In stock';
  m.querySelector('.qv__stock').classList.toggle('is-out', !!p.soldOut);

  const shot = m.querySelector('.qv__shot');
  const setSide = (side)=>{
    shot.style.backgroundImage = `url('${side==='back' ? p.imgHover : p.img}')`;
    m.querySelectorAll('.qv__side').forEach(b=> b.classList.toggle('is-active', b.dataset.side===side));
  };
  m.querySelectorAll('.qv__side').forEach(b=> b.onclick = ()=> setSide(b.dataset.side));
  setSide('front');

  const add = m.querySelector('.qv__add');
  add.disabled    = !!p.soldOut;
  add.textContent = p.soldOut ? 'Sold Out' : 'Add to Cart';
  add.onclick     = ()=>{ if(!p.soldOut) addToCart(p.name); };

  m.hidden = false;
  requestAnimationFrame(()=> m.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
  m.querySelector('.qv__close').focus();
}

function closeQuickView(){
  const m = document.getElementById('quickView');
  m.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(()=>{ m.hidden = true; }, 260);
  lastFocus?.focus();
}

/* ---- controls ---- */
function initControls(){
  document.getElementById('filters').addEventListener('click', e=>{
    const chip = e.target.closest('.chip');
    if(!chip) return;
    document.querySelectorAll('#filters .chip').forEach(c=>c.classList.remove('is-active'));
    chip.classList.add('is-active');
    state.cat = chip.dataset.filter;
    renderShop();
  });

  const search = document.getElementById('shopSearch');
  search.addEventListener('input', ()=>{ state.q = search.value; renderShop(); });

  const sort = document.getElementById('shopSort');
  sort.addEventListener('change', ()=>{ state.sort = sort.value; renderShop(); });

  document.getElementById('shopReset').addEventListener('click', ()=>{
    state.q=''; state.cat='all'; state.sort='featured';
    search.value=''; sort.value='featured';
    document.querySelectorAll('#filters .chip').forEach(c=>c.classList.toggle('is-active', c.dataset.filter==='all'));
    renderShop();
  });

  const m = document.getElementById('quickView');
  m.querySelector('.qv__close').addEventListener('click', closeQuickView);
  m.addEventListener('click', e=>{ if(e.target===m) closeQuickView(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && !m.hidden) closeQuickView(); });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderShop();
  initControls();
  initNav();
  observeReveals();
});

/* ===================================================================
   RUTHLESS SYNDICATE: interactions & content
   =================================================================== */

/* ---- athlete image pool ---- */
const IMG = {
  fighter:'assets/tommy-mcmillen.jpg',
  athlete:'assets/steven-nguyen.png',
  boxer:  'assets/shane-jordan.png',
  bjj:    'assets/charles-rosa.jpg',
  hoops:  'assets/kai-lau-quan.jpg',
  train:  'assets/mike-fontanez.jpg',
};

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
  { name:'Phil Martin', role:'CEO / Founder', ini:'PM', img:'assets/team-phil-martin.jpg',
    bio:'The visionary behind Ruthless Syndicate. Leads brand direction, culture and high-level decisions: strong, steady and unshakable.' },
  { name:'Eric Reid', role:'COO / Co-Founder', ini:'ER', img:'assets/team-eric-reid.jpg',
    bio:'The operational force. Builds systems that scale and cultures that win. Standards over hype, results over noise.' },
  { name:'Ron Martin', role:'CFO / Co-Founder', ini:'RM', img:'assets/team-ron-martin.jpg',
    bio:'Ensures the machine runs efficiently: financial strategy, capital allocation and smart, sustainable growth.' },
  { name:'Kenny French', role:'Director of Talent & Brand', ini:'KF', img:'assets/team-kenny-french.jpg',
    bio:'The connector. Manages athlete relationships and sponsorships, protecting the culture while expanding the reach.' },
];

function renderBestSellers(){
  const grid = document.getElementById('bestGrid');
  PRODUCTS.filter(p=>p.best).forEach(p=> grid.appendChild(productCard(p,'reveal')));
}

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
        ${m.img ? `<img class="member__photo" src="${m.img}" alt="${m.name}" loading="lazy" />`
                : `<div class="member__ini">${m.ini}</div>`}
        <h3 class="member__name">${m.name}</h3>
        <p class="member__role">${m.role}</p>
        <p class="member__bio">${m.bio}</p>
      </article>`));
  });
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
  renderBestSellers();
  renderAthletes();
  renderTeam();
  initNav();
  initSignup();
  observeReveals();
  initIntro();
});

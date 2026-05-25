/* ── Scene Data ─────────────────────────────────────────── */
const SCENES = [
  {
    category: "Tokyo",
    icon: "🌸",
    items: [
      {
        name: "Cherry Blossom Drive",
        loc: "Tokyo at Night",
        vid: "ymO9UQwntyo",
        desc: "8K drive through Tokyo's cherry blossom streets at night — pure city sounds, no music",
      },
      {
        name: "Rainy Shibuya",
        loc: "Shibuya, Tokyo",
        vid: "sAkVnhthpMI",
        desc: "2-hour rainy night walk through Shibuya — rain sounds only, cinematic 8K",
      },
      {
        name: "Shibuya Neon Night",
        loc: "Shibuya, Tokyo",
        vid: "SlHl7swKcKA",
        desc: "Night drive through neon-lit Shibuya and Harajuku — ambient sounds only, 8K HDR",
      },
      {
        name: "Shinjuku Night",
        loc: "Shinjuku, Tokyo",
        vid: "4UVN3DH7TSA",
        desc: "Relaxing night drive through Shinjuku and Kabukicho — ambient city sounds, 8K",
      },
      {
        name: "Spring Sakura Drive",
        loc: "Tokyo",
        vid: "8dMe11ruUuc",
        desc: "Daytime drive under cherry blossoms along Chitose Street — ambient only, 8K HDR",
      },
      {
        name: "Golden Morning",
        loc: "Tokyo",
        vid: "iF3thiZR0fQ",
        desc: "Golden sunlight pouring through a window on a quiet Tokyo street corner at 7AM",
      },
      {
        name: "Rainy Shinjuku",
        loc: "Shinjuku, Tokyo",
        vid: "SS-Qqpkd3ow",
        desc: "A rainy day in Shinjuku looking down at the busy streets from a warm window",
      },
      {
        name: "Tokyo Sunset",
        loc: "Tokyo",
        vid: "lo8WTG9Kie0",
        desc: "Tokyo skyline at golden hour — city sounds and ambient atmosphere, no music",
      },
    ],
  },
  {
    category: "Cities",
    icon: "🌆",
    items: [
      {
        name: "NYC Skyline",
        loc: "New York, USA",
        vid: "kkOjIynE9ro",
        desc: "NYC skyline with drifting clouds from a high-rise window — lofi and calm",
      },
      {
        name: "Manhattan Coffee",
        loc: "New York, USA",
        vid: "lfvPKYkWHHU",
        desc: "Cozy New York coffee shop with Lower Manhattan view and distant thunder",
      },
      {
        name: "Beijing Sunrise",
        loc: "Beijing, China",
        vid: "GSep96CLsgo",
        desc: "Watching the sunrise over Beijing's rooftops — calm and cinematic",
      },
      {
        name: "London Tower Bridge",
        loc: "London, UK",
        vid: "4Twepz0bAWs",
        desc: "Tower Bridge in autumn — golden leaves and the Thames in a 2-hour session",
      },
      {
        name: "London Big Ben",
        loc: "London, UK",
        vid: "p3ynjjRbU9A",
        desc: "Big Ben at sunset over the Thames — one of the most iconic study views",
      },
      {
        name: "Paris Café",
        loc: "Paris, France",
        vid: "29AkeFFqynY",
        desc: "A charming Parisian café with a stunning view of the Eiffel Tower on a sunny day",
      },
      {
        name: "Rainy Paris",
        loc: "Paris, France",
        vid: "mLL6OBKQwPU",
        desc: "Cozy Parisian study room overlooking the Eiffel Tower on a rainy evening",
      },
      {
        name: "NYC Morning",
        loc: "New York, USA",
        vid: "PxIbwamsruc",
        desc: "Morning rush hour in New York from a café window — real footage, 3 hours",
      },
    ],
  },
  {
    category: "Nature",
    icon: "🌿",
    items: [
      {
        name: "Mount Fuji",
        loc: "Japan",
        vid: "Ectl_ZnUWoI",
        desc: "Iconic volcano, sakura landscapes and serene mountain lakes in stunning 4K",
      },
      {
        name: "Fuji & Sakura Lake",
        loc: "Japan",
        vid: "8nAc2hS-7Ek",
        desc: "Cherry blossoms reflected in a mirror-still lake beneath Mount Fuji — 10 hours",
      },
      {
        name: "Tropical Beach",
        loc: "Caribbean Sea",
        vid: "E-lbpHIkaTo",
        desc: "3 hours of peaceful ocean waves on a pristine Caribbean beach in 4K",
      },
      {
        name: "Autumn Forest Stream",
        loc: "Autumn Forest",
        vid: "zpBG7COX5SU",
        desc: "A serene autumn forest stream in 4K — colorful foliage and flowing water sounds",
      },
    ],
  },
  {
    category: "Cozy",
    icon: "🔥",
    items: [
      {
        name: "Forest Cabin Rain",
        loc: "Forest Cabin",
        vid: "4whW5r3Q8js",
        desc: "12 hours in a cozy wooden cabin with crackling fireplace and gentle rainfall",
      },
      {
        name: "Dark Cabin",
        loc: "Deep Forest",
        vid: "o-sm5iD-Bbo",
        desc: "Cozy cabin deep in the forest — steady rain, soft thunder, crackling fire",
      },
      {
        name: "Rainy Coffee Shop",
        loc: "Cozy Café",
        vid: "0L38Z9hIi5s",
        desc: "A rainy day in a 4K cozy coffee shop — soft background music for focus",
      },
      {
        name: "NYC Winter Window",
        loc: "New York, USA",
        vid: "F6EbcP2NDEo",
        desc: "Snowy New York morning — soft wind and city sounds from a warm window",
      },
    ],
  },
];

/* ── Sound Sources ────────────────────────────────────── */
const SOUNDS = {
  ambient: "https://www.youtube.com/embed/-VgN7nKx9MU?autoplay=1&loop=1&playlist=-VgN7nKx9MU",
  lofi:    "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&loop=1&playlist=jfKfPfyJRdk",
};

/* ── State ────────────────────────────────────────────── */
let state = { curScene: null, sound: 'none', focusMode: false };

let pomo = {
  running: false,
  phase: 'focus',
  secsLeft: 25 * 60,
  cycle: 0,
  interval: null,
  cfg: { focus: 25, short: 5, long: 15, cycles: 4 },
};

/* ── Build Scene Grid ─────────────────────────────────── */
function buildGrid() {
  const grid = document.getElementById('lib-grid');
  grid.innerHTML = '';
  SCENES.forEach((cat) => {
    const catLabel = document.createElement('div');
    catLabel.className = 'cat-label';
    catLabel.innerHTML = `<span class="cat-icon">${cat.icon}</span>${cat.category}`;
    grid.appendChild(catLabel);
    const catGrid = document.createElement('div');
    catGrid.className = 'cat-grid';
    cat.items.forEach((scene) => {
      const card = document.createElement('div');
      card.className = 'lib-card';
      card.id = 'sc-' + scene.vid;
      card.innerHTML = `<div class="lib-card-name">${scene.name}</div><div class="lib-card-loc">${scene.loc}</div>`;
      card.addEventListener('click', () => selectScene(scene));
      catGrid.appendChild(card);
    });
    grid.appendChild(catGrid);
  });
}

/* ── Select Scene ─────────────────────────────────────── */
function selectScene(scene) {
  document.querySelectorAll('.lib-card').forEach(c => c.classList.remove('sel'));
  const card = document.getElementById('sc-' + scene.vid);
  if (card) card.classList.add('sel');
  state.curScene = scene;
  document.getElementById('lib-title').textContent = scene.name;
  document.getElementById('lib-desc').textContent  = scene.desc;
  document.getElementById('badge-name').textContent = scene.name;
  document.getElementById('badge-loc').textContent  = scene.loc;
  const src = `https://www.youtube.com/embed/${scene.vid}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${scene.vid}`;
  document.getElementById('yt-player').src = src;
}

/* ── Sound ────────────────────────────────────────────── */
function setSound(type) {
  state.sound = type;
  ['ambient', 'lofi', 'none'].forEach(s =>
    document.getElementById('sp-' + s).classList.toggle('on', s === type)
  );
  const af = document.getElementById('audio-frame');
  af.src = type === 'none' ? '' : SOUNDS[type];
}

/* ── Enter App ────────────────────────────────────────── */
function enterApp() {
  document.getElementById('landing').classList.add('out');
  const main = document.getElementById('main');
  main.classList.remove('hidden');
  setTimeout(() => main.classList.add('visible'), 50);
  selectScene(SCENES[0].items[0]);
}

/* ── Focus Mode ───────────────────────────────────────── */
function enterFocus() {
  state.focusMode = true;
  document.getElementById('focus-overlay').classList.add('on');
}
function exitFocus() {
  state.focusMode = false;
  document.getElementById('focus-overlay').classList.remove('on');
}

/* ── Clock ────────────────────────────────────────────── */
function tickClock() {
  const now   = new Date();
  const full  = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const short = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('hud-clock').textContent = short;
  document.getElementById('fo-clock').textContent  = full;
}

/* ── Pomodoro ─────────────────────────────────────────── */
function fmt(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function updatePomoUI() {
  const t = fmt(pomo.secsLeft);
  document.getElementById('pomo-time').textContent     = t;
  document.getElementById('hud-pomo-time').textContent = t;
  document.getElementById('fo-pomo').textContent       = t;
  const labels = { focus: 'Focus', short: 'Short break', long: 'Long break' };
  const label  = labels[pomo.phase];
  const stateLabel = pomo.running ? label
    : (pomo.secsLeft === pomo.cfg.focus * 60 && pomo.phase === 'focus' ? 'Ready to focus' : 'Paused');
  document.getElementById('pomo-phase-label').textContent = stateLabel;
  document.getElementById('hud-pomo-phase').textContent   = label;
  document.getElementById('fo-phase').textContent         = label;
  for (let i = 0; i < 4; i++) {
    const done = i < pomo.cycle && i < pomo.cfg.cycles;
    const pip  = document.getElementById('pip' + i);
    const hdot = document.getElementById('hd'  + i);
    if (pip)  pip.className  = 'pip'  + (done ? ' done' : '');
    if (hdot) hdot.className = 'hdot' + (done ? ' done' : '');
  }
}

function togglePomo() {
  if (pomo.running) {
    clearInterval(pomo.interval);
    pomo.running = false;
    document.getElementById('play-label').textContent = 'Resume';
    document.getElementById('play-icon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  } else {
    pomo.running = true;
    document.getElementById('play-label').textContent = 'Pause';
    document.getElementById('play-icon').innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    pomo.interval = setInterval(() => {
      pomo.secsLeft--;
      if (pomo.secsLeft <= 0) nextPomoPhase();
      updatePomoUI();
    }, 1000);
  }
  updatePomoUI();
}

function nextPomoPhase() {
  clearInterval(pomo.interval);
  pomo.running = false;
  playChime();
  if (pomo.phase === 'focus') {
    pomo.cycle++;
    if (pomo.cycle >= pomo.cfg.cycles) {
      pomo.phase    = 'long';
      pomo.secsLeft = pomo.cfg.long * 60;
    } else {
      pomo.phase    = 'short';
      pomo.secsLeft = pomo.cfg.short * 60;
    }
  } else {
    if (pomo.phase === 'long') pomo.cycle = 0;
    pomo.phase    = 'focus';
    pomo.secsLeft = pomo.cfg.focus * 60;
  }
  document.getElementById('play-label').textContent = 'Start';
  document.getElementById('play-icon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  updatePomoUI();
}

function resetPomo() {
  clearInterval(pomo.interval);
  pomo.running  = false;
  pomo.phase    = 'focus';
  pomo.secsLeft = pomo.cfg.focus * 60;
  pomo.cycle    = 0;
  document.getElementById('play-label').textContent = 'Start';
  document.getElementById('play-icon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  updatePomoUI();
}

function skipPomo() { nextPomoPhase(); }

function updateCfg() {
  pomo.cfg.focus  = Math.max(1, parseInt(document.getElementById('cfg-focus').value)  || 25);
  pomo.cfg.short  = Math.max(1, parseInt(document.getElementById('cfg-short').value)  || 5);
  pomo.cfg.long   = Math.max(1, parseInt(document.getElementById('cfg-long').value)   || 15);
  pomo.cfg.cycles = Math.max(2, parseInt(document.getElementById('cfg-cycles').value) || 4);
  if (!pomo.running) resetPomo();
  updatePomoUI();
}

/* ── Chime ────────────────────────────────────────────── */
function playChime() {
  try {
    const ctx   = new (window.AudioContext || window.webkitAudioContext)();
    const freqs = [523, 659, 784];
    freqs.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.18;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.05);
      gain.gain.linearRampToValueAtTime(0, t + 0.5);
      osc.start(t);
      osc.stop(t + 0.55);
    });
  } catch (e) {}
}

/* ── Keyboard Shortcuts ───────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
    e.preventDefault();
    togglePomo();
  }
  if (e.code === 'KeyF') state.focusMode ? exitFocus() : enterFocus();
  if (e.code === 'Escape') exitFocus();
});

/* ── Init ─────────────────────────────────────────────── */
buildGrid();
updatePomoUI();
tickClock();
setInterval(tickClock, 1000);

// Utility for DOM
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Views definition
const views = {
    home: `
    <h1>Camino PAO</h1>
    <p style="text-align:center; padding: 0 20px;">Aprende el sistema PAO con tu casillero y la estrategia del Palacio de Memoria.</p>
    <div class="path-container" id="levels-path">
      <!-- Generated dynamically -->
    </div>
  `,
    learn: `
    <h1>Lista PAO</h1>
    <div class="filter-bar">
      <button class="filter-btn active" data-suit="all">Todas</button>
      <button class="filter-btn" data-suit="spades">♠ Picas (P)</button>
      <button class="filter-btn" data-suit="hearts">♥ Corazones (C)</button>
      <button class="filter-btn" data-suit="clubs">♣ Tréboles (T)</button>
      <button class="filter-btn" data-suit="diamonds">♦ Rombos (R)</button>
    </div>
    <div class="pao-grid" id="pao-list-container">
      <!-- Generated dynamically -->
    </div>
  `,
    palace: `
    <h1>Mi Palacio Mental</h1>
    <p style="text-align:center; padding: 0 20px;">Sube fotos de tu casa, habitación o ruta para construir tu propio Palacio de la Memoria. Necesitas 18 lugares (Loci) para memorizar las 52 cartas.</p>
    <div class="palace-grid" id="palace-grid-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
      <!-- Generated dynamically -->
    </div>
  `,
    review: `
    <h1>Repaso Inteligente</h1>
    <div style="background: var(--surface-color); padding: 25px; border-radius: 16px; text-align: center; border: 2px solid #e5e5e5; box-shadow: 0 4px 0 #e5e5e5; margin-bottom: 20px;">
      <h2 style="color: var(--accent-color); margin-bottom: 10px;">Repetición Espaciada</h2>
      <p>El sistema analiza tus fallos y aciertos anteriores para programar repasos automáticos justo antes de que los olvides (SRS).</p>
      
      <div style="margin: 30px 0;">
        <span style="font-size: 3.5rem; font-weight: 800; color: var(--text-primary);" id="review-count">0</span>
        <div style="font-size: 0.95rem; color: var(--text-secondary); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-top:5px;">Cartas listas para repasar</div>
      </div>
      
      <button class="btn" id="start-review-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
        Comenzar Repaso
      </button>
    </div>
  `,
    speed: `
    <h1>Modo Velocidad</h1>
    <div id="speed-intro" style="background: var(--surface-color); padding: 20px; border-radius: 12px; text-align: center; border: 1px solid var(--surface-hover);">
      <h2>Memoriza la Baraja</h2>
      <p>Aplica tu Palacio de la Memoria. Agrupa las cartas de 3 en 3.<br><br><b>Carta 1:</b> Persona<br><b>Carta 2:</b> Acción<br><b>Carta 3:</b> Objeto</p>
      
      <div style="font-size: 3rem; font-weight: 800; color: var(--primary-color); margin: 20px 0;" id="timer-display">00:00</div>
      
      <p id="best-time-display">Mejor Tiempo: --:--</p>
      
      <button class="btn" id="start-speed-btn" style="margin-top: 10px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Iniciar Memorización
      </button>
    </div>

    <div id="speed-active" style="display: none; flex-direction: column; align-items: center; justify-content: center; padding-top: 20px;">
      <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent-color); margin-bottom: 20px;" id="active-timer">00:00</div>
      
      <div style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 30px;" id="speed-progress-text">Cartas: 0 / 52</div>

      <div id="speed-cards" style="display: flex; gap: 10px; margin-bottom: 30px; justify-content: center; min-height: 120px;">
        <!-- Cards injected dynamically -->
      </div>
      
      <button class="btn" id="next-speed-btn" style="margin-bottom: 15px;">Siguiente Locus (3 Cartas)</button>
      <button class="btn btn-secondary" id="stop-speed-btn">Rendirse</button>
    </div>
  `
};

// Render views logic
function renderView(viewId) {
    const container = $('#view-container');
    container.innerHTML = `<div class="view active">${views[viewId]}</div>`;

    // Post-render setup
    if (viewId === 'home') setupHome();
    if (viewId === 'learn') setupLearn();
    if (viewId === 'palace') setupPalace();
    if (viewId === 'review') setupReview();
    if (viewId === 'speed') setupSpeed();

    $$('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === viewId);
    });
}

// Global setup
document.addEventListener('DOMContentLoaded', () => {
    renderView('home');

    // Navigation
    $$('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target;
            renderView(target);
            window.scrollTo(0, 0);
        });
    });
});

// ------------------------------------------------------------------
// HOME VIEW (PATH)
// ------------------------------------------------------------------
const levelsData = [
    { id: 1, title: 'Casillero Fonético', desc: 'Repaso: Números a Letras' },
    { id: 2, title: 'Personajes: Picas', desc: 'Identifica a los 13 personajes de Picas' },
    { id: 3, title: 'Personajes: Corazones', desc: 'Identifica a los 13 personajes de Corazones' },
    { id: 4, title: 'Personajes: Tréboles', desc: 'Identifica a los 13 personajes de Tréboles' },
    { id: 5, title: 'Personajes: Rombos', desc: 'Identifica a los 13 personajes de Rombos' },
    { id: 6, title: 'Dominio de Acciones', desc: 'Recuerda las acciones de cualquier carta' },
    { id: 7, title: 'Dominio de Objetos', desc: 'Recuerda los objetos icónicos' },
    { id: 8, title: 'El Palacio (P-A-O)', desc: 'Asocia 3 cartas en tu Palacio Mental' }
];

function setupHome() {
    const pathContainer = $('#levels-path');

    levelsData.forEach((level, idx) => {
        const isUnlocked = level.id <= userProgress.unlockedLevels;
        const isCurrent = level.id === userProgress.unlockedLevels;

        const node = document.createElement('div');
        node.className = `level-node ${isUnlocked ? 'unlocked' : ''}`;
        node.innerHTML = `
      ${isCurrent ? '★' : (isUnlocked ? '✓' : '🔒')}
      <div class="level-node-label">${level.title}</div>
    `;

        if (isUnlocked) {
            node.addEventListener('click', () => startLesson(level.id));
        }

        pathContainer.appendChild(node);
    });
}

// ------------------------------------------------------------------
// LEARN VIEW (PAO LIST)
// ------------------------------------------------------------------
const editPaoModalHtml = `
  <div id="edit-pao-modal" style="position: fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(13,17,23,0.9); z-index:3000; display:none; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(5px);">
    <div style="background:var(--surface-color); padding:25px; border-radius:12px; border:1px solid var(--surface-hover); width:100%; max-width:400px;">
      <h3 style="margin-bottom:20px; color:var(--primary-color);">Editar PAO - <span id="edit-card-id"></span></h3>
      
      <label style="display:block; margin-bottom:5px; color:var(--text-secondary); font-size:0.9rem;">Personaje</label>
      <input type="text" id="edit-p" style="width:100%; padding:10px; margin-bottom:15px; border-radius:8px; border:1px solid var(--surface-hover); background:var(--bg-color); color:#fff; font-family:inherit;">
      
      <label style="display:block; margin-bottom:5px; color:var(--text-secondary); font-size:0.9rem;">Acción</label>
      <input type="text" id="edit-a" style="width:100%; padding:10px; margin-bottom:15px; border-radius:8px; border:1px solid var(--surface-hover); background:var(--bg-color); color:#fff; font-family:inherit;">
      
      <label style="display:block; margin-bottom:5px; color:var(--text-secondary); font-size:0.9rem;">Objeto</label>
      <input type="text" id="edit-o" style="width:100%; padding:10px; margin-bottom:25px; border-radius:8px; border:1px solid var(--surface-hover); background:var(--bg-color); color:#fff; font-family:inherit;">
      
      <div style="display:flex; gap:10px;">
        <button class="btn" id="save-edit-btn" style="flex:1;">Guardar</button>
        <button class="btn btn-secondary" id="cancel-edit-btn" style="flex:1;">Cancelar</button>
      </div>
    </div>
  </div>
`;

if (!document.getElementById('edit-pao-modal')) {
    document.body.insertAdjacentHTML('beforeend', editPaoModalHtml);
}

function setupLearn() {
    const container = $('#pao-list-container');
    let currentEditCard = null;

    const renderList = (filterSuit) => {
        container.innerHTML = '';
        const filtered = filterSuit === 'all' ? paoList : paoList.filter(p => p.s === filterSuit);

        filtered.forEach(item => {
            const el = document.createElement('div');
            el.className = 'pao-card';
            el.innerHTML = `
        <div class="pao-card-img ${item.s}">${item.card}</div>
        <div class="pao-info">
          <div class="pao-number" style="display:flex; justify-content:space-between; align-items:center;">
             <span>${item.code} - (${item.card})</span>
             <button class="edit-btn" data-card="${item.card}" style="background:none; border:none; color:var(--text-secondary); cursor:pointer;">✏️</button>
          </div>
          <div class="pao-words">
            <span class="p">${item.p}</span>
            <span class="a">${item.a}</span>
            <span class="o">${item.o}</span>
          </div>
        </div>
      `;
            container.appendChild(el);
        });

        $$('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cardId = e.currentTarget.dataset.card;
                currentEditCard = paoList.find(p => p.card === cardId);
                $('#edit-card-id').innerText = cardId;
                $('#edit-p').value = currentEditCard.p;
                $('#edit-a').value = currentEditCard.a;
                $('#edit-o').value = currentEditCard.o;
                $('#edit-pao-modal').style.display = 'flex';
            });
        });
    };

    $('#cancel-edit-btn').onclick = () => {
        $('#edit-pao-modal').style.display = 'none';
    };

    $('#save-edit-btn').onclick = () => {
        if (currentEditCard) {
            currentEditCard.p = $('#edit-p').value;
            currentEditCard.a = $('#edit-a').value;
            currentEditCard.o = $('#edit-o').value;
            savePaoList(); // From data.js
            renderList($('.filter-btn.active').dataset.suit);
        }
        $('#edit-pao-modal').style.display = 'none';
    };

    renderList('all');

    $$('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            $$('.filter-btn').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');
            renderList(target.dataset.suit);
        });
    });
}

// ------------------------------------------------------------------
// PALACE VIEW
// ------------------------------------------------------------------
function setupPalace() {
    const container = $('#palace-grid-container');
    container.innerHTML = '';

    for (let i = 0; i < 18; i++) {
        const el = document.createElement('div');
        el.className = 'palace-locus';
        el.style = 'background: var(--surface-color); border: 1px dashed var(--surface-hover); border-radius: 12px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; cursor:pointer;';

        const hasImage = customPalace[i] && customPalace[i].length > 0;

        if (hasImage) {
            el.innerHTML = `
               <img src="${customPalace[i]}" style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0;">
               <div style="position:absolute; bottom:0; left:0; width:100%; background:rgba(0,0,0,0.7); color:#fff; text-align:center; padding:5px; font-size:0.8rem; font-weight:bold;">Locus ${i + 1}</div>
               <input type="file" accept="image/*" class="locus-upload" data-index="${i}" style="opacity:0; position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer;">
            `;
        } else {
            el.innerHTML = `
               <div style="font-size:2rem; color:var(--surface-hover); margin-bottom:10px;">+</div>
               <div style="color:var(--text-secondary); font-size:0.9rem;">Locus ${i + 1}</div>
               <input type="file" accept="image/*" class="locus-upload" data-index="${i}" style="opacity:0; position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer;">
            `;
        }
        container.appendChild(el);
    }

    $$('.locus-upload').forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                // Resize image using canvas to save localStorage space
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 400;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
                    const idx = e.target.dataset.index;
                    customPalace[idx] = compressedDataUrl;
                    savePalaceList(); // from data.js
                    setupPalace(); // re-render
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    });
}

// ------------------------------------------------------------------
// SPEED VIEW
// ------------------------------------------------------------------
let timerInterval;
let speedTime = 0;
let speedDeck = [];
let speedIndex = 0;

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function renderSpeedCards() {
    const container = $('#speed-cards');
    container.innerHTML = '';

    const cardsToShow = speedDeck.slice(speedIndex, speedIndex + 3);

    cardsToShow.forEach((cardData, idx) => {
        const isRed = cardData.s === 'hearts' || cardData.s === 'diamonds';
        const colorStyle = isRed ? 'color:#ff4b4b' : 'color:#c9d1d9';
        const role = idx === 0 ? 'P' : (idx === 1 ? 'A' : 'O');

        let hint = '';
        if (idx === 0) hint = `(${cardData.p})`;
        if (idx === 1) hint = `(${cardData.a})`;
        if (idx === 2) hint = `(${cardData.o})`;

        const el = document.createElement('div');
        el.style = `background: #fff; border-radius: 8px; width: 80px; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; box-shadow: 0 4px 10px rgba(0,0,0,0.5); ${colorStyle}; position: relative;`;
        el.innerHTML = `
      ${cardData.card}
      <div style="position: absolute; bottom: 5px; font-size: 0.8rem; color: #666;">${role}</div>
      <div style="position: absolute; bottom: -25px; font-size: 0.7rem; color: var(--text-secondary); width: 120px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${hint}</div>
    `;
        container.appendChild(el);
    });

    $('#speed-progress-text').innerText = `Cartas: ${Math.min(speedIndex + 3, 52)} / 52`;
}

function startTimer() {
    speedTime = 0;
    $('#active-timer').innerText = '00:00';
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        speedTime++;
        $('#active-timer').innerText = formatTime(speedTime);
    }, 1000);
}

function stopSpeedMode() {
    clearInterval(timerInterval);
    $('#speed-intro').style.display = 'block';
    $('#speed-active').style.display = 'none';
}

function setupSpeed() {
    if (userProgress.bestTime) {
        $('#best-time-display').innerText = `Mejor Tiempo: ${formatTime(userProgress.bestTime)}`;
    }

    $('#start-speed-btn').addEventListener('click', () => {
        $('#speed-intro').style.display = 'none';
        $('#speed-active').style.display = 'flex';

        speedDeck = shuffle([...paoList]);
        speedIndex = 0;

        renderSpeedCards();
        startTimer();
    });

    $('#next-speed-btn').addEventListener('click', () => {
        speedIndex += 3;
        if (speedIndex >= 52) {
            clearInterval(timerInterval);

            const isNewRecord = !userProgress.bestTime || speedTime < userProgress.bestTime;
            if (isNewRecord) {
                userProgress.bestTime = speedTime;
                saveProgress();
                $('#best-time-display').innerText = `Mejor Tiempo: ${formatTime(userProgress.bestTime)}`;
            }

            alert(`¡Baraja completada en ${formatTime(speedTime)}!\n${isNewRecord ? '¡Nuevo Récord!' : ''}`);
            stopSpeedMode();
        } else {
            renderSpeedCards();
        }
    });

    $('#stop-speed-btn').addEventListener('click', stopSpeedMode);
}

// ------------------------------------------------------------------
// LESSON ENGINE
// ------------------------------------------------------------------
// We dynamically append lesson UI to body
const lessonOverlayHtml = `
  <div id="lesson-intro" style="position: fixed; top:0; left:0; width:100vw; height:100vh; background:var(--bg-color); z-index:2001; display:none; flex-direction:column; padding:30px 20px; overflow-y:auto;">
      <h1 id="intro-title" style="margin-bottom:10px;">Nivel X</h1>
      <div id="intro-expert" style="background:var(--surface-color); padding:20px; border-radius:12px; border-left: 4px solid var(--accent-color); margin-bottom:30px;">
          <h3 style="color:var(--accent-color); font-size:1rem; margin-bottom:10px;">💡 Consejo de Expertos</h3>
          <p id="intro-text" style="color:var(--text-primary); font-size:1.05rem; line-height:1.6; margin:0;"></p>
      </div>
      <button class="btn" id="start-lesson-btn" style="margin-top:auto; padding:18px;">Comenzar Lección</button>
      <button class="btn btn-secondary" id="cancel-lesson-btn" style="margin-top:10px; padding:18px;">Volver</button>
  </div>

  <div id="lesson-overlay">
    <div class="lesson-header">
       <div class="progress-bar-bg">
        <div class="progress-bar-fill" id="lesson-progress"></div>
      </div>
      <button class="close-btn" id="close-lesson" style="margin-left: 15px; font-size: 1.5rem; color: #fff;">✕</button>
    </div>
    <div class="lesson-content">
      <div class="question-text" id="lesson-question">¿Cuál es el P-A-O de esta carta?</div>
      <div id="lesson-visual" style="font-size: 4rem; margin-bottom: 20px;">🃏</div>
      <div class="options-grid" id="lesson-options">
        <!-- Options go here -->
      </div>
    </div>
    <div class="lesson-footer">
      <button class="btn" id="lesson-continue">Continuar</button>
    </div>
  </div>
`;

if (!document.getElementById('lesson-overlay')) {
    document.body.insertAdjacentHTML('beforeend', lessonOverlayHtml);
}

let currentLessonQuestions = [];
let currentQuestionIndex = 0;

// Utility: Shuffle array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateLessonQuestions(levelId) {
    let questions = [];

    if (levelId === 1) {
        for (let i = 0; i < 5; i++) {
            const target = phoneticSystem[Math.floor(Math.random() * phoneticSystem.length)];
            const others = phoneticSystem.filter(p => p.num !== target.num).map(p => p.num);
            const options = shuffle([target.num, ...shuffle(others).slice(0, 3)]);
            questions.push({
                cardId: `num-${target.num}`,
                q: `¿Qué número corresponde a la consonante "${target.letters.toUpperCase()}"?`,
                visual: '🧩',
                options: options.map(String),
                correct: options.indexOf(target.num)
            });
        }
    } else if (levelId >= 2 && levelId <= 5) {
        let targetSuit = ['spades', 'hearts', 'clubs', 'diamonds'][levelId - 2];
        let pool = paoList.filter(p => p.s === targetSuit);
        const lessonCards = shuffle([...pool]).slice(0, 5);

        lessonCards.forEach(cardData => {
            const others = shuffle(pool.filter(p => p.card !== cardData.card)).slice(0, 3);
            const options = shuffle([cardData.p, ...others.map(o => o.p)]);
            const isRed = cardData.s === 'hearts' || cardData.s === 'diamonds';
            const colorStyle = isRed ? 'color:#ff4b4b' : 'color:#c9d1d9';

            questions.push({
                cardId: cardData.card,
                q: `¿Qué personaje corresponde a esta carta?`,
                visual: `<span style="${colorStyle}">${cardData.card}</span>`,
                options: options,
                correct: options.indexOf(cardData.p)
            });
        });
    } else if (levelId === 6) {
        // Acciones
        const lessonCards = shuffle([...paoList]).slice(0, 5);
        lessonCards.forEach(cardData => {
            const others = shuffle(paoList.filter(p => p.card !== cardData.card)).slice(0, 3);
            const options = shuffle([cardData.a, ...others.map(o => o.a)]);
            questions.push({
                cardId: cardData.card,
                q: `¿Qué ACCIÓN realiza ${cardData.p}?`,
                visual: '🎬',
                options: options,
                correct: options.indexOf(cardData.a)
            });
        });
    } else if (levelId === 7) {
        // Objetos
        const lessonCards = shuffle([...paoList]).slice(0, 5);
        lessonCards.forEach(cardData => {
            const others = shuffle(paoList.filter(p => p.card !== cardData.card)).slice(0, 3);
            const options = shuffle([cardData.o, ...others.map(o => o.o)]);
            questions.push({
                cardId: cardData.card,
                q: `¿Cuál es el OBJETO icónico de ${cardData.p}?`,
                visual: '📦',
                options: options,
                correct: options.indexOf(cardData.o)
            });
        });
    } else {
        // Palacio
        for (let i = 0; i < 3; i++) {
            const cards = shuffle([...paoList]).slice(0, 3);
            const p = cards[0], a = cards[1], o = cards[2];
            questions.push({
                q: `Imagina estar en un locus de tu Palacio Mental. Genera la historia para:`,
                visual: `<span style="font-size:1.8rem">${p.card} | ${a.card} | ${o.card}</span>`,
                options: shuffle([
                    `${p.p} | ${a.a} | ${o.o}`,
                    `${a.p} | ${p.a} | ${o.o}`,
                    `${p.p} | ${o.a} | ${a.o}`,
                    `${o.p} | ${a.a} | ${p.o}`
                ]),
                correct: -1 // Will be set dynamically since we shuffled options
            });
            questions[i].correct = questions[i].options.indexOf(`${p.p} | ${a.a} | ${o.o}`);
        }
    }

    return questions;
}

const expertTips = {
    1: "El primer paso del sistema PAO es dominar la equivalencia Número-Letra (Ej: 1=T/D, 2=N). Expertos como Dominic O'Brien recomiendan que esta conversión debe ser automática antes de avanzar a los personajes. Céntrate en la velocidad de respuesta.",
    2: "Los personajes de Picas inician con 'P'. Según los campeones de memoria, debemos imaginar a las personas con extremo detalle facial y emocional. Cuanto más ridícula y exagerada sea la visualización, más adherencia tendrá en el cerebro.",
    3: "Los personajes de Corazones (C) deben involucrar emociones fuertes. Usa tus sentidos: visualiza el color rojo vibrante y añade texturas mentales a cada persona para afianzar el recuerdo.",
    4: "Al aprender los Tréboles (T), asocia a los personajes con elementos de la naturaleza o contundentes. Recuerda la regla del Sistema PAO: todo personaje debe tener una acción y un objeto intrínsecos a él.",
    5: "Los personajes de Rombos/Diamantes (R) suelen identificarse con riqueza o rigidez. Imagínalos brillando. El cerebro codifica mejor la información que está vinculada a variaciones extremas de luz y sonido.",
    6: "El entrenamiento de Acciones es vital. Al crear un 'Locus' (historia de 3 cartas), la acción es el pegamento lógico que une a la Persona 1 con el Objeto 3. Imagina las acciones de forma violenta, cómica o desproporcionada.",
    7: "El Objeto (Tercera carta) es el receptor de la acción. Cuando visualizas un objeto, amplíalo mentalmente hasta que sea tan grande como un edificio, o redúcelo microscópicamente. La sorpresa visual cimenta la memoria.",
    8: "El Palacio de la Memoria (Método de Loci): Basado en Cicerón, sitúa cada tríada P-A-O en una habitación estructurada de un lugar real que conozcas bien (tu casa, tu escuela). El anclaje espacial multiplica x10 la retención."
};

function startLesson(levelId) {
    const intro = $('#lesson-intro');
    intro.style.display = 'flex';
    $('#intro-title').innerText = levelsData.find(l => l.id === levelId).title;
    $('#intro-text').innerText = expertTips[levelId];

    $('#cancel-lesson-btn').onclick = () => { intro.style.display = 'none'; };

    $('#start-lesson-btn').onclick = () => {
        intro.style.display = 'none';
        const overlay = $('#lesson-overlay');
        overlay.classList.add('active');

        currentLessonQuestions = generateLessonQuestions(levelId);
        currentQuestionIndex = 0;
        loadQuestion(false, levelId);

        $('#close-lesson').onclick = () => {
            overlay.classList.remove('active');
        };
    };
}

function loadQuestion(isReviewMode = false, levelId = null) {
    const q = currentLessonQuestions[currentQuestionIndex];
    $('#lesson-question').innerText = q.q;
    $('#lesson-visual').innerHTML = q.visual || '';

    const prog = (currentQuestionIndex / currentLessonQuestions.length) * 100;
    $('#lesson-progress').style.width = `${prog}%`;

    $('#lesson-continue').style.display = 'none';
    const optContainer = $('#lesson-options');
    optContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            $$('.option-btn').forEach(b => b.disabled = true);
            if (idx === q.correct) {
                btn.classList.add('correct');
                $('#lesson-continue').style.display = 'inline-flex';
                $('#lesson-continue').innerText = 'Continuar'; // Ensure it's correct text
                $('#lesson-continue').onclick = () => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex >= currentLessonQuestions.length) {
                        finishLesson(isReviewMode ? null : levelId, isReviewMode);
                    } else {
                        loadQuestion(isReviewMode, levelId);
                    }
                };
                if (q.cardId) updateSrs(q.cardId, true);
            } else {
                btn.classList.add('wrong');
                $$('.option-btn')[q.correct].classList.add('correct');

                if (isReviewMode) {
                    $('#lesson-continue').innerText = 'Continuar (Repaso)';
                    $('#lesson-continue').style.display = 'inline-flex';
                    $('#lesson-continue').onclick = () => {
                        currentQuestionIndex++;
                        if (currentQuestionIndex >= currentLessonQuestions.length) {
                            finishLesson(null, isReviewMode);
                        } else {
                            loadQuestion(isReviewMode, levelId);
                        }
                    };
                } else {
                    $('#lesson-continue').innerText = 'Reintentar Lección';
                    $('#lesson-continue').style.display = 'inline-flex';
                    $('#lesson-continue').onclick = () => {
                        startLesson(levelId); // Restart on fail
                    };
                }
                if (q.cardId) updateSrs(q.cardId, false);
            }
        };
        optContainer.appendChild(btn);
    });
}

function finishLesson(levelId, isReviewMode = false) {
    $('#lesson-overlay').classList.remove('active');

    if (isReviewMode) {
        setupReview(); // refresh review count
        return;
    }

    if (levelId && userProgress.unlockedLevels === levelId) {
        userProgress.unlockedLevels++;
        saveProgress();
        setupHome(); // refresh path
    }
}

// ------------------------------------------------------------------
// REVIEW VIEW (SRS)
// ------------------------------------------------------------------
function setupReview() {
    // Collect all cards that are due for review
    const now = Date.now();
    let dueCards = [];

    // We iterate over known srsData
    // We will build a test from dueCards, mapping back to PAO list
    for (const [cardId, data] of Object.entries(srsData)) {
        if (now >= data.nextReview) {
            dueCards.push(cardId);
        }
    }

    $('#review-count').innerText = dueCards.length;
    $('#review-count').style.color = dueCards.length > 0 ? 'var(--error-color)' : 'var(--success-color)';

    const startBtn = $('#start-review-btn');
    startBtn.disabled = dueCards.length === 0;
    startBtn.style.opacity = dueCards.length === 0 ? '0.5' : '1';

    startBtn.onclick = () => {
        if (dueCards.length === 0) return;

        // Build questions dynamically for dueCards
        let questions = [];
        const pool = dueCards.slice(0, 10); // Review max 10 at a time

        pool.forEach(cid => {
            if (cid.startsWith('num-')) {
                const targetNum = parseInt(cid.replace('num-', ''));
                const target = phoneticSystem.find(p => p.num === targetNum);
                const others = phoneticSystem.filter(p => p.num !== target.num).map(p => p.num);
                const options = shuffle([target.num, ...shuffle(others).slice(0, 3)]);
                questions.push({
                    cardId: cid,
                    q: `Repaso: ¿Qué número corresponde a la consonante "${target.letters.toUpperCase()}"?`,
                    visual: '🧩',
                    options: options.map(String),
                    correct: options.indexOf(target.num)
                });
            } else {
                const cardData = paoList.find(c => c.card === cid);
                if (cardData) {
                    const others = shuffle(paoList.filter(p => p.card !== cardData.card)).slice(0, 3);
                    const options = shuffle([cardData.p, ...others.map(o => o.p)]);
                    const isRed = cardData.s === 'hearts' || cardData.s === 'diamonds';
                    const colorStyle = isRed ? 'color:#ff4b4b' : 'color:#c9d1d9';
                    questions.push({
                        cardId: cid,
                        q: `Repaso: ¿Qué personaje corresponde a esta carta?`,
                        visual: `<span style="${colorStyle}">${cardData.card}</span>`,
                        options: options,
                        correct: options.indexOf(cardData.p)
                    });
                }
            }
        });

        currentLessonQuestions = shuffle(questions);
        currentQuestionIndex = 0;

        const overlay = $('#lesson-overlay');
        overlay.classList.add('active');
        loadQuestion(true, null);

        $('#close-lesson').onclick = () => {
            overlay.classList.remove('active');
            setupReview();
        };
    };
}

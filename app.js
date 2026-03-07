// Utility for DOM
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function getListImgHtml(cardId) {
    const hasCustomImg = customPaoImages[cardId] && customPaoImages[cardId].length > 0;
    if (hasCustomImg) {
        return `<img src="${customPaoImages[cardId]}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;">`;
    }
    const cardSafe = cardId.replace('♠', 'S').replace('♥', 'H').replace('♣', 'C').replace('♦', 'D');
    return `<img src="assets/pao/${cardSafe}.svg" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" onerror="this.onerror=null; this.outerHTML='${cardId}';">`;
}

function getLessonVisualContent(cardData, isRed, symbolOrText) {
    const hasCustomImg = customPaoImages[cardData.card] && customPaoImages[cardData.card].length > 0;
    const colorStyle = isRed ? 'color:#ff4b4b' : 'color:#c9d1d9';
    let imgHtml = '';

    if (hasCustomImg) {
        imgHtml = `<img src="${customPaoImages[cardData.card]}" style="width:100%; height:100%; object-fit:cover;">`;
    } else {
        const cardSafe = cardData.card.replace('♠', 'S').replace('♥', 'H').replace('♣', 'C').replace('♦', 'D');
        imgHtml = `<img src="assets/pao/${cardSafe}.svg" style="width:100%; height:100%; object-fit:cover;" onerror="this.onerror=null; this.parentElement.style.display='none';">`;
    }

    const imgWrapper = `<div style="width:140px; height:140px; overflow:hidden; border-radius:12px; margin:0 auto; margin-bottom:15px; border:2px solid var(--accent-color);">${imgHtml}</div>`;

    if (symbolOrText === 'personaje') return `${imgWrapper}<span style="${colorStyle}">${cardData.card}</span>`;
    if (symbolOrText === 'accion') return `${imgWrapper}<span style="font-size:1.8rem">🎬</span>`;
    if (symbolOrText === 'objeto') return `${imgWrapper}<span style="font-size:1.8rem">📦</span>`;
    if (symbolOrText === 'reverse') return `${imgWrapper}👤`;
    return `<span style="${colorStyle}">${cardData.card}</span>`;
}

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
    <p id="palace-desc" style="text-align:center; padding: 0 20px;">Sube fotos de tu casa o ruta para construir tu propio Palacio de la Memoria.</p>
    <div id="palace-controls" style="display:flex; justify-content:center; gap:10px; margin-bottom: 20px; padding: 0 10px;">
        <button id="tutorial-btn" class="btn btn-secondary" style="padding:10px 15px; font-size: 0.95rem; display:flex; align-items:center; gap:5px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> Ver Tutorial</button>
    </div>
    
    <div style="position: relative; margin: 0 auto; max-width: 500px; padding: 10px; touch-action: none;" id="palace-wrapper">
        <div class="palace-grid" id="palace-grid-container" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; position: relative; z-index: 1;">
          <!-- Generated dynamically -->
        </div>
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
    try {

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
    } catch (err) {
        document.body.innerHTML += '<div style="color:red; background:black; position:fixed; top:0; left:0; z-index:9999; padding:20px; font-size:20px;">' + err.stack + '</div>';
    }
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
    { id: 1.1, title: 'Fonética 1-4', desc: 'Aprende T/D, N/Ñ, M, C/K/Q', poolOffset: 0, poolLimit: 4 },
    { id: 1.2, title: 'Fonética 5-8', desc: 'Aprende L, S/Z, F, J/CH', poolOffset: 4, poolLimit: 4 },
    { id: 1.3, title: 'Fonética 9-0', desc: 'Aprende B/V, R y Test Final', poolOffset: 8, poolLimit: 2 },

    { id: 2.1, title: 'Picas 1-4', desc: 'Peter Parker a Patricio', suit: 'spades', poolOffset: 0, poolLimit: 4 },
    { id: 2.2, title: 'Picas 5-8', desc: 'Princesa Leia a Pikachu', suit: 'spades', poolOffset: 4, poolLimit: 4 },
    { id: 2.3, title: 'Picas 9-K', desc: 'Pablo Escobar a Papa', suit: 'spades', poolOffset: 8, poolLimit: 5 },

    { id: 3.1, title: 'Corazones 1-4', desc: 'Catwoman a Cocinero', suit: 'hearts', poolOffset: 0, poolLimit: 4 },
    { id: 3.2, title: 'Corazones 5-8', desc: 'Clyde a C. Ronaldo', suit: 'hearts', poolOffset: 4, poolLimit: 4 },
    { id: 3.3, title: 'Corazones 9-K', desc: 'Chewbacca a Celia Cruz', suit: 'hearts', poolOffset: 8, poolLimit: 5 },

    { id: 4.1, title: 'Tréboles 1-4', desc: 'Terminator a Taxista', suit: 'clubs', poolOffset: 0, poolLimit: 4 },
    { id: 4.2, title: 'Tréboles 5-8', desc: 'Thor a Tarzán', suit: 'clubs', poolOffset: 4, poolLimit: 4 },
    { id: 4.3, title: 'Tréboles 9-K', desc: 'Toby Maguire a T-Rex', suit: 'clubs', poolOffset: 8, poolLimit: 5 },

    { id: 5.1, title: 'Rombos 1-4', desc: 'Ratón Mickey a Robocop', suit: 'diamonds', poolOffset: 0, poolLimit: 4 },
    { id: 5.2, title: 'Rombos 5-8', desc: 'Rapunzel a Rey Arturo', suit: 'diamonds', poolOffset: 4, poolLimit: 4 },
    { id: 5.3, title: 'Rombos 9-K', desc: 'Rubius a Rambo', suit: 'diamonds', poolOffset: 8, poolLimit: 5 },

    { id: 6.1, title: 'Acciones I', desc: 'Bloque aleatorio de 4', type: 'actions', randomPool: 4 },
    { id: 6.2, title: 'Acciones II', desc: 'Bloque aleatorio de 5', type: 'actions', randomPool: 5 },

    { id: 7.1, title: 'Objetos I', desc: 'Bloque aleatorio de 4', type: 'objects', randomPool: 4 },
    { id: 7.2, title: 'Objetos II', desc: 'Bloque aleatorio de 5', type: 'objects', randomPool: 5 },

    { id: 8.1, title: 'Palacio I', desc: 'Forma 2 Locus', type: 'palace', locusCount: 2 },
    { id: 8.2, title: 'Palacio II', desc: 'Forma 3 Locus', type: 'palace', locusCount: 3 }
];

function setupHome() {
    const pathContainer = $('#levels-path');
    pathContainer.innerHTML = ''; // prevent duplicates

    // userProgress.unlockedLevels now is an index for levelsData array (0 to length)
    let unlockedIndex = Math.floor(userProgress.unlockedLevels);
    // Since we changed the system, cap it safely if it bugs out:
    if (unlockedIndex > levelsData.length - 1) unlockedIndex = levelsData.length - 1;

    levelsData.forEach((level, idx) => {
        const isUnlocked = idx <= unlockedIndex;
        const isCurrent = idx === unlockedIndex;

        const node = document.createElement('div');
        node.className = `level-node ${isUnlocked ? 'unlocked' : ''} ${isCurrent ? 'current' : ''}`;
        node.innerHTML = `
      ${isCurrent ? '★' : (isUnlocked ? '✓' : '🔒')}
      <div class="level-node-label">${level.title}</div>
    `;

        if (isUnlocked) {
            node.addEventListener('click', () => startLesson(idx));
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
      <input type="text" id="edit-o" style="width:100%; padding:10px; margin-bottom:20px; border-radius:8px; border:1px solid var(--surface-hover); background:var(--bg-color); color:#fff; font-family:inherit;">
      
      <div style="margin-bottom:25px; padding:15px; border:1px solid var(--accent-color); border-radius:12px; background:rgba(20,150,255,0.05);">
         <h4 style="margin-bottom:10px; color:var(--accent-color); font-size:0.95rem; display:flex; align-items:center; gap:5px;">✨ Generador IA Automático</h4>
         <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:10px; line-height:1.3;">Pega tu token de OpenAI (DALL-E 3) para generar la imagen de tu nuevo personaje. La clave se guarda localmente y de forma segura.</p>
         <input type="password" id="openai-api-key" placeholder="sk-proj-..." style="width:100%; padding:10px; margin-bottom:10px; border-radius:8px; border:1px solid var(--surface-hover); background:var(--bg-color); color:#fff; font-size:0.8rem;">
         <button class="btn" id="generate-ai-img-btn" style="width:100%; background:linear-gradient(135deg, #10b981, #059669); font-size:0.9rem; margin-bottom:0;">🎨 Generar con DALL-E</button>
      </div>

      <div style="display:flex; gap:10px;">
        <button class="btn" id="save-edit-btn" style="flex:1;">Guardar Carta</button>
        <button class="btn btn-secondary" id="cancel-edit-btn" style="flex:1;">Cancelar</button>
      </div>
    </div>
  </div>
`;

const palaceTutorialModalHtml = `
  <div id="palace-tutorial-modal" style="position: fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(13,17,23,0.95); z-index:3000; display:none; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(8px);">
    <div style="background:var(--surface-color); padding:30px 20px; border-radius:16px; border:1px solid var(--surface-hover); width:100%; max-width:450px; max-height:85vh; overflow-y:auto; text-align:center;">
      <h2 style="color:var(--primary-color); margin-bottom:15px;">📖 Taller del Palacio</h2>
      <p style="color:var(--text-secondary); font-size:1.05rem; line-height:1.5; margin-bottom:20px; text-align:left;">
        El Palacio de la Memoria (Método de Loci) transforma números en lugares físicos de tu vida real. Necesitas <strong>18 lugares</strong> ordenados para guardar la baraja entera.
      </p>
      <div style="background:var(--bg-color); padding:15px; border-radius:12px; margin-bottom:20px; text-align:left;">
        <h4 style="color:var(--accent-color); margin-bottom:10px;">📸 Paso 1: Configura tus fotos</h4>
        <p style="color:var(--text-secondary); font-size:0.95rem; margin:0;">Toca cualquier recuadro vacío para abrir tu cámara o galería y subir hasta 18 fotos en orden de las habitaciones de tu casa o recorridos comunes.</p>
      </div>
      <button class="btn" id="close-tutorial-btn" style="width:100%; padding:15px;">¡Entendido, a crear locales!</button>
    </div>
  </div>
`;

if (!document.getElementById('edit-pao-modal')) {
    document.body.insertAdjacentHTML('beforeend', editPaoModalHtml);
}
if (!document.getElementById('palace-tutorial-modal')) {
    document.body.insertAdjacentHTML('beforeend', palaceTutorialModalHtml);
}

function setupLearn() {
    const container = $('#pao-list-container');
    let currentEditCard = null;

    const renderList = (filterSuit) => {
        container.innerHTML = '';
        const filtered = filterSuit === 'all' ? paoList : paoList.filter(p => p.s === filterSuit);

        filtered.forEach(item => {
            const imgHtml = getListImgHtml(item.card);

            const el = document.createElement('div');
            el.className = 'pao-card';
            el.innerHTML = `
        <div class="pao-card-img ${item.s}" style="position:relative; overflow:hidden;">
           ${imgHtml}
           <input type="file" accept="image/*" class="pao-image-upload" data-card="${item.card}" style="opacity:0; position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer; z-index:5;">
        </div>
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

        // Image Upload Logic for PAO cards
        $$('.pao-image-upload').forEach(input => {
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const MAX_WIDTH = 200; // Keep PAO images smaller to save localStorage space
                        const scaleSize = MAX_WIDTH / img.width;
                        canvas.width = MAX_WIDTH;
                        canvas.height = img.height * scaleSize;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
                        const cardId = e.target.dataset.card;
                        customPaoImages[cardId] = compressedDataUrl;
                        savePaoImages();
                        // Re-render the current list to show the new image
                        renderList(filterTabs.querySelector('.active').dataset.suit);
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            });
        });

        $$('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cardId = e.currentTarget.dataset.card;
                currentEditCard = paoList.find(p => p.card === cardId);
                $('#edit-card-id').innerText = cardId;
                $('#edit-p').value = currentEditCard.p;
                $('#edit-a').value = currentEditCard.a;
                $('#edit-o').value = currentEditCard.o;
                const savedKey = localStorage.getItem('openai_api_key');
                if (savedKey) $('#openai-api-key').value = savedKey;
                $('#generate-ai-img-btn').innerHTML = '🎨 Generar con DALL-E';
                $('#edit-pao-modal').style.display = 'flex';
            });
        });
    };

    $('#cancel-edit-btn').onclick = () => {
        $('#edit-pao-modal').style.display = 'none';
        $('#generate-ai-img-btn').innerHTML = '🎨 Generar con DALL-E';
    };

    $('#save-edit-btn').onclick = () => {
        if (currentEditCard) {
            currentEditCard.p = $('#edit-p').value;
            currentEditCard.a = $('#edit-a').value;
            currentEditCard.o = $('#edit-o').value;
            savePaoList(); // From data.js
            renderList(filterTabs.querySelector('.active').dataset.suit);
        }
        $('#edit-pao-modal').style.display = 'none';
        $('#generate-ai-img-btn').innerHTML = '🎨 Generar con DALL-E';
    };

    $('#generate-ai-img-btn').onclick = async () => {
        const apiKey = $('#openai-api-key').value.trim();
        if (!apiKey) {
            alert('Por favor, introduce una clave API de OpenAI válida.');
            return;
        }

        localStorage.setItem('openai_api_key', apiKey);

        const btn = $('#generate-ai-img-btn');
        btn.innerHTML = '⏳ Generando... (puede tardar 15s)';
        btn.disabled = true;

        const charName = $('#edit-p').value || currentEditCard.p;
        const action = $('#edit-a').value || currentEditCard.a;
        const object = $('#edit-o').value || currentEditCard.o;
        const prompt = `Un retrato vibrante en estilo arte digital/comic 3D de ${charName} realizando la accion de ${action} con un ${object}. Fondo colorido, altisima calidad, estilizado y expresivo. NO TEXT. NO WORDS.`;

        try {
            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "dall-e-3",
                    prompt: prompt,
                    n: 1,
                    size: "1024x1024",
                    response_format: "b64_json"
                })
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.message);
            }

            const b64Data = data.data[0].b64_json;
            const dataUrl = `data:image/png;base64,${b64Data}`;

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 300;
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleSize;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
                if (currentEditCard) {
                    customPaoImages[currentEditCard.card] = compressedDataUrl;
                    savePaoImages();
                    alert('¡Imagen generada e incrustada con éxito!');
                    btn.innerHTML = '✅ Imagen Guardada';
                }
            };
            img.src = dataUrl;

        } catch (err) {
            alert('Error al generar imagen: ' + err.message);
            btn.innerHTML = '❌ Error';
        } finally {
            btn.disabled = false;
        }
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

    // Check tutorial state
    const hasSeenTutorial = localStorage.getItem('paoSeenPalaceTutorial');
    if (!hasSeenTutorial) {
        $('#palace-tutorial-modal').style.display = 'flex';
        localStorage.setItem('paoSeenPalaceTutorial', 'true');
    }

    $('#tutorial-btn').onclick = () => {
        $('#palace-tutorial-modal').style.display = 'flex';
    };
    $('#close-tutorial-btn').onclick = () => {
        $('#palace-tutorial-modal').style.display = 'none';
    };

    // Render cells
    for (let i = 0; i < 18; i++) {
        const el = document.createElement('div');
        el.className = 'palace-locus';
        el.dataset.index = i;
        el.style = 'background: var(--surface-color); border: 1px dashed var(--surface-hover); border-radius: 12px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; cursor:pointer; user-select:none;';

        const hasImage = customPalace[i] && customPalace[i].length > 0;
        const routeOrder = i + 1; // 1-18 order

        const badgeHtml = `<div style="position:absolute; top:5px; left:5px; background:var(--accent-color); color:#fff; width:24px; height:24px; border-radius:50%; font-size:0.8rem; font-weight:bold; display:flex; align-items:center; justify-content:center; z-index:2; box-shadow:0 2px 4px rgba(0,0,0,0.5);">${routeOrder}</div>`;

        if (hasImage) {
            el.innerHTML = `
               ${badgeHtml}
               <img src="${customPalace[i]}" style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:0; pointer-events:none;">
               <div style="position:absolute; bottom:0; left:0; width:100%; background:rgba(0,0,0,0.7); color:#fff; text-align:center; padding:5px; font-size:0.8rem; font-weight:bold; z-index:2;">Locus ${i + 1}</div>
               <input type="file" accept="image/*" class="locus-upload" data-index="${i}" style="opacity:0; position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer; z-index:5;">
               <div class="locus-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(20, 150, 255, 0.4); z-index:3; opacity:0; transition:opacity 0.2s pointer-events:none;"></div>
            `;
        } else {
            el.innerHTML = `
               ${badgeHtml}
               <div style="font-size:2rem; color:var(--surface-hover); margin-bottom:10px; z-index:0; pointer-events:none;">+</div>
               <div style="color:var(--text-secondary); font-size:0.9rem; z-index:0; pointer-events:none;">Locus ${i + 1}</div>
               <input type="file" accept="image/*" class="locus-upload" data-index="${i}" style="opacity:0; position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer; z-index:5;">
               <div class="locus-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(20, 150, 255, 0.4); z-index:3; opacity:0; transition:opacity 0.2s pointer-events:none;"></div>
            `;
        }
        container.appendChild(el);
    }

    // Image Upload Logic
    $$('.locus-upload').forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
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
                    savePalaceList();
                    setupPalace();
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
                    <div id="lesson-visual" style="text-align:center; font-size: 4rem; margin-bottom: 20px;">🃏</div>
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
let currentLessonFailed = false;

// Utility: Shuffle array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateLessonQuestions(idx) {
    let flashcards = [];
    let quizzes = [];

    const levelDef = levelsData[idx];

    if (levelDef.id < 2) {
        // Phonetics (Level 1.1, 1.2, 1.3)
        const targetSystem = phoneticSystem.slice(levelDef.poolOffset, levelDef.poolOffset + levelDef.poolLimit);

        targetSystem.forEach(target => {
            flashcards.push({
                type: 'flashcard',
                cardId: `num-${target.num}`,
                visual: '🧩',
                q: `Aprende: Consonante "${target.letters.toUpperCase()}"`,
                text: `El número ${target.num} se asocia con las letras ${target.letters.toUpperCase()}.`,
                btnText: 'Entendido'
            });

            // Forward Question
            const others1 = phoneticSystem.filter(p => p.num !== target.num).map(p => p.num);
            const options1 = shuffle([target.num, ...shuffle(others1).slice(0, 3)]);
            quizzes.push({
                type: 'quiz',
                cardId: `num-${target.num}`,
                q: `¿Qué número corresponde a la consonante "${target.letters.toUpperCase()}"?`,
                visual: '🧩',
                options: options1.map(String),
                correct: options1.indexOf(target.num)
            });

            // Reverse Question
            const others2 = phoneticSystem.filter(p => p.num !== target.num).map(p => p.letters.toUpperCase());
            const options2 = shuffle([target.letters.toUpperCase(), ...shuffle(others2).slice(0, 3)]);
            quizzes.push({
                type: 'quiz',
                cardId: `num-${target.num}`,
                q: `¿Qué consonantes corresponden al número "${target.num}"?`,
                visual: '🧩',
                options: options2,
                correct: options2.indexOf(target.letters.toUpperCase())
            });
        });
    } else if (levelDef.suit) {
        // Characters (Levels 2.1 to 5.3)
        let pool = paoList.filter(p => p.s === levelDef.suit)
            .slice(levelDef.poolOffset, levelDef.poolOffset + levelDef.poolLimit);

        pool.forEach(cardData => {
            const isRed = cardData.s === 'hearts' || cardData.s === 'diamonds';
            const visualContent = getLessonVisualContent(cardData, isRed, 'personaje');
            const visualReverse = getLessonVisualContent(cardData, isRed, 'reverse');

            flashcards.push({
                type: 'flashcard',
                cardId: cardData.card,
                visual: visualContent,
                q: `Aprende: Personaje`,
                text: `${cardData.card} es ${cardData.p}`,
                btnText: 'Memorizado'
            });

            const others = shuffle(paoList.filter(p => p.card !== cardData.card && p.s === levelDef.suit)).slice(0, 3);

            // Forward Question
            const options1 = shuffle([cardData.p, ...others.map(o => o.p)]);
            quizzes.push({
                type: 'quiz',
                cardId: cardData.card,
                q: `¿Qué personaje corresponde a esta carta (${cardData.card})?`,
                visual: visualContent,
                options: options1,
                correct: options1.indexOf(cardData.p)
            });

            // Reverse Question
            const options2 = shuffle([cardData.card, ...others.map(o => o.card)]);
            quizzes.push({
                type: 'quiz',
                cardId: cardData.card,
                q: `¿Qué carta corresponde al personaje "${cardData.p}"?`,
                visual: visualReverse,
                options: options2,
                correct: options2.indexOf(cardData.card)
            });
        });
    } else if (levelDef.type === 'actions') {
        // Actions
        const lessonCards = shuffle([...paoList]).slice(0, levelDef.randomPool);
        lessonCards.forEach(cardData => {
            const isRed = cardData.s === 'hearts' || cardData.s === 'diamonds';
            const visualContent = getLessonVisualContent(cardData, isRed, 'accion');

            flashcards.push({
                type: 'flashcard',
                cardId: cardData.card,
                visual: visualContent,
                q: `Aprende: Acción`,
                text: `La acción de ${cardData.p} es "${cardData.a}"`,
                btnText: 'Memorizado'
            });

            const others = shuffle(paoList.filter(p => p.card !== cardData.card)).slice(0, 3);

            // Forward Question
            const options1 = shuffle([cardData.a, ...others.map(o => o.a)]);
            quizzes.push({
                type: 'quiz',
                cardId: cardData.card,
                q: `¿Qué ACCIÓN realiza ${cardData.p}?`,
                visual: visualContent,
                options: options1,
                correct: options1.indexOf(cardData.a)
            });

            // Reverse Question
            const options2 = shuffle([cardData.p, ...others.map(o => o.p)]);
            quizzes.push({
                type: 'quiz',
                cardId: cardData.card,
                q: `¿De qué personaje es la acción "${cardData.a}"?`,
                visual: visualContent,
                options: options2,
                correct: options2.indexOf(cardData.p)
            });
        });
    } else if (levelDef.type === 'objects') {
        const lessonCards = shuffle([...paoList]).slice(0, levelDef.randomPool);
        lessonCards.forEach(cardData => {
            const isRed = cardData.s === 'hearts' || cardData.s === 'diamonds';
            const visualContent = getLessonVisualContent(cardData, isRed, 'objeto');

            flashcards.push({
                type: 'flashcard',
                cardId: cardData.card,
                visual: visualContent,
                q: `Aprende: Objeto`,
                text: `El objeto de ${cardData.p} es "${cardData.o}"`,
                btnText: 'Memorizado'
            });

            const others = shuffle(paoList.filter(p => p.card !== cardData.card)).slice(0, 3);

            // Forward Question
            const options1 = shuffle([cardData.o, ...others.map(o => o.o)]);
            quizzes.push({
                type: 'quiz',
                cardId: cardData.card,
                q: `¿Cuál es el OBJETO icónico de ${cardData.p}?`,
                visual: visualContent,
                options: options1,
                correct: options1.indexOf(cardData.o)
            });

            // Reverse Question
            const options2 = shuffle([cardData.p, ...others.map(o => o.p)]);
            quizzes.push({
                type: 'quiz',
                cardId: cardData.card,
                q: `¿De qué personaje es el objeto "${cardData.o}"?`,
                visual: visualContent,
                options: options2,
                correct: options2.indexOf(cardData.p)
            });
        });
    } else if (levelDef.type === 'palace') {
        // Palacio
        for (let i = 0; i < levelDef.locusCount; i++) {
            const cards = shuffle([...paoList]).slice(0, 3);
            const p = cards[0], a = cards[1], o = cards[2];

            // Integrate user uploaded locus photos here!
            const idxLevelOffset = (levelDef.id === 8.1) ? i : (i + 9);
            const locusIndex = idxLevelOffset;
            const hasImage = customPalace && customPalace[locusIndex] && customPalace[locusIndex].length > 0;
            const visualHtml = hasImage
                ? `<div style="position:relative; width:150px; height:150px; border-radius:12px; overflow:hidden; margin: 0 auto; margin-bottom:15px; border:2px solid var(--accent-color);"><img src="${customPalace[locusIndex]}" style="width:100%; height:100%; object-fit:cover;"><div style="position:absolute; bottom:0; width:100%; background:rgba(0,0,0,0.6); font-size:0.8rem; color:#fff; text-align:center; padding:2px;">Orden ${idxLevelOffset + 1}</div></div><span style="font-size:1.8rem">${p.card} | ${a.card} | ${o.card}</span>`
                : `<span style="font-size:1.8rem">${p.card} | ${a.card} | ${o.card}</span>`;

            quizzes.push({
                type: 'quiz',
                q: `En el Locus ${idxLevelOffset + 1} de la ruta.Activa P - A - O para: `,
                visual: visualHtml,
                options: shuffle([
                    `${p.p} | ${a.a} | ${o.o} `,
                    `${a.p} | ${p.a} | ${o.o} `,
                    `${p.p} | ${o.a} | ${a.o} `,
                    `${o.p} | ${a.a} | ${p.o} `
                ]),
                correct: -1
            });
            quizzes[quizzes.length - 1].correct = quizzes[quizzes.length - 1].options.indexOf(`${p.p} | ${a.a} | ${o.o} `);
        }
    }

    return [...flashcards, ...shuffle(quizzes)];
}

const expertTips = {
    1: "El primer paso del sistema PAO es dominar la equivalencia Número-Letra. Expertos como Dominic O'Brien recomiendan que esta conversión debe ser automática antes de avanzar a los personajes. Céntrate en la velocidad de respuesta.",
    2: "Los personajes de Picas inician con 'P'. Según los campeones de memoria, debemos imaginar a las personas con extremo detalle facial y emocional. Cuanto más ridícula y exagerada sea la visualización, más adherencia tendrá en el cerebro.",
    3: "Los personajes de Corazones (C) deben involucrar emociones fuertes. Usa tus sentidos: visualiza el color rojo vibrante y añade texturas mentales a cada persona para afianzar el recuerdo.",
    4: "Al aprender los Tréboles (T), asocia a los personajes con elementos de la naturaleza o contundentes. Recuerda la regla del Sistema PAO: todo personaje debe tener una acción y un objeto intrínsecos a él.",
    5: "Los personajes de Rombos/Diamantes (R) suelen identificarse con riqueza o rigidez. Imagínalos brillando. El cerebro codifica mejor la información que está vinculada a variaciones extremas de luz y sonido.",
    6: "El entrenamiento de Acciones es vital. Al crear un 'Locus' (historia de 3 cartas), la acción es el pegamento lógico que une a la Persona 1 con el Objeto 3. Imagina las acciones de forma violenta, cómica o desproporcionada.",
    7: "El Objeto (Tercera carta) es el receptor de la acción. Cuando visualizas un objeto, amplíalo mentalmente hasta que sea tan grande como un edificio, o redúcelo microscópicamente. La sorpresa visual cimenta la memoria.",
    8: "El Palacio de la Memoria (Método de Loci): Basado en Cicerón, sitúa cada tríada P-A-O en una habitación estructurada de un lugar real que conozcas bien (tu casa, tu escuela). El anclaje espacial multiplica x10 la retención."
};

function startLesson(idx) {
    const levelDef = levelsData[idx];
    const categoryId = Math.floor(levelDef.id);

    const intro = $('#lesson-intro');
    intro.style.display = 'flex';
    $('#intro-title').innerText = levelDef.title;
    $('#intro-text').innerText = expertTips[categoryId] || expertTips[1];

    $('#cancel-lesson-btn').onclick = () => { intro.style.display = 'none'; };

    $('#start-lesson-btn').onclick = () => {
        intro.style.display = 'none';
        const overlay = $('#lesson-overlay');
        overlay.classList.add('active');

        currentLessonQuestions = generateLessonQuestions(idx);
        currentQuestionIndex = 0;
        currentLessonFailed = false;
        loadQuestion(false, idx);

        $('#close-lesson').onclick = () => {
            overlay.classList.remove('active');
        };
    };
}

function loadQuestion(isReviewMode = false, levelIdx = null) {
    if ($('#lesson-feedback')) $('#lesson-feedback').remove();

    const q = currentLessonQuestions[currentQuestionIndex];
    $('#lesson-question').innerText = q.q;

    // In flashcard mode, show text below visual
    if (q.type === 'flashcard') {
        $('#lesson-visual').innerHTML = `${q.visual || ''} <div style="font-size:1.2rem; color:var(--accent-color); font-weight:700; margin-top:15px; background:var(--surface-hover); padding:15px; border-radius:12px;">${q.text}</div>`;
    } else {
        $('#lesson-visual').innerHTML = q.visual || '';
    }

    const prog = (currentQuestionIndex / currentLessonQuestions.length) * 100;
    $('#lesson-progress').style.width = `${prog}% `;

    $('#lesson-continue').style.display = 'none';
    const optContainer = $('#lesson-options');
    optContainer.innerHTML = '';

    if (q.type === 'flashcard') {
        $('#lesson-continue').innerText = q.btnText || 'Continuar';
        $('#lesson-continue').style.display = 'inline-flex';
        $('#lesson-continue').onclick = () => {
            currentQuestionIndex++;
            if (currentQuestionIndex >= currentLessonQuestions.length) {
                finishLesson(isReviewMode ? null : levelIdx, isReviewMode);
            } else {
                loadQuestion(isReviewMode, levelIdx);
            }
        };
    } else {
        // Normal Quiz
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.onclick = () => {
                $$('.option-btn').forEach(b => b.disabled = true);
                if (idx === q.correct) {
                    btn.classList.add('correct');
                    $('#lesson-continue').style.display = 'inline-flex';
                    $('#lesson-continue').innerText = 'Continuar';
                    $('#lesson-continue').onclick = () => {
                        currentQuestionIndex++;
                        if (currentQuestionIndex >= currentLessonQuestions.length) {
                            finishLesson(isReviewMode ? null : levelIdx, isReviewMode);
                        } else {
                            loadQuestion(isReviewMode, levelIdx);
                        }
                    };
                    if (q.cardId) updateSrs(q.cardId, true);
                } else {
                    btn.classList.add('wrong');
                    $$('.option-btn')[q.correct].classList.add('correct');
                    currentLessonFailed = true;

                    $('#lesson-visual').insertAdjacentHTML('afterend', `<div id="lesson-feedback" style="margin-top:10px; color:var(--error-color); font-weight:bold;">¡Incorrecto! La respuesta era: ${q.options[q.correct]}</div>`);

                    if (isReviewMode) {
                        $('#lesson-continue').innerText = 'Continuar (Repaso)';
                    } else {
                        $('#lesson-continue').innerText = 'Continuar con fallos';
                    }

                    $('#lesson-continue').style.display = 'inline-flex';
                    $('#lesson-continue').onclick = () => {
                        currentQuestionIndex++;
                        if (currentQuestionIndex >= currentLessonQuestions.length) {
                            finishLesson(isReviewMode ? null : levelIdx, isReviewMode);
                        } else {
                            loadQuestion(isReviewMode, levelIdx);
                        }
                    };

                    if (q.cardId) updateSrs(q.cardId, false);
                }
            };
            optContainer.appendChild(btn);
        });
    }
}

function finishLesson(levelIdx, isReviewMode = false) {
    $('#lesson-overlay').classList.remove('active');

    if (isReviewMode) {
        setupReview(); // refresh review count
        return;
    }

    if (levelIdx !== null && levelIdx !== undefined) {
        if (!currentLessonFailed) {
            if (userProgress.unlockedLevels <= levelIdx) {
                userProgress.unlockedLevels = levelIdx + 1;
                saveProgress();
                alert('¡Sección superada con éxito!');
            }
        } else {
            alert('Has completado la sección, pero tuviste errores. Debes repetirla perfectamente para desbloquear la siguiente.');
        }
    }
    setupHome(); // refresh path
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
                    type: 'quiz',
                    cardId: cid,
                    q: `Repaso: ¿Qué número corresponde a la consonante "${target.letters.toUpperCase()}" ? `,
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
                    const visualContent = getLessonVisualContent(cardData, isRed, 'personaje');

                    questions.push({
                        type: 'quiz',
                        cardId: cid,
                        q: `Repaso: ¿Qué personaje corresponde a esta carta?`,
                        visual: visualContent,
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


// ------------------------------------------------------------------
// INIT APP & NAVIGATION BINDINGS
// ------------------------------------------------------------------
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const target = e.currentTarget.closest('.nav-btn').dataset.target;
        renderView(target);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    renderView('home');
});

// Fallback if already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    renderView('home');
}

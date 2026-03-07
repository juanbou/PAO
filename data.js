// phonetics and initial PAO lists

const suits = [
    { id: 'spades', name: 'Picas', symbol: '♠', iconClass: 'spades', consonant: 'P' },
    { id: 'hearts', name: 'Corazones', symbol: '♥', iconClass: 'hearts', consonant: 'C' },
    { id: 'clubs', name: 'Tréboles', symbol: '♣', iconClass: 'clubs', consonant: 'T' },
    { id: 'diamonds', name: 'Rombos', symbol: '♦', iconClass: 'diamonds', consonant: 'R' }
];

const values = [
    { id: 'A', value: 1, consonant: 'T/D' },
    { id: '2', value: 2, consonant: 'N/Ñ' },
    { id: '3', value: 3, consonant: 'M' },
    { id: '4', value: 4, consonant: 'C/K/Q' },
    { id: '5', value: 5, consonant: 'L' },
    { id: '6', value: 6, consonant: 'S/Z' },
    { id: '7', value: 7, consonant: 'F' },
    { id: '8', value: 8, consonant: 'J/CH' },
    { id: '9', value: 9, consonant: 'B/V' },
    { id: '10', value: 10, consonant: 'R' },
    { id: 'J', value: 11, consonant: 'Figura' },
    { id: 'Q', value: 12, consonant: 'Figura' },
    { id: 'K', value: 13, consonant: 'Figura' }
];

const defaultPaoList = [
    // Picas (P)
    { card: 'A♠', s: 'spades', v: 'A', code: 'P-T', p: 'Peter Parker', a: 'Trepando', o: 'Telaraña' },
    { card: '2♠', s: 'spades', v: '2', code: 'P-N', p: 'Phineas', a: 'Construyendo', o: 'Montaña Rusa' },
    { card: '3♠', s: 'spades', v: '3', code: 'P-M', p: 'Post Malone', a: 'Tatuando', o: 'Micrófono' },
    { card: '4♠', s: 'spades', v: '4', code: 'P-C', p: 'Patricio Estrella', a: 'Cazando', o: 'Medusa' },
    { card: '5♠', s: 'spades', v: '5', code: 'P-L', p: 'Princesa Leia', a: 'Disparando', o: 'Blaster' },
    { card: '6♠', s: 'spades', v: '6', code: 'P-S', p: 'Pennywise', a: 'Asustando', o: 'Globo Rojo' },
    { card: '7♠', s: 'spades', v: '7', code: 'P-F', p: 'Profesor (LCDP)', a: 'Atracando', o: 'Máscara Dalí' },
    { card: '8♠', s: 'spades', v: '8', code: 'P-CH', p: 'Pikachu', a: 'Electrocutando', o: 'Pokéball' },
    { card: '9♠', s: 'spades', v: '9', code: 'P-B', p: 'Peaky Blinder (Tommy)', a: 'Fumando', o: 'Gorra con Cuchilla' },
    { card: '10♠', s: 'spades', v: '10', code: 'P-R', p: 'Power Ranger', a: 'Transformando', o: 'Zord' },
    { card: 'J♠', s: 'spades', v: 'J', code: 'J♠ (Joven)', p: 'Percy Jackson', a: 'Invocando', o: 'Agua del mar' },
    { card: 'Q♠', s: 'spades', v: 'Q', code: 'Q♠ (Mujer)', p: 'Pocahontas', a: 'Navegando', o: 'Canoa' },
    { card: 'K♠', s: 'spades', v: 'K', code: 'K♠ (Rey/Líder)', p: 'Poseidón', a: 'Ahogando', o: 'Tridente' },

    // Corazones (C)
    { card: 'A♥', s: 'hearts', v: 'A', code: 'C-T', p: 'Capitán América', a: 'Lanzando', o: 'Escudo' },
    { card: '2♥', s: 'hearts', v: '2', code: 'C-N', p: 'Chuck Norris', a: 'Pateando', o: 'Saco de Boxeo' },
    { card: '3♥', s: 'hearts', v: '3', code: 'C-M', p: 'Captain Marvel', a: 'Volando', o: 'Nave Skrull' },
    { card: '4♥', s: 'hearts', v: '4', code: 'C-C', p: 'Creeper (Minecraft)', a: 'Explotando', o: 'Bloque de TNT' },
    { card: '5♥', s: 'hearts', v: '5', code: 'C-L', p: 'Calamardo', a: 'Tocando', o: 'Clarinete' },
    { card: '6♥', s: 'hearts', v: '6', code: 'C-S', p: 'Cristiano Ronaldo', a: 'Celebrando (Siu)', o: 'Balón de Oro' },
    { card: '7♥', s: 'hearts', v: '7', code: 'C-F', p: 'Caperucita', a: 'Caminando', o: 'Cesta' },
    { card: '8♥', s: 'hearts', v: '8', code: 'C-CH', p: 'Chewbacca', a: 'Aullando', o: 'Ballesta Láser' },
    { card: '9♥', s: 'hearts', v: '9', code: 'C-B', p: 'Cardi B', a: 'Rapeando', o: 'Zapatos Balenciaga' },
    { card: '10♥', s: 'hearts', v: '10', code: 'C-R', p: 'Charlie Puth', a: 'Cantando', o: 'Piano' },
    { card: 'J♥', s: 'hearts', v: 'J', code: 'J♥ (Joven)', p: 'Casper', a: 'Traspasando', o: 'Pared Blanca' },
    { card: 'Q♥', s: 'hearts', v: 'Q', code: 'Q♥ (Mujer)', p: 'Cleopatra', a: 'Bañando', o: 'Tinna de Leche' },
    { card: 'K♥', s: 'hearts', v: 'K', code: 'K♥ (Rey/Líder)', p: 'Conde Drácula', a: 'Mordiendo', o: 'Cuello' },

    // Tréboles (T)
    { card: 'A♣', s: 'clubs', v: 'A', code: 'T-T', p: 'Tom Holland', a: 'Balanceando', o: 'Traje Spiderman' },
    { card: '2♣', s: 'clubs', v: '2', code: 'T-N', p: 'Thanos', a: 'Chasqueando', o: 'Guantelete' },
    { card: '3♣', s: 'clubs', v: '3', code: 'T-M', p: 'Thor', a: 'Golpeando', o: 'Mjolnir (Martillo)' },
    { card: '4♣', s: 'clubs', v: '4', code: 'T-C', p: 'Tom Cruise', a: 'Corriendo', o: 'Moto Misión Imposible' },
    { card: '5♣', s: 'clubs', v: '5', code: 'T-L', p: 'Taylor Swift', a: 'Componiendo', o: 'Guitarra Acústica' },
    { card: '6♣', s: 'clubs', v: '6', code: 'T-S', p: 'Tony Stark', a: 'Ensamblando', o: 'Armadura Iron Man' },
    { card: '7♣', s: 'clubs', v: '7', code: 'T-F', p: 'Toph (Avatar)', a: 'Controlando', o: 'Roca' },
    { card: '8♣', s: 'clubs', v: '8', code: 'T-J', p: 'Tom (y Jerry)', a: 'Persiguiendo', o: 'Trampa de ratón' },
    { card: '9♣', s: 'clubs', v: '9', code: 'T-V', p: 'Travis Scott', a: 'Saltando (Concierto)', o: 'Zapatillas Jordan' },
    { card: '10♣', s: 'clubs', v: '10', code: 'T-R', p: 'T-Rex (Jurassic)', a: 'Rugiendo', o: 'Hueso gigante' },
    { card: 'J♣', s: 'clubs', v: 'J', code: 'J♣ (Joven)', p: 'Tintín', a: 'Investigando', o: 'Lupa' },
    { card: 'Q♣', s: 'clubs', v: 'Q', code: 'Q♣ (Mujer)', p: 'Teresa de Calcuta', a: 'Rezando', o: 'Rosario' },
    { card: 'K♣', s: 'clubs', v: 'K', code: 'K♣ (Rey/Líder)', p: 'Terminator', a: 'Disparando', o: 'Escopeta' },

    // Rombos/Diamantes (R)
    { card: 'A♦', s: 'diamonds', v: 'A', code: 'R-T', p: 'Rata Ratatouille', a: 'Cocinando', o: 'Olla' },
    { card: '2♦', s: 'diamonds', v: '2', code: 'R-N', p: 'Rafa Nadal', a: 'Sacando', o: 'Raqueta de Tenis' },
    { card: '3♦', s: 'diamonds', v: '3', code: 'R-M', p: 'Rick Morty', a: 'Eructando', o: 'Pistola de Portales' },
    { card: '4♦', s: 'diamonds', v: '4', code: 'R-C', p: 'Rubius', a: 'Streameando', o: 'Set Gamer' },
    { card: '5♦', s: 'diamonds', v: '5', code: 'R-L', p: 'Rosalía', a: 'Motomameando', o: 'Casco de Moto' },
    { card: '6♦', s: 'diamonds', v: '6', code: 'R-S', p: 'Ron Weasley', a: 'Hechizando', o: 'Varita Rota' },
    { card: '7♦', s: 'diamonds', v: '7', code: 'R-F', p: 'Rafa (Tortuga Ninja)', a: 'Girando', o: 'Porciones de Pizza' },
    { card: '8♦', s: 'diamonds', v: '8', code: 'R-J', p: 'Rambo', a: 'Ametrallando', o: 'Cinta de Balas' },
    { card: '9♦', s: 'diamonds', v: '9', code: 'R-V', p: 'Rayo McQueen', a: 'Acelerando', o: 'Neumático' },
    { card: '10♦', s: 'diamonds', v: '10', code: 'R-R', p: 'Ryan Reynolds', a: 'Bromeando', o: 'Traje de Deadpool' },
    { card: 'J♦', s: 'diamonds', v: 'J', code: 'J♦ (Joven)', p: 'Robin', a: 'Acompañando', o: 'Batarang' },
    { card: 'Q♦', s: 'diamonds', v: 'Q', code: 'Q♦ (Mujer)', p: 'Rihanna', a: 'Maquillando', o: 'Paraguas (Umbrella)' },
    { card: 'K♦', s: 'diamonds', v: 'K', code: 'K♦ (Rey/Líder)', p: 'Rey Arturo', a: 'Desenvainando', o: 'Excalibur' }
];

const phoneticSystem = [
    { num: 1, letters: 't, d' },
    { num: 2, letters: 'n, ñ' },
    { num: 3, letters: 'm' },
    { num: 4, letters: 'c, k, q' },
    { num: 5, letters: 'l' },
    { num: 6, letters: 's, z' },
    { num: 7, letters: 'f' },
    { num: 8, letters: 'j, ch' },
    { num: 9, letters: 'b, v' },
    { num: 0, letters: 'r' }
];
// Custom Palace state
let customPalace = JSON.parse(localStorage.getItem('paoCustomPalace')) || Array(18).fill('');

function savePalaceList() {
    localStorage.setItem('paoCustomPalace', JSON.stringify(customPalace));
}

// Load logic for PAO
let paoList = [];
const savedPao = localStorage.getItem('customPaoList');
if (savedPao) {
    try {
        paoList = JSON.parse(savedPao);
    } catch (e) {
        paoList = [...defaultPaoList];
    }
} else {
    paoList = [...defaultPaoList];
}

const savePaoList = () => {
    localStorage.setItem('customPaoList', JSON.stringify(paoList));
};

// App State
let userProgress = {
    unlockedLevels: 1,
    bestTime: null
};

const savedProgress = localStorage.getItem('paoProgress');
if (savedProgress) {
    try {
        userProgress = JSON.parse(savedProgress);
    } catch (e) { }
}

const saveProgress = () => {
    localStorage.setItem('paoProgress', JSON.stringify(userProgress));
};

// Spaced Repetition logic (SRS)
let srsData = {};
const savedSrs = localStorage.getItem('paoSrs');
if (savedSrs) {
    try {
        srsData = JSON.parse(savedSrs);
    } catch (e) { }
}

const saveSrs = () => {
    localStorage.setItem('paoSrs', JSON.stringify(srsData));
};

const updateSrs = (cardId, isCorrect) => {
    if (!srsData[cardId]) {
        srsData[cardId] = { correct: 0, wrong: 0, consecutive: 0, nextReview: Date.now() };
    }

    const record = srsData[cardId];
    if (isCorrect) {
        record.correct++;
        record.consecutive++;
        // Exponential backoff for next review (e.g. 1 min, 5 min, 1 hour, 1 day)
        const multiplier = [1, 5, 60, 1440, 4320]; // In minutes
        const index = Math.min(record.consecutive, multiplier.length - 1);
        record.nextReview = Date.now() + (multiplier[index] * 60 * 1000);
    } else {
        record.wrong++;
        record.consecutive = 0;
        record.nextReview = Date.now(); // Review immediately/soon
    }
    saveSrs();
};

let customPaoImages = JSON.parse(localStorage.getItem('customPaoImages')) || {};

const savePaoImages = () => {
    localStorage.setItem('customPaoImages', JSON.stringify(customPaoImages));
};

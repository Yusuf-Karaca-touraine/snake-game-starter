// ==== SNAKE GAME - Starter Pack ====
// Les TODO sont à compléter au fil du cours

//TODO récupérer le canvas
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
//TODO exemples à tester

function drawArcEnDegres(ctx, x, y, rayon, beginAngleDeg, endAngleDeg, couleur = "black", fillForm = false) {
    const angleDebutRad = beginAngleDeg * (Math.PI / 180);
    const angleFinRad = endAngleDeg * (Math.PI / 180);

    ctx.beginPath();
    ctx.arc(x, y, rayon, angleDebutRad, angleFinRad);
    ctx.strokeStyle = couleur;

    if (fillForm) {
      ctx.fillStyle = couleur;
      ctx.fill();
    } else {
      ctx.stroke();
    }
  };



// Taille du canvas et de la grille
const gridSize = 20;      // taille d'une case
const tileCount = canvas.width / gridSize; // nombre de cases sur une ligne/colonne
// Snake (tête + corps sous forme de tableau de coordonnées)
let snake = [{x: 8, y: 8}, {x: 7, y: 8}, {x: 6, y: 8}];// position initiale
let direction = {x: 1, y: 0}; // direction actuelle (droite)
let nextDirection = direction;

function update() {
    const newHead = {
        x: snake[0].x + nextDirection.x,
        y: snake[0].y + nextDirection.y
    };

    if (checkCollisionWithWall(newHead)) {
        gameOver();
        return;
    }

    if (checkSelfCollisionWithSelf(newHead)) {
        gameOver();
        return;
    }

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        updateLevel();
        spawnFood();
    } else {
        snake.pop();
    }

    draw();
}

let food = {}; // position de la nourriture
let bonus = null; // position bonus/malus si besoin
let score = 0;
let level = 1;
let lives = 3;
let isPaused = false;
let isGameOver = false;
let moveInterval = 200; // ms (vitesse de départ)
let moveTimer = null;
let wallsEnabled = false;
let difficulty = 'normal'; // 'easy' | 'normal' | 'hard'

// TODO : gestion des types de nourritures et des effets

// === Initialisation ===
window.onload = function () {
    // TODO : afficher écran d'accueil, choix options, etc.
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    
    // TODO : initialiser les events pour le choix du niveau, murs ON/OFF, etc.
    // Exemple :
    // document.getElementById('walls-option').addEventListener('change', function() { ... });
    
    // Gestion des touches clavier
    document.addEventListener('keydown', handleKeyDown);
    
    drawArcEnDegres(ctx, 800, 150, 100, 0, 360, "green", true);
    drawArcEnDegres(ctx, 150, 150, 100, 0, 360, "red");
    ctx.fillStyle = "#303030";
    ctx.fillRect(40, 40, 80, 80);
    // TODO : initialiser le jeu (afficher le snake, le food, etc.)
    draw();
};

// === Fonction principale du jeu ===
function gameLoop() {
    if (isPaused || isGameOver) return;
    
    // TODO : déplacer le Snake
    // TODO : vérifier collisions, manger nourriture, gérer score, level, vies...
    // TODO : gérer bonus/malus
    
    // Affichage
    update();
    draw();
};

function checkCollisionWithWall(head) {
    return (
        head.x < 0 ||   head.y < 0 || 
        head.x >= tileCount || head.y >= tileCount);
};

function checkSelfCollisionWithSelf(head) {
    // On ignore la tête (index 0) et vérifie si elle touche une autre cellule
    return snake.some((segment, index) =>
        index !== 0 && segment.x === head.x && segment.y === head.y
    );
}


// === Fonctions à compléter ===

// Démarrer le jeu
function startGame() {
    // TODO : (ré)initialiser toutes les variables, positions, score, etc.
    // TODO : commencer la boucle principale (setInterval/gameLoop)
        isGameOver = false;
        isPaused = false;
        score = 0;
        level = 1;
        lives = 3;
        moveInterval = 200;
        direction = {x: 1, y: 0};
        nextDirection = direction;
    
        // Position de départ du snake
        snake = [
            {x: 8, y: 8},
            {x: 7, y: 8},
            {x: 6, y: 8}
        ];
    
        if (moveTimer) clearInterval(moveTimer);
        moveTimer = setInterval(gameLoop, moveInterval);
    
        spawnFood(); 
        draw();
}

// Mettre en pause/reprendre
function togglePause() {
    // TODO : suspendre ou reprendre le jeu
        if (isGameOver) return;
    
        isPaused = !isPaused;

        const pauseBtn = document.getElementById('pause-btn');
        pauseBtn.textContent = isPaused ? "Reprendre" : "Pause";
    
        if (!isPaused) {
            moveTimer = setInterval(gameLoop, moveInterval);
        } else {
            clearInterval(moveTimer);
        }
    };

// Recommencer une partie
function restartGame() {
    // TODO : réinitialiser la partie complète
        clearInterval(moveTimer);
        startGame();
    };

// Partie terminée
function gameOver() {
    isGameOver = true;
    clearInterval(moveTimer);
    playSound('gameover');
    alert("💀 Game Over ! Appuie sur Redémarrer.");
}

// Gestion des touches
function handleKeyDown(e) {
    // TODO : changer la direction du Snake avec les flèches (éviter demi-tour direct)
    // Ex : direction = {x: 0, y: -1} pour haut
        if (e.key === "ArrowLeft" && nextDirection.x !== 1) nextDirection = {x: -1, y: 0};
        if (e.key === "ArrowRight" && nextDirection.x !== -1) nextDirection = {x: 1, y: 0};
        if (e.key === "ArrowUp" && nextDirection.y !== 1) nextDirection = {x: 0, y: -1};
        if (e.key === "ArrowDown" && nextDirection.y !== -1) nextDirection = {x: 0, y: 1};
      };

// Générer la nourriture aléatoirement
function spawnFood() {
    // TODO : placer la nourriture à une position libre
        let valid = false;
        do {
            food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        }
    }
        while(valid){
         !snake.some(segment => segment.x === food.x && segment.y === food.y);
        }
    
}
// Dessiner tout (snake, nourriture, score, etc.)
function draw() {
    // Effacer le canvas
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    // --- Affichage du Snake ---
    // TODO : afficher la tête et le corps du Snake avec des couleurs différentes
    // Style flat, couleurs fun
    // --- Affichage de la nourriture ---
    // TODO : dessiner la nourriture (bonus, malus si besoin)
    // Utiliser des couleurs différentes, forme cercle, étoile, etc.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach((cell, i) => {
        ctx.fillStyle = (i === 0) ? "#fcd34d" : "#34d399"; 
        ctx.fillRect(cell.x * gridSize, cell.y * gridSize, gridSize, gridSize);
    });
    
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    gridSize / 2.5, 0, Math.PI * 2
);
ctx.fill();
    
    // --- Affichage du score, niveau, vies ---
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    document.getElementById('lives').textContent = lives;

    // TODO : effets visuels en cas de bonus/malus/game over...
}

// Faire évoluer la vitesse et le niveau
function updateLevel() {
    // TODO : augmenter le niveau à chaque palier de score, accélérer la vitesse, jouer son bonus
        // Exemple : un niveau tous les 50 points
        const newLevel = Math.floor(score / 50) + 1;
    
        if (newLevel > level) {
            level = newLevel;
    
            // Réduire l'intervalle de déplacement (accélérer)
            moveInterval = Math.max(50, moveInterval - 20); // min 50ms pour éviter l'impossible
    
            // Redémarrer la boucle avec le nouvel intervalle
            clearInterval(moveTimer);
            moveTimer = setInterval(gameLoop, moveInterval);
            console.log("📈 Niveau augmenté :", level);
        };
    };

// Jouer un effet sonore
function playSound(type) {
    const sounds = {
        eat: document.getElementById('sound-eat'),
        bonus: document.getElementById('sound-bonus'),
        malus: document.getElementById('sound-malus'),
        gameover: document.getElementById('sound-gameover')
    };
    if (sounds[type]) {
        sounds[type].currentTime = 0;
        sounds[type].play();
    }
};





// TODO : fonctions bonus (pause, restart, options, murs, bonus/malus, animation, ...)

// === Fin du starter pack ===
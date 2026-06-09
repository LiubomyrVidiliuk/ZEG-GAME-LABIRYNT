const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

const imgPlayer = new Image();
imgPlayer.src = "gracz.png";

const imgKey = new Image();
imgKey.src = "key.png";

const imgDeath = new Image();
imgDeath.src = "death.png";

const imgDoors = new Image();
imgDoors.src = "doors.png";

const imgSpikes = new Image();
imgSpikes.src = "spikes.png";

const imgZagadka = new Image();
imgZagadka.src = "zagadka.png";

const imgDuch = new Image();
imgDuch.src = "duch.png";

const imgWyjscie = new Image();
imgWyjscie.src = "wyjscie.png";

const imgHp = new Image();
imgHp.src = "hp.png";

let gameStarted = false;
let gameOver = false;

const tileSize = 40;

let currentLevel = 1;
let levelMessage = "";

let walls = [];
let emptyTiles = [];
let deathItems = [];
let keyItems = [];
let collectedKeys = 0;

let doors = [];
let spikes = [];
let enemies = [];

function goFullScreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(err => console.log(err));
    }
    const gameScreenEl = document.querySelector(".game-screen");
    if (gameScreenEl) {
        gameScreenEl.style.position = "fixed";
        gameScreenEl.style.top = "0";
        gameScreenEl.style.left = "0";
        gameScreenEl.style.width = "100vw";
        gameScreenEl.style.height = "100vh";
        gameScreenEl.style.zIndex = "99";
        gameScreenEl.style.borderRadius = "0";
    }
    const modals = document.querySelectorAll(".modal");
    modals.forEach(m => m.style.zIndex = "99999");
}

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        const gameScreenEl = document.querySelector(".game-screen");
        if (gameScreenEl) {
            gameScreenEl.style.position = "relative";
            gameScreenEl.style.top = "";
            gameScreenEl.style.left = "";
            gameScreenEl.style.width = "70%";
            gameScreenEl.style.height = "370px";
            gameScreenEl.style.zIndex = "";
            gameScreenEl.style.borderRadius = "10px";
        }
    }
});

function generateWalls() {
    walls = [];
    emptyTiles = []; 

    const mazeLevel1 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
        [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1],
        [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1],
        [1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
        [1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1],
        [1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1],
        [1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1],
        [1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    const mazeLevel2 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    const mazeLevel3 = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
        [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
        [1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1],
        [1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    const levels = [mazeLevel1, mazeLevel2, mazeLevel3];
    const maze = levels[Math.min(currentLevel - 1, levels.length - 1)];

    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                walls.push({
                    x: col * tileSize,
                    y: row * tileSize,
                    width: tileSize,
                    height: tileSize
                });
            } else {
                if (!(col <= 2 && row <= 2) && !(col >= 27 && row >= 13)) {
                    emptyTiles.push({
                        x: col * tileSize,
                        y: row * tileSize
                    });
                }
            }
        }
    }

    doors = [];
    spikes = [];
    enemies = [];

    if (currentLevel === 1) {
        doors = [
            { x: 360, y: 120, width: 40, height: 40, opened: false },
            { x: 640, y: 200, width: 40, height: 40, opened: false }
        ];
        spikes = [
            { x: 120, y: 40 + 25, width: 40, height: 15 },
            { x: 120, y: 280 + 25, width: 40, height: 15 }
        ];
        enemies = [
            { x: 40, y: 525, width: 30, height: 30, speed: 2, direction: 1, minX: 40, maxX: 320 }
        ];
    } else if (currentLevel === 2) {
        doors = [
            { x: 600, y: 40, width: 40, height: 40, opened: false },
            { x: 400, y: 200, width: 40, height: 40, opened: false }
        ];
        spikes = [
            { x: 400, y: 120 + 25, width: 40, height: 15 },
            { x: 800, y: 120 + 25, width: 40, height: 15 }
        ];
        enemies = [
            { x: 100, y: 525, width: 30, height: 30, speed: 3, direction: 1, minX: 40, maxX: 1120 }
        ];
    } else if (currentLevel === 3) {
        doors = [
            { x: 280, y: 40, width: 40, height: 40, opened: false },
            { x: 600, y: 520, width: 40, height: 40, opened: false }
        ];
        spikes = [
            { x: 400, y: 520 + 25, width: 40, height: 15 },
            { x: 800, y: 520 + 25, width: 40, height: 15 }
        ];
        enemies = [
            { x: 40, y: 45, width: 30, height: 30, speed: 2, direction: 1, minX: 40, maxX: 200 },
            { x: 440, y: 205, width: 30, height: 30, speed: 4, direction: 1, minX: 440, maxX: 680 }
        ];
    }
}

function getRandomEmptySpot() {
    if (emptyTiles.length === 0) return null;
    const index = Math.floor(Math.random() * emptyTiles.length);
    const spot = emptyTiles[index];
    emptyTiles.splice(index, 1); 
    return spot;
}

function drawKeys() {
    for (let key of keyItems) {
        if (!key.active) continue;
        ctx.drawImage(imgKey, key.x - 12, key.y - 12, key.size + 24, key.size + 24);
    }
}

function drawDeathItem() {
    for (let item of deathItems) {
        if (!item.active) continue;
        ctx.drawImage(imgDeath, item.x - 10, item.y - 10, item.size + 20, item.size + 20);
    }
}

function generateDeathItem() {
    deathItems = [];
    for (let i = 0; i < 2; i++) {
        const spot = getRandomEmptySpot();
        if (spot) {
            deathItems.push({
                x: spot.x + (tileSize - 25) / 2,
                y: spot.y + (tileSize - 25) / 2,
                size: 25,
                active: true
            });
        }
    }
}

function generateKeys() {
    keyItems = [];
    for (let i = 0; i < 2; i++) {
        const spot = getRandomEmptySpot();
        if (spot) {
            keyItems.push({
                x: spot.x + (tileSize - 20) / 2,
                y: spot.y + (tileSize - 20) / 2,
                size: 20,
                active: true
            });
        }
    }
}

function checkDeathItem() {
    for (let item of deathItems) {
        if (!item.active) continue;
        if (
            player.x < item.x + item.size &&
            player.x + player.size > item.x &&
            player.y < item.y + item.size &&
            player.y + player.size > item.y
        ) {
            player.health = 0;
        }
    }
}

const finish = {
    x: 1120,
    y: 520,
    size: 40
};

const player = {
    x: 50,
    y: 50,
    size: 30,
    speed: 5,
    health: 100,
    maxHealth: 100
};

const keys = {};

document.addEventListener("keydown", function (event) {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", function (event) {
    keys[event.key.toLowerCase()] = false;
});

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector(".buttons button");
    if (startButton) {
        startButton.onclick = function () {
            goFullScreen();
            resetGame();
            generateWalls();
            generateHealthItem();
            generateRiddleItem();
            generateDeathItem();
            generateKeys();
            collectedKeys = 0;

            for (let door of doors) {
                 door.opened = false;
            }
            gameStarted = true;
        };
    }
});

const riddles = [
    { question: "5 + 7", answer: 12 },
    { question: "8 × 4", answer: 32 },
    { question: "36 ÷ 6", answer: 6 },
    { question: "15 - 8", answer: 7 },
    { question: "9 × 9", answer: 81 }
];

let currentRiddle = null;

function resetGame() {
    player.x = 50;
    player.y = 50;
    player.health = player.maxHealth;
    gameOver = false;
    currentLevel = 1;
}

function checkGameOver() {
    if (player.health <= 0) {
        player.health = 0;
        gameStarted = false;
        gameOver = true;
    }
}

function drawRiddleItem() {
    if (!riddleItem.active) return;
    ctx.drawImage(imgZagadka, riddleItem.x - 10, riddleItem.y - 10, riddleItem.size + 20, riddleItem.size + 20);
}

function drawGameOver() {
    if (!gameOver) return;
    ctx.fillStyle = "red";
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER", 300, 180);
}

const riddleItem = {
    x: 0,
    y: 0,
    size: 25,
    active: true
};

function generateRiddleItem() {
    const spot = getRandomEmptySpot();
    if (spot) {
        riddleItem.x = spot.x + (tileSize - riddleItem.size) / 2;
        riddleItem.y = spot.y + (tileSize - riddleItem.size) / 2;
        riddleItem.active = true;
    }
}

function checkRiddleItem() {
    if (!riddleItem.active) return;
    if (
        player.x < riddleItem.x + riddleItem.size &&
        player.x + player.size > riddleItem.x &&
        player.y < riddleItem.y + riddleItem.size &&
        player.y + player.size > riddleItem.y
    ) {
        riddleItem.active = false;
        currentRiddle = riddles[Math.floor(Math.random() * riddles.length)];
        
        const rq = document.getElementById("riddleQuestion");
        const ra = document.getElementById("riddleAnswer");
        const rr = document.getElementById("riddleResult");
        const rm = document.getElementById("riddleModal");
        
        if (rq) rq.innerText = currentRiddle.question;
        if (ra) ra.value = "";
        if (rr) rr.innerText = "";
        if (rm) rm.style.display = "block";
    }
}

function checkKeys() {
    for (let key of keyItems) {
        if (!key.active) continue;
        if (
            player.x < key.x + key.size &&
            player.x + player.size > key.x &&
            player.y < key.y + key.size &&
            player.y + player.size > key.y
        ) {
            key.active = false;
            collectedKeys++;
        }
    }
}

function drawKeysCounter() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Keys: " + collectedKeys, 850, 60);
}

// ОГРОМНЫЕ ДВЕРИ: увеличены в 3 раза (120x120 пикселей) и отцентрованы на -40px
function drawDoors() {
    for (let door of doors) {
        if (door.opened) continue;
        ctx.drawImage(imgDoors, door.x - 40, door.y - 40, door.width * 3, door.height * 3);
    }
}

function checkDoors() {
    for (let door of doors) {
        if (door.opened) continue;
        if (
            collectedKeys > 0 &&
            player.x < door.x + door.width &&
            player.x + player.size > door.x &&
            player.y < door.y + door.height &&
            player.y + player.size > door.y
        ) {
            collectedKeys--;
            door.opened = true;
        }
    }
}

function drawHealth() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("HP: " + player.health + "/" + player.maxHealth, 850, 30);
}

function checkWallCollision(x, y) {
    for (let wall of walls) {
        if (
            x < wall.x + wall.width &&
            x + player.size > wall.x &&
            y < wall.y + wall.height &&
            y + player.size > wall.y
        ) {
            return true;
        }
    }

    for (let door of doors) {
        if (door.opened) continue;
        if (
            x < door.x + door.width &&
            x + player.size > door.x &&
            y < door.y + door.height &&
            y + player.size > door.y
        ) {
            if (collectedKeys > 0) {
                collectedKeys--;
                door.opened = true;
                return false;
            }
            return true;
        }
    }
    return false;
}

function isAnyModalOpen() {
    const configModal = document.getElementById("configModal");
    const statsModal = document.getElementById("statsModal");
    const riddleModal = document.getElementById("riddleModal");

    return (
        (configModal && getComputedStyle(configModal).display !== "none") ||
        (statsModal && getComputedStyle(statsModal).display !== "none") ||
        (riddleModal && getComputedStyle(riddleModal).display !== "none")
    );
}

function drawSpikes() {
    for (let spike of spikes) {
        ctx.drawImage(imgSpikes, spike.x - 5, spike.y - 15, spike.width + 10, spike.height + 15);
    }
}

function movePlayer() {
    if (!gameStarted) return;

    if (isAnyModalOpen()) {
        keys["w"] = false;
        keys["a"] = false;
        keys["s"] = false;
        keys["d"] = false;
        return;
    }

    let nextX = player.x;
    let nextY = player.y;

    if (keys["w"]) nextY -= player.speed;
    if (keys["s"]) nextY += player.speed;
    if (!checkWallCollision(player.x, nextY)) {
        player.y = nextY;
    }

    if (keys["a"]) nextX -= player.speed;
    if (keys["d"]) nextX += player.speed;
    if (!checkWallCollision(nextX, player.y)) {
        player.x = nextX;
    }

    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.size > canvas.width) player.x = canvas.width - player.size;
    if (player.y + player.size > canvas.height) player.y = canvas.height - player.size;
}

const startPoint = {
    x: 40,
    y: 40,
    size: 40,
    color: "blue"
};

function drawStartPoint() {
    ctx.fillStyle = startPoint.color;
    ctx.fillRect(startPoint.x, startPoint.y, startPoint.size, startPoint.size);
}

function drawGrid() {
    ctx.strokeStyle = "#1f1f1f";
    for (let x = 0; x < canvas.width; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawWalls() {
    ctx.fillStyle = "#444";
    for (let wall of walls) {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }
}

function drawFinish() {
    ctx.drawImage(imgWyjscie, finish.x - 10, finish.y - 10, finish.size + 20, finish.size + 20);
}

function drawLevel() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Level: " + currentLevel, 20, 30);
}

function drawPlayer() {
    ctx.drawImage(imgPlayer, player.x - 10, player.y - 10, player.size + 20, player.size + 20);
}

function checkFinish() {
    if (
        player.x < finish.x + finish.size &&
        player.x + player.size > finish.x &&
        player.y < finish.y + finish.size &&
        player.y + player.size > finish.y
    ) {
        if (currentLevel >= 3) {
            gameStarted = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "lime";
            ctx.font = "50px Arial";
            ctx.fillText("YOU WIN", 350, 180);
            return;
        }

        currentLevel++;
        levelMessage = "Level " + currentLevel;

        generateWalls();
        generateHealthItem();
        generateRiddleItem();
        generateDeathItem();
        generateKeys();
        
        player.x = 50;
        player.y = 50;
    }
}

function drawLevelMessage() {
    ctx.fillStyle = "yellow";
    ctx.font = "26px Arial";
    ctx.fillText(levelMessage, 400, 40);
}

const healthItem = {
    x: 0,
    y: 0,
    size: 25,
    active: true
};

function drawHealthItem() {
    if (!healthItem.active) return;
    ctx.drawImage(imgHp, healthItem.x - 10, healthItem.y - 10, healthItem.size + 20, healthItem.size + 20);
}

function generateHealthItem() {
    const spot = getRandomEmptySpot();
    if (spot) {
        healthItem.x = spot.x + (tileSize - healthItem.size) / 2;
        healthItem.y = spot.y + (tileSize - healthItem.size) / 2;
        healthItem.active = true;
    }
}

function checkHealthItem() {
    if (!healthItem.active) return;
    if (
        player.x < healthItem.x + healthItem.size &&
        player.x + player.size > healthItem.x &&
        player.y < healthItem.y + healthItem.size &&
        player.y + player.size > healthItem.y
    ) {
        healthItem.active = false;
        player.health = Math.min(player.maxHealth, player.health + 20);
    }
}

let lastSpikeHit = 0;

function checkSpikes() {
    const now = Date.now();
    for (let spike of spikes) {
        if (
            player.x < spike.x + spike.width &&
            player.x + player.size > spike.x &&
            player.y < spike.y + spike.height &&
            player.y + player.size > spike.y
        ) {
            if (now - lastSpikeHit > 500) {
                player.health -= 10;
                lastSpikeHit = now;
            }
        }
    }
}

function updateStats() {
    const sLevel = document.getElementById("statLevel");
    const sHP = document.getElementById("statHP");
    const sKeys = document.getElementById("statKeys");
    
    if (sLevel) sLevel.innerText = currentLevel;
    if (sHP) sHP.innerText = player.health;
    if (sKeys) sKeys.innerText = collectedKeys;
}

function drawEnemy() {
    for (let e of enemies) {
        ctx.drawImage(imgDuch, e.x - 10, e.y - 10, e.width + 20, e.height + 20);
    }
}

function moveEnemy() {
    for (let e of enemies) {
        e.x += e.speed * e.direction;
        if (e.x < e.minX || e.x > e.maxX) {
            e.direction *= -1;
        }
    }
}

function checkEnemy() {
    for (let e of enemies) {
        if (
            player.x < e.x + e.width &&
            player.x + player.size > e.x &&
            player.y < e.y + e.height &&
            player.y + player.size > e.y
        ) {
            player.health -= 1;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    drawWalls();
    drawFinish();
    drawHealthItem();
    drawRiddleItem();
    drawDeathItem();
    drawDoors();
    drawEnemy();
    drawSpikes();
    drawKeys();
    drawStartPoint();
    drawLevel();
    drawHealth();
    drawKeysCounter();
    drawLevelMessage();

    movePlayer();
    moveEnemy();
    checkSpikes();
    checkEnemy();
    checkHealthItem();
    checkRiddleItem();
    checkDeathItem();
    checkKeys();
    checkGameOver();
    checkFinish();

    drawPlayer();
    drawGameOver();
    updateStats();

    requestAnimationFrame(gameLoop);
}

gameLoop();
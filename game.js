const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 370;

const startButton = document.querySelector(".buttons button");

let gameStarted = false;

const tileSize = 40;

let currentLevel = 1;
let levelMessage = "";

let walls = [];

function generateWalls() {

    walls = [];

    // tu losowe scian
    for (let i = 0; i < 6; i++) {

        const wall = {

            x: Math.floor(Math.random() * 20) * tileSize,

            y: Math.floor(Math.random() * 8) * tileSize,

            width: tileSize,

            height: Math.floor(Math.random() * 4 + 2) * tileSize

        };

        walls.push(wall);

    }

}

const finish = {
    x: 920,
    y: 280,
    size: 40,
    color: "gold"
};

const player = {
    x: 50,
    y: 50,
    size: 30,
    speed: 5,
    color: "lime"
};

const keys = {};

document.addEventListener("keydown", function (event) {

    keys[event.key.toLowerCase()] = true;

});

document.addEventListener("keyup", function (event) {

    keys[event.key.toLowerCase()] = false;

});

startButton.onclick = function () {

    resetGame();

    generateWalls();

    gameStarted = true;

};

function resetGame() {

    player.x = 50;
    player.y = 50;

}

function checkWallCollision(x, y) {

    // tutaj sprawdzenie kolizji
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

    return false;

}

function movePlayer() {

    if (!gameStarted) {
        return;
    }

    // nowa pozycja player
    let nextX = player.x;

    let nextY = player.y;

    if (keys["w"]) {
        nextY -= player.speed;
    }

    if (keys["s"]) {
        nextY += player.speed;
    }

    if (keys["a"]) {
        nextX -= player.speed;
    }

    if (keys["d"]) {
        nextX += player.speed;
    }

    // jeszli nie ma kolizji z scianiom
    if (!checkWallCollision(nextX, nextY)) {

        player.x = nextX;

        player.y = nextY;

    }

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.y < 0) {
        player.y = 0;
    }

    if (player.x + player.size > canvas.width) {
        player.x = canvas.width - player.size;
    }

    if (player.y + player.size > canvas.height) {
        player.y = canvas.height - player.size;
    }

}

// punk startowy
const startPoint = {
    x: 40,
    y: 40,
    size: 40,
    color: "blue"
};

function drawStartPoint() {

    // punkt startowy
    ctx.fillStyle = startPoint.color;

    ctx.fillRect(
        startPoint.x,
        startPoint.y,
        startPoint.size,
        startPoint.size
    );

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

    // to jest color scian
    ctx.fillStyle = "#444";

    for (let wall of walls) {

        ctx.fillRect(
            wall.x,
            wall.y,
            wall.width,
            wall.height
        );

    }

}

function drawFinish() {

    // kolor j
    ctx.fillStyle = finish.color;

    ctx.fillRect(
        finish.x,
        finish.y,
        finish.size,
        finish.size
    );

}

function drawLevel() {

    // poziom player
    ctx.fillStyle = "white";

    ctx.font = "20px Arial";

    ctx.fillText(
        "Level: " + currentLevel,
        20,
        30
    );

}

function drawPlayer() {

    ctx.fillStyle = player.color;

    ctx.fillRect(
        player.x,
        player.y,
        player.size,
        player.size
    );

}

function checkFinish() {

    if (
        player.x < finish.x + finish.size &&
        player.x + player.size > finish.x &&
        player.y < finish.y + finish.size &&
        player.y + player.size > finish.y
    ) {

        // nowypoziom
        currentLevel++;
        levelMessage = "nowe level";

        generateWalls();

        resetGame();

    }

}

function drawLevelMessage() {

    ctx.fillStyle = "yellow";

    ctx.font = "26px Arial";

    ctx.fillText(
        levelMessage,
        400,
        40
    );

}

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();

    // rysowanie sciand
    drawWalls();

    // dodanie punkta koncowego
    drawFinish();

    // startowy punkt
    drawStartPoint();

    // level
    drawLevel();
    drawLevelMessage();

    movePlayer();

    // sprawdzenie punkta koncowego
    checkFinish();

    drawPlayer();

    requestAnimationFrame(gameLoop);

}

gameLoop();
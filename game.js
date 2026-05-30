const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 370;

const startButton = document.querySelector(".buttons button");

let gameStarted = false;
let gameOver = false;

const tileSize = 40;

let currentLevel = 1;
let levelMessage = "";

let walls = [];

function generateWalls() {

    walls = [];

    const maze = [

        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,1,0,1,0,1,1,0,0,0,1,0,1,0,1,1,0,1,0,1,1,1,0,1],
        [1,0,1,0,0,0,0,1,1,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1],
        [1,0,1,1,1,1,0,1,0,0,1,1,1,0,1,1,0,1,1,0,1,1,1,0,1],
        [1,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,1],
        [1,1,1,1,0,1,1,1,1,0,0,1,0,1,1,1,0,1,0,1,1,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

    ];

    for (let row = 0; row < maze.length; row++) {

        for (let col = 0; col < maze[row].length; col++) {

            if (maze[row][col] === 1) {

                walls.push({

                    x: col * tileSize,
                    y: row * tileSize,
                    width: tileSize,
                    height: tileSize

                });

            }

        }

    }

}

const deathItems = [];

for (let i = 0; i < 2; i++) {

    deathItems.push({
        x: 0,
        y: 0,
        size: 25,
        color: "white",
        active: true
    });

}

let collectedKeys = 0;

const keyItems = [
    {
        x: 200,
        y: 80,
        size: 25,
        active: true
    },
    {
        x: 720,
        y: 240,
        size: 25,
        active: true
    }
];

function drawKeys() {

    ctx.fillStyle = "cyan";

    for (let key of keyItems) {

        if (!key.active) {
            continue;
        }

        ctx.fillRect(
            key.x,
            key.y,
            key.size,
            key.size
        );

    }

}

function drawDeathItem() {

    for (let item of deathItems) {

        if (!item.active) {
            continue;
        }

        ctx.fillStyle = item.color;

        ctx.fillRect(
            item.x,
            item.y,
            item.size,
            item.size
        );

    }

}

function generateDeathItem() {

    for (let item of deathItems) {

        let validPosition = false;

        while (!validPosition) {

            const randomX = Math.floor(Math.random() * 24) * tileSize;
            const randomY = Math.floor(Math.random() * 8) * tileSize;

            validPosition = true;

            for (let wall of walls) {

                if (
                    randomX < wall.x + wall.width &&
                    randomX + item.size > wall.x &&
                    randomY < wall.y + wall.height &&
                    randomY + item.size > wall.y
                ) {

                    validPosition = false;
                    break;

                }

            }

            const blockedItems = [
                healthItem,
                riddleItem,
                startPoint,
                finish
            ];

            for (let blocked of blockedItems) {

                if (
                    randomX < blocked.x + blocked.size &&
                    randomX + item.size > blocked.x &&
                    randomY < blocked.y + blocked.size &&
                    randomY + item.size > blocked.y
                ) {

                    validPosition = false;
                    break;

                }

            }

            if (validPosition) {

                item.x = randomX;
                item.y = randomY;

            }

        }

    }

}

function checkDeathItem() {

    for (let item of deathItems) {

        if (!item.active) {
            continue;
        }

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
    color: "lime",

    // dodanie zdrowie
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

startButton.onclick = function () {

    resetGame();

    generateWalls();

    generateHealthItem();

    generateRiddleItem();

    generateDeathItem();

    collectedKeys = 0;

    for (let key of keyItems) {
        key.active = true;
    }

    for (let door of doors) {
         door.opened = false;
    }

    gameStarted = true;

};

const riddles = [

    {
        question: "5 + 7",
        answer: 12
    },

    {
        question: "8 × 4",
        answer: 32
    },

    {
        question: "36 ÷ 6",
        answer: 6
    },

    {
        question: "15 - 8",
        answer: 7
    },

    {
        question: "9 × 9",
        answer: 81
    }

];

let currentRiddle = null;

function resetGame() {

    player.x = 50;
    player.y = 50;

    // reset health
    player.health = player.maxHealth;

    gameOver = false;

}

function checkGameOver() {

    if (player.health <= 0) {

        player.health = 0;

        currentLevel = 0;

        gameStarted = false;

        gameOver = true;

    }

}

function drawGameOver() {

    if (!gameOver) {
        return;
    }

    ctx.fillStyle = "red";

    ctx.font = "50px Arial";

    ctx.fillText(
        "GAME OVER",
        300,
        180
    );

}

const riddleItem = {

    x: 0,
    y: 0,
    size: 25,
    color: "purple",
    active: true

};

function drawRiddleItem() {

    if (!riddleItem.active) {
        return;
    }

    ctx.fillStyle = riddleItem.color;

    ctx.fillRect(
        riddleItem.x,
        riddleItem.y,
        riddleItem.size,
        riddleItem.size
    );

}

function generateRiddleItem() {

    let validPosition = false;

    while (!validPosition) {

        const randomX = Math.floor(Math.random() * 24) * tileSize;
        const randomY = Math.floor(Math.random() * 8) * tileSize;

        validPosition = true;

        for (let wall of walls) {

            if (
                randomX < wall.x + wall.width &&
                randomX + riddleItem.size > wall.x &&
                randomY < wall.y + wall.height &&
                randomY + riddleItem.size > wall.y
            ) {

                validPosition = false;
                break;

            }

        }

        if (
            validPosition &&
            randomX < healthItem.x + healthItem.size &&
            randomX + riddleItem.size > healthItem.x &&
            randomY < healthItem.y + healthItem.size &&
            randomY + riddleItem.size > healthItem.y
        ) {

            validPosition = false;

        }

        if (
            validPosition &&
            randomX < startPoint.x + startPoint.size &&
            randomX + riddleItem.size > startPoint.x &&
            randomY < startPoint.y + startPoint.size &&
            randomY + riddleItem.size > startPoint.y
        ) {

            validPosition = false;

        }

        if (validPosition) {

            riddleItem.x = randomX;
            riddleItem.y = randomY;
            riddleItem.active = true;

        }

    }

}

function checkRiddleItem() {

    if (!riddleItem.active) {
        return;
    }

    if (
        player.x < riddleItem.x + riddleItem.size &&
        player.x + player.size > riddleItem.x &&
        player.y < riddleItem.y + riddleItem.size &&
        player.y + player.size > riddleItem.y
    ) {

        riddleItem.active = false;

        currentRiddle =
            riddles[
                Math.floor(
                    Math.random() *
                    riddles.length
                )
            ];

        document.getElementById(
            "riddleQuestion"
        ).innerText =
            currentRiddle.question;

        document.getElementById(
            "riddleAnswer"
        ).value = "";

        document.getElementById(
            "riddleResult"
        ).innerText = "";

        document.getElementById(
            "riddleModal"
        ).style.display = "block";

    }

}

function checkKeys() {

    for (let key of keyItems) {

        if (!key.active) {
            continue;
        }

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

    ctx.fillText(
        "Keys: " + collectedKeys,
        850,
        60
    );

}

const doors = [

    {
        x: 360,
        y: 120,
        width: 40,
        height: 40,
        opened: false
    },

    {
        x: 640,
        y: 200,
        width: 40,
        height: 40,
        opened: false
    }

];

function drawDoors() {

    for (let door of doors) {

        if (door.opened) {
            continue;
        }

        ctx.fillStyle = "yellow";

        ctx.fillRect(
            door.x,
            door.y,
            door.width,
            door.height
        );

    }

}

function checkDoors() {

    for (let door of doors) {

        if (door.opened) {
            continue;
        }

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

// rysowanie zdorowia
function drawHealth() {

    ctx.fillStyle = "white";

    ctx.font = "20px Arial";

    ctx.fillText(
        "HP: " + player.health + "/" + player.maxHealth,
        850,
        30
    );

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

        if (door.opened) {
            continue;
        }

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
        generateHealthItem();

        generateRiddleItem();

        generateDeathItem();

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

const healthItem = {

    x: 0,
    y: 0,

    // wielkosc tego przedmiotu
    size: 25,

    color: "red",

    active: true

};

function drawHealthItem() {

    if (!healthItem.active) {
        return;
    }

    // kolor naszego przedmiotu
    ctx.fillStyle = healthItem.color;

    ctx.fillRect(
        healthItem.x,
        healthItem.y,
        healthItem.size,
        healthItem.size
    );

}

function generateHealthItem() {

    let validPosition = false;

    while (!validPosition) {

        const randomX = Math.floor(Math.random() * 24) * tileSize;
        const randomY = Math.floor(Math.random() * 8) * tileSize;

        validPosition = true;

        for (let wall of walls) {

            if (
                randomX < wall.x + wall.width &&
                randomX + healthItem.size > wall.x &&
                randomY < wall.y + wall.height &&
                randomY + healthItem.size > wall.y
            ) {

                validPosition = false;

                break;

            }

        }

        if (validPosition) {

            // tutaj jest nowa pozycja przedmiotu
            healthItem.x = randomX;
            healthItem.y = randomY;

            healthItem.active = true;
        }

    }

}

function checkHealthItem() {

    if (!healthItem.active) {
        return;
    }

    if (
        player.x < healthItem.x + healthItem.size &&
        player.x + player.size > healthItem.x &&
        player.y < healthItem.y + healthItem.size &&
        player.y + player.size > healthItem.y
    ) {

        // leczenie player
        player.health += 20;

        if (player.health > player.maxHealth) {

           player.health = player.maxHealth;

        }

        // schowanie apteczki
        healthItem.active = false;

    }

}

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    // rysowanie sciand
    drawWalls();

    // dodanie punkta koncowego
    drawFinish();

    // rysowanie przedmiotow
    drawHealthItem();

    // rysoawnie przedmiotu dla zagadek
    drawRiddleItem();

    // rysowanie death item
    drawDeathItem();

    // rysowanie drzwi
    drawDoors();

    // rysowanie kluczy
    drawKeys();

    // startowy punkt
    drawStartPoint();

    // level
    drawLevel();

    // rysowanie zdrowia
    drawHealth();

    // licznik kluczy
    drawKeysCounter();

    drawLevelMessage();

    movePlayer();

    // sprawdzenie przedmiotu apteczka
    checkHealthItem();

    checkRiddleItem();

    // sprawdzanie na death item
    checkDeathItem();

    // sprawdzenie zebrania klucza
    checkKeys();


    checkGameOver();

    // sprawdzenie punkta koncowego
    checkFinish();

    drawPlayer();

    drawGameOver();

    requestAnimationFrame(gameLoop);

}

gameLoop();
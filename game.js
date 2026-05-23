const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 370;

const startButton = document.querySelector(".buttons button");

let gameStarted = false;

<<<<<<< HEAD
const tileSize = 40;

let currentLevel = 1;

const walls = [];

const finish = {
    x: 920,
    y: 280,
    size: 40,
    color: "gold"
};

=======
>>>>>>> d5eacd2bb203d8738c706eb70cf89cde9c1786c2
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

    gameStarted = true;

};

function resetGame() {

    player.x = 50;
    player.y = 50;

}

function movePlayer() {

    if (!gameStarted) {
        return;
    }

    if (keys["w"]) {
        player.y -= player.speed;
    }

    if (keys["s"]) {
        player.y += player.speed;
    }

    if (keys["a"]) {
        player.x -= player.speed;
    }

    if (keys["d"]) {
        player.x += player.speed;
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

function drawPlayer() {

    ctx.fillStyle = player.color;

    ctx.fillRect(
        player.x,
        player.y,
        player.size,
        player.size
    );

}

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();

    drawPlayer();

    requestAnimationFrame(gameLoop);

}

gameLoop();
const menuMusic = new Audio('audio/dova_Carousel_master.mp3');
const gameMusic = new Audio('audio/MyVeryOwnDeadShip.ogg');

gameMusic.loop = true;
menuMusic.loop = true;
gameMusic.volume = 0.4;
menuMusic.volume = 0.4;

window.isMusicEnabled = true;
window.isSoundEnabled = true;

const openConfig = document.getElementById("openConfig");
const openStats = document.getElementById("openStats");
const configModal = document.getElementById("configModal");
const statsModal = document.getElementById("statsModal");
const closeConfig = document.getElementById("closeConfig");
const closeStats = document.getElementById("closeStats");
const riddleModal = document.getElementById("riddleModal");
const closeRiddle = document.getElementById("closeRiddle");

openConfig.onclick = function () {
    configModal.style.display = "block";
};

openStats.onclick = function () {
    statsModal.style.display = "block";
};

function closeModal(modal) {
    const modalContent = modal.querySelector(".modal-content");
    modalContent.classList.add("hide");
    setTimeout(function () {
        modal.style.display = "none";
        modalContent.classList.remove("hide");
    }, 300);
}

closeConfig.onclick = function () {
    closeModal(configModal);
};

closeStats.onclick = function () {
    closeModal(statsModal);
};

closeRiddle.onclick = function () {
    closeModal(riddleModal);
};

window.onclick = function (event) {
    if (event.target === configModal) closeModal(configModal);
    if (event.target === statsModal) closeModal(statsModal);
    if (event.target === riddleModal) closeModal(riddleModal);
};

const submitRiddle = document.getElementById("submitRiddle");

submitRiddle.onclick = function () {
    const answer = Number(document.getElementById("riddleAnswer").value);
    const result = document.getElementById("riddleResult");
    if (answer === currentRiddle.answer) {
        result.innerText = "Poprawna odpowiedź";
        setTimeout(function(){
            closeModal(riddleModal);
        }, 1000);
    } else {
        result.innerText = "Przegrana. Prawidłowa odpowiedź: " + currentRiddle.answer;
        player.health = 0;
        gameMusic.pause();
    }
};

const loadingScreen = document.getElementById("loadingScreen");
const startScreen = document.getElementById("startScreen");
const gameScreen = document.querySelector(".game-screen");
const uiButtons = document.querySelector(".buttons");
const playGameBtn = document.getElementById("playGameBtn");
const openConfigStart = document.getElementById("openConfigStart");

window.onload = function() {
    setTimeout(() => {
        loadingScreen.style.display = "none";
        startScreen.style.display = "flex";
        if (window.isMusicEnabled) {
            menuMusic.play().catch(e => console.log(e));
        }
    }, 1500); 
};

document.addEventListener('click', function startMusicOnFirstInteraction() {
    if (window.isMusicEnabled && startScreen.style.display === "flex" && menuMusic.paused && gameScreen.style.display !== "block") {
        menuMusic.play().catch(e => console.log(e));
    }
    document.removeEventListener('click', startMusicOnFirstInteraction);
}, { once: true });

playGameBtn.onclick = function() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    uiButtons.style.display = "flex";
    
    menuMusic.pause();
    if (window.isMusicEnabled) {
        gameMusic.currentTime = 0;
        gameMusic.play().catch(e => console.log(e));
    }
    
    const btn = document.querySelector(".buttons button");
    if (btn) btn.click(); 
};

openConfigStart.onclick = function() {
    configModal.style.display = "block";
};

const musicToggle = document.getElementById("musicToggle");
const soundToggle = document.getElementById("soundToggle");

if (musicToggle) {
    musicToggle.onchange = function() {
        window.isMusicEnabled = musicToggle.checked;
        if (!window.isMusicEnabled) {
            menuMusic.pause();
            gameMusic.pause();
        } else {
            if (gameScreen.style.display === "block") {
                gameMusic.play().catch(e => console.log(e));
            } else {
                menuMusic.play().catch(e => console.log(e));
            }
        }
    };
}

if (soundToggle) {
    soundToggle.onchange = function() {
        window.isSoundEnabled = soundToggle.checked;
    };
}

window.playHitSound = function() {};

const btn = document.querySelector(".buttons button");
if (btn) {
    btn.addEventListener("click", function() {
        menuMusic.pause();
        if (window.isMusicEnabled) {
            gameMusic.currentTime = 0;
            gameMusic.play().catch(e => console.log(e));
        }
    });
}
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

    if (event.target === configModal) {
        closeModal(configModal);
    }

    if (event.target === statsModal) {
        closeModal(statsModal);
    }

    if (event.target === riddleModal) {
        closeModal(riddleModal);
    }

};

const submitRiddle =
    document.getElementById(
        "submitRiddle"
    );

submitRiddle.onclick = function () {

    const answer =
        Number(
            document.getElementById(
                "riddleAnswer"
            ).value
        );

    const result =
        document.getElementById(
            "riddleResult"
        );

    if (
        answer ===
        currentRiddle.answer
    ) {

        result.innerText =
            "Poprawna odpowiedź";

        setTimeout(function(){

            closeModal(
                riddleModal
            );

        },1000);

    }

    else {

        result.innerText =
            "Przegrana. Prawidłowa odpowiedź: "
            + currentRiddle.answer;

        player.health = 0;

    }

};
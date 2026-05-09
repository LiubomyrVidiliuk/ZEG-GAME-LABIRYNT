const openConfig = document.getElementById("openConfig");
const openStats = document.getElementById("openStats");

const configModal = document.getElementById("configModal");
const statsModal = document.getElementById("statsModal");

const closeConfig = document.getElementById("closeConfig");
const closeStats = document.getElementById("closeStats");

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

window.onclick = function (event) {

    if (event.target === configModal) {
        closeModal(configModal);
    }

    if (event.target === statsModal) {
        closeModal(statsModal);
    }

};
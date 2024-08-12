export function openModal(modal) {
    modal.classList.add("fade-in");
    modal.showModal();
    setTimeout(() => modal.classList.remove("fade-in"), 250);
}

export function closeModalFadeOut(modal, nextButton, previousButton) {
    modal.classList.add("fade-out");
    setTimeout(() => {
        modal.classList.remove("fade-out");
        modal.close();
        window.removeEventListener("keydown", navigateImages);
        nextButton.removeEventListener("click", navigateImages);
        previousButton.removeEventListener("click", navigateImages);
    }, 250);
}

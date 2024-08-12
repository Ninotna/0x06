import { openModal, closeModalFadeOut } from './modal.js';
import { updateModalImage, getFileType } from './mediaHandler.js';
import { setupCarousel, navigateImages } from './carousel.js';

export function displayLightboxModal(e, photographerMediaArray) {
    e.preventDefault();
    const modalLightbox = document.querySelector(".lightbox__modal");
    openModal(modalLightbox);

    let imageFileName = e.currentTarget.children[0].getAttribute("src").split("/Posts photos/")[1];
    let postDescription = e.currentTarget.getAttribute("title");

    updateModalImage(imageFileName, postDescription);

    const { nextButton, previousButton } = setupCarousel(modalLightbox, photographerMediaArray, imageFileName);

    const closeModalButton = modalLightbox.querySelector(".lightbox__button-close-dialog");

    closeModalButton.addEventListener("click", () => closeModalFadeOut(modalLightbox, nextButton, previousButton));
}

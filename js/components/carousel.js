import { updateModalImage } from './mediaHandler.js';

export function setupCarousel(modalLightbox, mediaArray, currentFileName) {
    const nextButton = modalLightbox.querySelector(".lightbox__button-next");
    const previousButton = modalLightbox.querySelector(".lightbox__button-previous");

    const navigateImagesInModal = (event) => navigateImages(event, mediaArray, currentFileName);

    window.addEventListener("keydown", navigateImagesInModal);
    nextButton.addEventListener("click", navigateImagesInModal);
    previousButton.addEventListener("click", navigateImagesInModal);

    return { nextButton, previousButton };
}

export function navigateImages(event, mediaArray, currentFileName) {
    const arrayOfImageFileNames = mediaArray.map((post) => post.image || post.video);
    const arrayOfDescriptions = mediaArray.map((post) => post.title);

    const currentIndex = arrayOfImageFileNames.indexOf(currentFileName);
    const direction = event.key === "ArrowLeft" || event.currentTarget.children[0].classList.contains("fa-chevron-left") ? -1 : 1;
    const nextIndex = (currentIndex + direction + arrayOfImageFileNames.length) % arrayOfImageFileNames.length;

    updateModalImage(arrayOfImageFileNames[nextIndex], arrayOfDescriptions[nextIndex]);
}

export function updateModalImage(fileName, description) {
    const imageElement = document.querySelector(".lightbox__image");
    const videoElement = document.querySelector(".lightbox__video");
    const imageDescriptionElement = document.querySelector(".lightbox__post-description");

    const fileIsAPhotography = getFileType(fileName);

    if (fileIsAPhotography) {
        videoElement.classList.add("hide");
        imageElement.classList.remove("hide");
        imageElement.setAttribute("src", `../assets/images/Posts photos/${fileName}`);
    } else {
        imageElement.classList.add("hide");
        videoElement.classList.remove("hide");
        videoElement.setAttribute("src", `../assets/images/Posts photos/${fileName}`);
        videoElement.pause();
        videoElement.currentTime = 0;
    }

    imageDescriptionElement.textContent = description;
}

export function getFileType(fileName) {
    return /\.(jpg|jpeg|png|gif)$/i.test(fileName);
}

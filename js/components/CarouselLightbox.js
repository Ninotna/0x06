import { setupVideoEventHandlers } from '../utils/videoControls.js';

export class CarouselLightbox {
  constructor(modalSelector, mediaArray, photographerId) {
    this.carouselInfo = {
      direction: 0,
      actualIndex: 0,
      nextIndex: 0,
    };

    this.modalLightbox = document.querySelector(modalSelector);
    this.photographerMediaArray = mediaArray;
    this.photographerId = photographerId;

    this.imageUrl = "";
    this.imageFileName = "";
    this.postDescription = "";

    this.init();
  }

  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    const nextButton = this.modalLightbox.querySelector(".lightbox__button-next");
    const previousButton = this.modalLightbox.querySelector(".lightbox__button-previous");
    const closeModalButton = this.modalLightbox.querySelector(".lightbox__button-close-modal");

    window.addEventListener("keydown", (event) => this.handleKeydown(event));
    nextButton.addEventListener("click", (event) => this.navigateImagesInModal(event));
    previousButton.addEventListener("click", (event) => this.navigateImagesInModal(event));
    closeModalButton.addEventListener("click", () => this.closeModalAndRemoveEventListeners());

    this.setupVideoControls();
  }

  setupVideoControls() {
    const videoElement = this.modalLightbox.querySelector(".lightbox__media-container video.lightbox__media");
    if (videoElement) {
      setupVideoEventHandlers(videoElement);
    }
  }

  handleKeydown(event) {
    const videoElement = this.modalLightbox.querySelector(".lightbox__media-container video.lightbox__media");
    
    if (videoElement && !videoElement.classList.contains("hide")) {
      // Si la vidéo est visible dans la lightbox, gérer les commandes vidéo et les flèches de navigation
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        this.navigateImagesInModal(event);
      } else {
        this.handleVideoControls(event, videoElement);
      }
    } else {
      // Si aucune vidéo n'est visible, gérer les commandes de navigation
      this.navigateImages;
      // Si aucune vidéo n'est visible, gérer les commandes de navigation
      this.navigateImagesInModal(event);
          }
        }

  handleVideoControls(event, videoElement) {
    switch (event.key) {
      case ' ':
      case 'Spacebar':
        event.preventDefault();
        this.togglePlayPause(videoElement);
        break;
      case 'm':
        this.toggleMute(videoElement);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.increaseVolume(videoElement);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.decreaseVolume(videoElement);
        break;
      case 'f':
        this.toggleFullscreen(videoElement);
        break;
      default:
        break;
    }
  }

  togglePlayPause(videoElement) {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }

  toggleMute(videoElement) {
    videoElement.muted = !videoElement.muted;
  }

  increaseVolume(videoElement) {
    videoElement.volume = Math.min(videoElement.volume + 0.1, 1);
  }

  decreaseVolume(videoElement) {
    videoElement.volume = Math.max(videoElement.volume - 0.1, 0);
  }

  toggleFullscreen(videoElement) {
    if (!document.fullscreenElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  displayLightboxModal(e) {
    e.preventDefault();
    this.modalLightbox.classList.add("fade-in");
    this.modalLightbox.showModal();
    setTimeout(() => {
      this.modalLightbox.classList.remove("fade-in");
    }, 250);

    const clickedMediaElement = e.currentTarget.querySelector("img, video");
    const mediaType = clickedMediaElement.tagName.toLowerCase();
    const mediaUrl = clickedMediaElement.getAttribute("src");

    if (mediaUrl) {
      const mediaFileName = mediaUrl.split(`/assets/media/${this.photographerId}/`)[1];
      const postDescription = clickedMediaElement.getAttribute("alt") || e.currentTarget.getAttribute("title");

      this.updateModalImage(this.photographerId, mediaFileName, postDescription, mediaType);
      this.imageFileName = mediaFileName;
      this.postDescription = postDescription;
    } else {
      console.error("L'attribut 'src' n'a pas été trouvé sur l'élément sélectionné.");
    }
  }

  navigateImagesInModal(event) {
    const arrayOfImageFileNames = this.photographerMediaArray.map((post) => post.image || post.video);
    const arrayOfDescriptions = this.photographerMediaArray.map((post) => post.title);

    if (event.key) {
      this.changeImage(arrayOfImageFileNames, this.imageFileName, event.key, arrayOfDescriptions);
    } else {
      this.changeImage(arrayOfImageFileNames, this.imageFileName, event, arrayOfDescriptions);
    }
  }

  changeImage(arrayOfImageFileNames, currentImageFileName, event, arrayOfDescriptions) {
    let currentIndex = arrayOfImageFileNames.indexOf(currentImageFileName);
    let direction;

    if (typeof event === "string") {
      direction = event.includes("ArrowLeft") ? -1 : 1;
    } else {
      direction = event.currentTarget.classList.contains("lightbox__button-previous") ? -1 : 1;
    }

    let newIndex = (currentIndex + direction + arrayOfImageFileNames.length) % arrayOfImageFileNames.length;
    const nextImageFileName = arrayOfImageFileNames[newIndex];
    const nextPostDescription = arrayOfDescriptions[newIndex];

    const mediaType = nextImageFileName.endsWith(".mp4") ? "video" : "img";
    this.imageFileName = nextImageFileName;
    this.postDescription = nextPostDescription;

    this.updateModalImage(this.photographerId, nextImageFileName, nextPostDescription, mediaType);
  }

  updateModalImage(photographerId, newMediaFileName, newPostDescription, mediaType) {
    const mediaPath = `./assets/media/${photographerId}/${newMediaFileName}`;
    const imageElement = this.modalLightbox.querySelector(".lightbox__media-container img.lightbox__media");
    const videoElement = this.modalLightbox.querySelector(".lightbox__media-container video.lightbox__media");
    const imageDescriptionElement = this.modalLightbox.querySelector(".lightbox__post-description");

    if (imageElement && videoElement && imageDescriptionElement) {
      if (mediaType === "img") {
        imageElement.classList.remove("hide");
        videoElement.classList.add("hide");
        imageElement.setAttribute("src", mediaPath);
      } else if (mediaType === "video") {
        videoElement.classList.remove("hide");
        imageElement.classList.add("hide");
        videoElement.setAttribute("src", mediaPath);
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }

    if (imageDescriptionElement) {
      imageDescriptionElement.textContent = newPostDescription;
    } else {
      console.error("Un ou plusieurs éléments n'ont pas été trouvés dans la lightbox.");
    }
  }

  closeModalAndRemoveEventListeners() {
    window.removeEventListener("keydown", (event) => this.handleKeydown(event));
    const nextButton = this.modalLightbox.querySelector(".lightbox__button-next");
    const previousButton = this.modalLightbox.querySelector(".lightbox__button-previous");

    nextButton.removeEventListener("click", (event) => this.navigateImagesInModal(event));
    previousButton.removeEventListener("click", (event) => this.navigateImagesInModal(event));

    this.closeModalFadeOut(this.modalLightbox);
  }

  closeModalFadeOut(modal) {
    modal.classList.add("fade-out");
    setTimeout(() => {
      modal.classList.remove("fade-out");
      modal.close();
    }, 250);
  }
}

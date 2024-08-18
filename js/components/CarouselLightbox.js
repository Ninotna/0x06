// CarouselLightbox.js

export class CarouselLightbox {
  /* Gère le carrousel et la modale lightbox */
  constructor(modalSelector, mediaArray, photographerId) {
    // Initialisation des informations du carrousel
    this.carouselInfo = {
      direction: 0, // Direction du défilement (1 pour suivant, -1 pour précédent)
      actualIndex: 0, // Index de l'image ou vidéo actuelle
      nextIndex: 0, // Index de l'image ou vidéo suivante
    };

    // Sélection de la modale lightbox dans le DOM
    this.modalLightbox = document.querySelector(modalSelector);
    this.photographerMediaArray = mediaArray;
    this.photographerId = photographerId; // Assignation de photographerId

    // Variables pour l'URL de l'image, le nom du fichier et la description du post
    this.imageUrl = "";
    this.imageFileName = "";
    this.postDescription = "";

    // Initialisation du carrousel
    this.init();
  }

  // Méthode d'initialisation
  init() {
    // Ajout des écouteurs d'événements
    this.addEventListeners();
  }

  // Ajoute les écouteurs d'événements pour la navigation et la fermeture de la modale
  addEventListeners() {
    const nextButton = this.modalLightbox.querySelector(
      ".lightbox__button-next"
    );
    const previousButton = this.modalLightbox.querySelector(
      ".lightbox__button-previous"
    );
    const closeModalButton = this.modalLightbox.querySelector(
      ".lightbox__button-close-modal"
    );

    // Navigation avec les flèches du clavier
    window.addEventListener("keydown", (event) =>
      this.navigateImagesInModal(event)
    );

    // Navigation avec les boutons suivant et précédent
    nextButton.addEventListener("click", (event) =>
      this.navigateImagesInModal(event)
    );
    previousButton.addEventListener("click", (event) =>
      this.navigateImagesInModal(event)
    );

    // Fermeture de la modale
    closeModalButton.addEventListener("click", () =>
      this.closeModalAndRemoveEventListeners()
    );
  }

  // Affiche la modale lightbox
  displayLightboxModal(e) {
    console.log("Lightbox ouverte"); // Pour vérifier que la fonction est bien déclenchée
    e.preventDefault(); // Empêche l'action par défaut du lien ou bouton cliqué
    this.modalLightbox.classList.add("fade-in"); // Ajoute une classe pour l'animation d'apparition
    this.modalLightbox.showModal(); // Affiche la modale
    setTimeout(() => {
      this.modalLightbox.classList.remove("fade-in"); // Retire la classe après l'animation
    }, 250);

    const clickedMediaElement = e.currentTarget.querySelector("img, video");
    const mediaType = clickedMediaElement.tagName.toLowerCase(); // 'img' ou 'video'
    const mediaUrl = clickedMediaElement.getAttribute("src");

    if (mediaUrl) {
      const mediaFileName = mediaUrl.split(
        `/assets/media/${this.photographerId}/`
      )[1];
      const postDescription =
        clickedMediaElement.getAttribute("alt") ||
        e.currentTarget.getAttribute("title");

      // Met à jour l'image ou la vidéo et la description dans la modale
      this.updateModalImage(
        this.photographerId,
        mediaFileName,
        postDescription,
        mediaType
      );

      // Mise à jour des variables de l'objet
      this.imageFileName = mediaFileName;
      this.postDescription = postDescription;
    } else {
      console.error(
        "L'attribut 'src' n'a pas été trouvé sur l'élément sélectionné."
      );
    }
  }

  // Navigation entre les images/vidéos dans la modale
  navigateImagesInModal(event) {
    // Création des tableaux des noms de fichiers et descriptions
    let arrayOfImageFileNames = this.photographerMediaArray.map((post) => {
      return post.image || post.video;
    });

    // console.log("Current Image/Video:", this.imageFileName);
    // console.log("Array of File Names:", arrayOfImageFileNames);

    let arrayOfDescriptions = this.photographerMediaArray.map((post) => {
      return post.title;
    });

    // Navigation en fonction de l'événement (touche du clavier ou bouton cliqué)
    if (event.key) {
      this.changeImage(
        arrayOfImageFileNames,
        this.imageFileName,
        event.key,
        arrayOfDescriptions
      );
    } else {
      this.changeImage(
        arrayOfImageFileNames,
        this.imageFileName,
        event,
        arrayOfDescriptions
      );
    }
  }

  // Change l'image/vidéo affichée dans la modale
  changeImage(
	arrayOfImageFileNames,
	currentImageFileName,
	event,
	arrayOfDescriptions
  ) {
	// Récupère l'index de l'image/vidéo actuelle
	let currentIndex = arrayOfImageFileNames.indexOf(currentImageFileName);
  
	let direction;
  
	// Détermine la direction en fonction de l'événement (touche du clavier ou bouton cliqué)
	if (typeof event === "string") {
	  direction = event.includes("ArrowLeft") ? -1 : 1;
	} else {
	  direction = event.currentTarget.classList.contains(
		"lightbox__button-previous"
	  )
		? -1
		: 1;
	}
  
	// Calcul du nouvel index avec gestion circulaire
	let newIndex =
	  (currentIndex + direction + arrayOfImageFileNames.length) %
	  arrayOfImageFileNames.length;
  
	// DEBUG: Vérifiez les valeurs des index et du fichier à afficher
	// console.log("Current Index:", currentIndex);
	// console.log("New Index:", newIndex);
	// console.log("Next Image/Video:", arrayOfImageFileNames[newIndex]);
	// console.log("Next Description:", arrayOfDescriptions[newIndex]);
  
	const nextImageFileName = arrayOfImageFileNames[newIndex];
	const nextPostDescription = arrayOfDescriptions[newIndex];
  
	// Détermine le type de média en fonction de l'extension du fichier
	const mediaType = nextImageFileName.endsWith(".mp4") ? "video" : "img";
  
	// Met à jour l'index actuel et les autres variables avec la nouvelle image/vidéo
	this.imageFileName = nextImageFileName; // Mettez à jour this.imageFileName avec la nouvelle image/vidéo
	this.postDescription = nextPostDescription;
  
	// Met à jour la lightbox avec la nouvelle image ou vidéo
	this.updateModalImage(
	  this.photographerId,
	  nextImageFileName,
	  nextPostDescription,
	  mediaType
	);
  }
  
  // Met à jour l'image/vidéo et la description dans la modale
  updateModalImage(
    PhotographerId,
    newMediaFileName,
    newPostDescription,
    mediaType
  ) {
    const mediaPath = `./assets/media/${PhotographerId}/${newMediaFileName}`;
    const imageElement = this.modalLightbox.querySelector(
      ".lightbox__media-container img.lightbox__media"
    );
    const videoElement = this.modalLightbox.querySelector(
      ".lightbox__media-container video.lightbox__media"
    );
    const imageDescriptionElement = this.modalLightbox.querySelector(
      ".lightbox__post-description"
    );

	 // DEBUG: Vérifiez que les éléments sont trouvés
	//  console.log({ imageElement, videoElement, imageDescriptionElement });
	//  console.log({mediaType});

    // Vérifier que les éléments existent avant de les manipuler
    if (imageElement && videoElement && imageDescriptionElement) {
      if (mediaType === "img") {
        imageElement.classList.remove("hide");
        videoElement.classList.add("hide");
        imageElement.setAttribute("src", mediaPath);
		// console.log("Image src updated to:", imageElement.src); // Vérification de la mise à jour du src
      } else if (mediaType === "video") {
        videoElement.classList.remove("hide");
        imageElement.classList.add("hide");
        videoElement.setAttribute("src", mediaPath);
        videoElement.pause();
        videoElement.currentTime = 0;
		// console.log("Video src updated to:", videoElement.src); // Vérification de la mise à jour du src
      }
    }

    if (imageDescriptionElement) {
      imageDescriptionElement.textContent = newPostDescription;
    } else {
        console.error("Un ou plusieurs éléments n'ont pas été trouvés dans la lightbox.");
        console.log({imageElement, videoElement, imageDescriptionElement}); // Debugging: affiche les éléments trouvés
    }
  }

  // Ferme la modale et retire les écouteurs d'événements
  closeModalAndRemoveEventListeners() {
    window.removeEventListener("keydown", (event) =>
      this.navigateImagesInModal(event)
    ); // Retire l'écouteur d'événements pour le clavier
    const nextButton = this.modalLightbox.querySelector(
      ".lightbox__button-next"
    );
    const previousButton = this.modalLightbox.querySelector(
      ".lightbox__button-previous"
    );

    nextButton.removeEventListener("click", (event) =>
      this.navigateImagesInModal(event)
    ); // Retire l'écouteur d'événements pour le bouton suivant
    previousButton.removeEventListener("click", (event) =>
      this.navigateImagesInModal(event)
    ); // Retire l'écouteur d'événements pour le bouton précédent

    this.closeModalFadeOut(this.modalLightbox); // Ferme la modale avec une animation de fade-out
  }

  // Ferme la modale avec une animation de fade-out
  closeModalFadeOut(modal) {
    modal.classList.add("fade-out"); // Ajoute une classe pour l'animation de disparition
    setTimeout(() => {
      modal.classList.remove("fade-out"); // Retire la classe après l'animation
      modal.close(); // Ferme la modale
    }, 250); // Délai de 250 ms correspondant à la durée de l'animation
  }
}

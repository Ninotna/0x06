export class CarouselLightbox
{
	/* Gère le carrousel et la modale lightbox */
	constructor(modalSelector, mediaArray, photographerId)
	{
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
	init()
	{
		// Ajout des écouteurs d'événements
		this.addEventListeners();
	}

	// Ajoute les écouteurs d'événements pour la navigation et la fermeture de la modale
	addEventListeners()
	{
		const nextButton = this.modalLightbox.querySelector(".lightbox__button-next");
		const previousButton = this.modalLightbox.querySelector(".lightbox__button-previous");
		const closeModalButton = this.modalLightbox.querySelector(".lightbox__button-close-dialog");

		// Navigation avec les flèches du clavier
		window.addEventListener("keydown", (event) => this.navigateImagesInModal(event));

		// Navigation avec les boutons suivant et précédent
		nextButton.addEventListener("click", (event) => this.navigateImagesInModal(event));
		previousButton.addEventListener("click", (event) => this.navigateImagesInModal(event));

		// Fermeture de la modale
		closeModalButton.addEventListener("click", () => this.closeModalAndRemoveEventListeners());
	}

	// Affiche la modale lightbox
	displayLightboxModal(e) 
	{
		e.preventDefault(); // Empêche l'action par défaut du lien ou bouton cliqué
		this.modalLightbox.classList.add("fade-in"); // Ajoute une classe pour l'animation d'apparition
		this.modalLightbox.showModal(); // Affiche la modale
		setTimeout(() => {
			this.modalLightbox.classList.remove("fade-in"); // Retire la classe après l'animation
		}, 250);
	
		// Récupère le nom de fichier et la description de l'image/vidéo cliquée
		const imageUrl = e.currentTarget.children[0].getAttribute("src"); // Obtient l'URL de l'image/vidéo cliquée
		const imageFileName = imageUrl.split(`/assets/media/${this.photographerId}/`)[1]; // Extrait le nom du fichier à partir de l'URL
		const postDescription = e.currentTarget.getAttribute("title"); // Obtient la description du post
	
		// Met à jour l'image et la description dans la modale en utilisant PhotographerId
		this.updateModalImage(this.photographerId, imageFileName, postDescription);

		// Mise à jour des variables de l'objet
		this.imageFileName = imageFileName;
		this.postDescription = postDescription;
	}

	// Navigation entre les images/vidéos dans la modale
	navigateImagesInModal(event)
	{
		// Création des tableaux des noms de fichiers et descriptions
		let arrayOfImageFileNames = this.photographerMediaArray.map((post) =>
		{
			return post.image || post.video;
		});

		console.log("Current Image/Video:", this.imageFileName);
    	console.log("Array of File Names:", arrayOfImageFileNames);

		let arrayOfDescriptions = this.photographerMediaArray.map((post) =>
		{
			return post.title;
		});

		// Navigation en fonction de l'événement (touche du clavier ou bouton cliqué)
		if (event.key)
		{
			this.changeImage(arrayOfImageFileNames, this.imageFileName, event.key, arrayOfDescriptions);
		}
		else
		{
			this.changeImage(arrayOfImageFileNames, this.imageFileName, event, arrayOfDescriptions);
		}
	}

	// Change l'image/vidéo affichée dans la modale
	changeImage(arrayOfImageFileNames, currentImageFileName, event, arrayOfDescriptions)
	{
		// Récupère l'index de l'image/vidéo actuelle
		let currentIndex = arrayOfImageFileNames.indexOf(currentImageFileName);
		console.log("Current Index:", currentIndex);

		let direction;

		// Détermine la direction en fonction de l'événement (touche du clavier ou bouton cliqué)
		if (typeof event === "string") {
			direction = event.includes("ArrowLeft") ? -1 : 1;
		} else {
			direction = event.currentTarget.classList.contains("lightbox__button-previous") ? -1 : 1;
		}

		console.log("Direction:", direction);

		// Calcul du nouvel index avec gestion circulaire
		let newIndex = (currentIndex + direction + arrayOfImageFileNames.length) % arrayOfImageFileNames.length;

		console.log("New Index:", newIndex);

		const nextImageFileName = arrayOfImageFileNames[newIndex];
		const nextPostDescription = arrayOfDescriptions[newIndex];

		// Met à jour l'index actuel et les autres variables avec la nouvelle image/vidéo
		this.imageFileName = nextImageFileName; // Mettez à jour this.imageFileName avec la nouvelle image/vidéo
		this.postDescription = nextPostDescription;

		// Met à jour la lightbox avec la nouvelle image ou vidéo
		this.updateModalImage(this.photographerId, nextImageFileName, nextPostDescription);
	}


	// Met à jour l'image/vidéo et la description dans la modale
	updateModalImage(PhotographerId, newImageFileName, newPostDescription)
	{
		const imageElement = this.modalLightbox.querySelector(".lightbox__image"); // Sélectionne l'élément image
		const videoElement = this.modalLightbox.querySelector(".lightbox__video"); // Sélectionne l'élément vidéo
		const imageDescriptionElement = this.modalLightbox.querySelector(".lightbox__post-description"); // Sélectionne l'élément de description du post

		// Vérifiez que l'élément de description existe avant de continuer
		if (imageDescriptionElement) {
			console.log({ newImageFileName, newPostDescription }); // Affiche les nouvelles informations dans la console
			let fileIsAPhotography = /\.(jpg|jpeg|png|gif)$/i.test(newImageFileName); // Vérifie si le fichier est une image

			// Chemin d'accès au média avec PhotographerId
			const mediaPath = `./assets/media/${PhotographerId}/${newImageFileName}`;

			if (fileIsAPhotography) {
				if (imageElement) {
					imageElement.classList.remove("hide"); // Affiche l'élément image
					videoElement.classList.add("hide"); // Masque l'élément vidéo
					imageElement.setAttribute("src", mediaPath); // Met à jour l'URL de l'image
				} else {
					console.error("L'élément image n'a pas été trouvé dans la lightbox.");
				}
			} else {
				if (videoElement) {
					videoElement.classList.remove("hide"); // Affiche l'élément vidéo
					imageElement.classList.add("hide"); // Masque l'élément image
					videoElement.setAttribute("src", mediaPath); // Met à jour l'URL de la vidéo
					videoElement.pause(); // Stoppe la lecture de la vidéo si elle est en cours
					videoElement.currentTime = 0; // Réinitialise la vidéo au début
				} else {
					console.error("L'élément vidéo n'a pas été trouvé dans la lightbox.");
				}
			}

			// Met à jour la description du post
			imageDescriptionElement.textContent = newPostDescription;
		} else {
			console.error("L'élément de description n'a pas été trouvé dans la lightbox.");
		}
	}


	// Ferme la modale et retire les écouteurs d'événements
	closeModalAndRemoveEventListeners()
	{
		window.removeEventListener("keydown", (event) => this.navigateImagesInModal(event)); // Retire l'écouteur d'événements pour le clavier
		const nextButton = this.modalLightbox.querySelector(".lightbox__button-next");
		const previousButton = this.modalLightbox.querySelector(".lightbox__button-previous");

		nextButton.removeEventListener("click", (event) => this.navigateImagesInModal(event)); // Retire l'écouteur d'événements pour le bouton suivant
		previousButton.removeEventListener("click", (event) => this.navigateImagesInModal(event)); // Retire l'écouteur d'événements pour le bouton précédent

		this.closeModalFadeOut(this.modalLightbox); // Ferme la modale avec une animation de fade-out
	}

	// Ferme la modale avec une animation de fade-out
	closeModalFadeOut(modal)
	{
		modal.classList.add("fade-out"); // Ajoute une classe pour l'animation de disparition
		setTimeout(() =>
		{
			modal.classList.remove("fade-out"); // Retire la classe après l'animation
			modal.close(); // Ferme la modale
		}, 250); // Délai de 250 ms correspondant à la durée de l'animation
	}
}

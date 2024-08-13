export class CarouselLightbox
{
	/* Gère le carrousel et la modale lightbox */
	constructor(modalSelector, mediaArray)
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
		e.preventDefault(); // Empêche le comportement par défaut du lien ou bouton cliqué
		this.modalLightbox.classList.add("fade-in"); // Ajoute une classe pour l'animation d'apparition
		this.modalLightbox.showModal(); // Affiche la modale
		setTimeout(() =>
		{
			this.modalLightbox.classList.remove("fade-in"); // Retire la classe après l'animation
		}, 250);

		// Création des tableaux des noms de fichiers et descriptions
		let arrayOfImageFileNames = this.photographerMediaArray.map((post) =>
		{
			return post.image || post.video; // Récupère le nom du fichier image ou vidéo
		});

		let arrayOfDescriptions = this.photographerMediaArray.map((post) =>
		{
			return post.title; // Récupère le titre du post
		});

		// Récupère les informations de l'image/vidéo cliquée
		this.imageUrl = e.currentTarget.children[0].getAttribute("src");
		this.imageFileName = this.imageUrl.split("/Posts photos/")[1];
		this.postDescription = e.currentTarget.getAttribute("title");

		// Met à jour l'image et la description dans la modale
		this.updateModalImage(this.imageFileName, this.postDescription);
	}

	// Navigation entre les images/vidéos dans la modale
	navigateImagesInModal(event)
	{
		// Création des tableaux des noms de fichiers et descriptions
		let arrayOfImageFileNames = this.photographerMediaArray.map((post) =>
		{
			return post.image || post.video;
		});

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
		this.carouselInfo.actualIndex = arrayOfImageFileNames.indexOf(currentImageFileName); // Récupère l'index de l'image/vidéo actuelle

		// Détermine la direction en fonction de l'événement (flèche gauche/droite ou bouton cliqué)
		if (typeof event !== "string")
		{
			this.carouselInfo.direction = event.currentTarget.children[0].classList.contains("fa-chevron-left") ? -1 : 1;
		}
		else
		{
			this.carouselInfo.direction = event.includes("ArrowLeft") ? -1 : 1;
		}

		// Vérifie si l'utilisateur est à la première ou dernière image
		let userClicksNextOnLastImage = this.carouselInfo.direction + this.carouselInfo.actualIndex > arrayOfImageFileNames.length - 1;
		let userClicksPreviousOnFirstImage = this.carouselInfo.direction + this.carouselInfo.actualIndex < 0;

		// Met à jour l'index suivant en fonction de la direction et des limites (boucle)
		if (userClicksNextOnLastImage)
		{
			this.carouselInfo.nextIndex = 0;
		}
		else if (userClicksPreviousOnFirstImage)
		{
			this.carouselInfo.nextIndex = arrayOfImageFileNames.length - 1;
		}
		else
		{
			this.carouselInfo.nextIndex = this.carouselInfo.direction + this.carouselInfo.actualIndex;
		}

		// Met à jour les variables avec les nouvelles informations de l'image/vidéo suivante
		let nextImageFileName = arrayOfImageFileNames[this.carouselInfo.nextIndex];
		let nextPostDescription = arrayOfDescriptions[this.carouselInfo.nextIndex];

		this.imageFileName = nextImageFileName;
		this.postDescription = nextPostDescription;

		// Met à jour l'interface utilisateur avec la nouvelle image/vidéo et sa description
		this.updateModalImage(nextImageFileName, nextPostDescription);
	}

// Met à jour l'image/vidéo et la description dans la modale
updateModalImage(newImageFileName, newPostDescription)
{
    const imageElement = this.modalLightbox.querySelector(".lightbox__image"); // Sélectionne l'élément image
    const videoElement = this.modalLightbox.querySelector(".lightbox__video"); // Sélectionne l'élément vidéo
    const imageDescriptionElement = this.modalLightbox.querySelector(".lightbox__post-description"); // Sélectionne l'élément de description du post

    // Vérifiez que les éléments existent avant de modifier leurs propriétés
    if (imageElement && videoElement && imageDescriptionElement)
    {
        console.log({ newImageFileName, newPostDescription }); // Affiche les nouvelles informations dans la console
        let fileIsAPhotography = /\.(jpg|jpeg|png|gif)$/i.test(newImageFileName); // Vérifie si le fichier est une image

        if (fileIsAPhotography)
        {
            // Si le fichier est une image
            videoElement.classList.add("hide"); // Masque l'élément vidéo
            imageElement.classList.remove("hide"); // Affiche l'élément image
            imageElement.setAttribute(
                "src",
                `../assets/images/Posts photos/${newImageFileName}` // Met à jour l'URL de l'image
            );
        }
        else
        {
            // Si le fichier est une vidéo
            imageElement.classList.add("hide"); // Masque l'élément image
            videoElement.classList.remove("hide"); // Affiche l'élément vidéo
            videoElement.setAttribute(
                "src",
                `../assets/images/Posts photos/${newImageFileName}` // Met à jour l'URL de la vidéo
            );
            videoElement.pause(); // Stoppe la lecture de la vidéo si elle est en cours
            videoElement.currentTime = 0; // Réinitialise la vidéo au début
        }

        // Met à jour la description de l'image/vidéo
        imageDescriptionElement.textContent = newPostDescription;
    }
    else
    {
        console.error("Un ou plusieurs éléments de la lightbox sont introuvables dans le DOM.");
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

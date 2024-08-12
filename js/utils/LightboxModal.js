const carouselInfo = {
    direction: 0, // Indique la direction du défilement (1 pour suivant, -1 pour précédent)
    actualIndex: 0, // Index de l'image ou de la vidéo actuellement affichée
    nextIndex: 0, // Index de l'image ou de la vidéo suivante à afficher
  };
  
  // Sélection de la modale lightbox dans le DOM
  const modalLightbox = document.querySelector(".lightbox__modal");
  let imageUrl = ""; // URL de l'image actuelle
  let imageFileName = ""; // Nom du fichier image actuel
  let postDescription = ""; // Description actuelle du post (titre)
  
  function displayLightboxModal(e) {
    e.preventDefault(); // Empêche l'action par défaut du lien ou bouton cliqué
    modalLightbox.classList.add("fade-in"); // Ajoute une classe pour l'animation d'apparition
    modalLightbox.showModal(); // Affiche la modale
    setTimeout(() => {
      modalLightbox.classList.remove("fade-in"); // Retire la classe après l'animation
    }, 250);
  
    console.log(e.target); // Affiche dans la console l'élément cible de l'événement
    console.log(this); // Affiche dans la console l'objet qui a déclenché l'événement
  
    // Crée un tableau contenant les noms des fichiers d'image ou de vidéo
    let arrayOfImageFileNames = photographerMediaArray.map((post) => {
      return post.image || post.video; // Retourne le nom du fichier image ou vidéo
    });
  
    // Crée un tableau contenant les descriptions des posts
    let arrayOfDescriptions = photographerMediaArray.map((post) => {
      return post.title; // Retourne le titre du post
    });
  
    console.table(arrayOfImageFileNames); // Affiche les noms de fichiers sous forme de tableau dans la console
  
    // Récupère l'URL, le nom de fichier, et la description de l'image cliquée
    imageUrl = e.currentTarget.children[0].getAttribute("src"); // Obtient l'URL de l'image/vidéo cliquée
    imageFileName = imageUrl.split("/Posts photos/")[1]; // Extrait le nom du fichier à partir de l'URL
    postDescription = e.currentTarget.getAttribute("title"); // Obtient la description du post
  
    console.log({ imageUrl, imageFileName, postDescription }); // Affiche les informations récupérées dans la console
    console.log(
      "Index of image: ",
      arrayOfImageFileNames.indexOf(imageFileName) < 0 ? "Not found" : "found!",
      ", value = ",
      arrayOfImageFileNames.indexOf(imageFileName) // Affiche l'index de l'image si elle est trouvée dans le tableau
    );
  
    // Met à jour l'image et la description dans la modale
    updateModalImage(imageFileName, postDescription);
  
    // Sélectionne les boutons suivant et précédent dans la modale
    const nextButton = modalLightbox.querySelector(".lightbox__button-next"); // Bouton suivant
    const previousButton = modalLightbox.querySelector(".lightbox__button-previous"); // Bouton précédent
  
    // Fonction pour naviguer entre les images dans la modale
    const navigateImagesInModal = (event) => {
      if (event.key) {
        // Vérifie si l'événement a une touche associée (clavier)
        event.key === "ArrowLeft"
          ? console.log(
              "%cLeft",
              "padding: 5px; color: black; background: yellow; font-size: 16px" // Affiche une indication visuelle si la flèche gauche est pressée
            )
          : console.log(
              "%cRight",
              "padding: 5px; color: white; background: blue; font-size: 16px" // Affiche une indication visuelle si la flèche droite est pressée
            );
        // Change l'image en fonction de la touche pressée
        changeImage(
          arrayOfImageFileNames,
          imageFileName,
          event.key,
          arrayOfDescriptions
        );
      } else {
        // Change l'image en fonction du bouton cliqué (suivant ou précédent)
        changeImage(
          arrayOfImageFileNames,
          imageFileName,
          event,
          arrayOfDescriptions
        );
      }
    };
  
    // Ajoute des écouteurs d'événements pour naviguer entre les images avec le clavier ou les boutons
    window.addEventListener("keydown", navigateImagesInModal); // Navigation avec les flèches du clavier
    nextButton.addEventListener("click", navigateImagesInModal); // Navigation avec le bouton suivant
    previousButton.addEventListener("click", navigateImagesInModal); // Navigation avec le bouton précédent
  
    // Sélectionne le bouton pour fermer la modale
    const closeModalButton = modalLightbox.querySelector(".lightbox__button-close-dialog");
  
    // Fonction pour fermer la modale et supprimer les écouteurs d'événements
    const closeModalAndRemoveEventListeners = () => {
      window.removeEventListener("keydown", navigateImagesInModal); // Retire l'écouteur d'événements pour le clavier
      nextButton.removeEventListener("click", navigateImagesInModal); // Retire l'écouteur d'événements pour le bouton suivant
      previousButton.removeEventListener("click", navigateImagesInModal); // Retire l'écouteur d'événements pour le bouton précédent
      closeModalFadeOut(modalLightbox); // Ferme la modale avec une animation de fade-out
    };
    closeModalButton.addEventListener("click", closeModalAndRemoveEventListeners); // Ajoute un écouteur pour fermer la modale
  }
  
  // Fonction qui ferme la modale avec une animation de fade-out
  function closeModalFadeOut(modal) {
    modal.classList.add("fade-out"); // Ajoute une classe pour l'animation de disparition
    setTimeout(() => {
      modal.classList.remove("fade-out"); // Retire la classe après l'animation
      modal.close(); // Ferme la modale
    }, 250); // Délai de 250 ms correspondant à la durée de l'animation
  }
  
  // Fonction qui change l'image affichée dans la modale lightbox
  function changeImage(
    arrayOfImageFileNames,
    currentImageFileName,
    event,
    arrayOfDescriptions
  ) {
    carouselInfo.actualIndex =
      arrayOfImageFileNames.indexOf(currentImageFileName); // Récupère l'index de l'image/vidéo actuelle
  
    console.table(arrayOfImageFileNames); // Affiche le tableau des noms de fichiers dans la console
  
    // Détermine la direction en fonction de la touche pressée ou du bouton cliqué
    if (typeof event !== "string") {
      carouselInfo.direction = event.currentTarget.children[0].classList.contains(
        "fa-chevron-left"
      )
        ? -1 // Direction -1 si bouton précédent (flèche gauche)
        : 1; // Direction 1 si bouton suivant (flèche droite)
    } else {
      carouselInfo.direction = event.includes("ArrowLeft") ? -1 : 1; // Direction déterminée par la touche du clavier
    }
  
    // Vérifie si l'utilisateur essaie d'aller au-delà de la première ou dernière image
    let userClicksNextOnLastImage =
      carouselInfo.direction + carouselInfo.actualIndex >
      arrayOfImageFileNames.length - 1;
  
    let userClicksPreviousOnFirstImage =
      carouselInfo.direction + carouselInfo.actualIndex < 0;
  
    // Met à jour l'index suivant en fonction des conditions limites (boucle)
    if (userClicksNextOnLastImage) {
      carouselInfo.nextIndex = 0; // Si c'est la dernière image, retourne à la première
    } else if (userClicksPreviousOnFirstImage) {
      carouselInfo.nextIndex = arrayOfImageFileNames.length - 1; // Si c'est la première image, retourne à la dernière
    } else {
      carouselInfo.nextIndex = carouselInfo.direction + carouselInfo.actualIndex; // Sinon, avance ou recule d'une image
    }
    console.log({ carouselInfo }); // Affiche les informations du carousel dans la console
  
    // Met à jour les variables avec les nouvelles informations de l'image ou vidéo suivante
    let nextImageFileName = arrayOfImageFileNames[carouselInfo.nextIndex];
    let nextPostDescription = arrayOfDescriptions[carouselInfo.nextIndex];
  
    imageFileName = nextImageFileName; // Met à jour le nom de fichier de l'image
    postDescription = nextPostDescription; // Met à jour la description du post
  
    console.group("Carousel info + image & description of the next post"); // Groupe les logs pour la nouvelle image/vidéo
    console.log(carouselInfo);
    console.log({ nextImageFileName, nextPostDescription });
    console.groupEnd("Carousel info + image & description of the next post");
  
    // Met à jour l'interface utilisateur avec la nouvelle image/vidéo et sa description
    updateModalImage(
      arrayOfImageFileNames[carouselInfo.nextIndex],
      arrayOfDescriptions[carouselInfo.nextIndex]
    );
  }
  
  // Met à jour l'image/vidéo et la description dans la modale
  function updateModalImage(newImageFileName, newPostDescription) {
    const imageElement = document.querySelector(".lightbox__image"); // Sélectionne l'élément image
    const videoElement = document.querySelector(".lightbox__video"); // Sélectionne l'élément vidéo
    const imageDescriptionElement = document.querySelector(
      ".lightbox__post-description"
    ); // Sélectionne l'élément de description du post
  
    console.log({ newImageFileName, newPostDescription }); // Affiche les nouvelles informations dans la console
    let fileIsAPhotography = /\.(jpg|jpeg|png|gif)$/i.test(newImageFileName); // Vérifie si le fichier est une image
  
    if (fileIsAPhotography) {
      // Si le fichier est une image
      videoElement.classList.add("hide"); // Masque l'élément vidéo
      imageElement.classList.remove("hide"); // Affiche l'élément image
      imageElement.setAttribute(
        "src",
        `../assets/images/Posts photos/${newImageFileName}` // Met à jour l'URL de l'image
      );
    } else {
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
  
    imageDescriptionElement.textContent = newPostDescription; // Met à jour la description de l'image/vidéo
  }
  
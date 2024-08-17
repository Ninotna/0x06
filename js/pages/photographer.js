// photographer.js

// Importation des modules et classes nécessaires pour cette page
import PhotographersApi from "../apis/photographersApi.js";
import PhotographerProfileTemplate from "../templates/photographerProfile.js";
import getParameter from "../utils/getParameters.js";
import { PhotographerFactory } from "../factories/media.js";
import {
  getUserInfos,
  getPostsOfUser,
  cleanUpEventListeners,
} from "../utils/photographerUtils.js";
import {
  ContactModal,
  ContactFormBuilder,
} from "../components/ContactModal.js";
import { CarouselLightbox } from "../components/CarouselLightbox.js";
import {
  getTotalLikes,
  getPhotographerPrice,
  increaseLike,
} from "../utils/photographerData.js";
import {
  sortByLikes,
  sortByDate,
  sortByTitle,
} from "../utils/photographerSort.js";

// Déclaration de la classe principale pour gérer la page du photographe
class PhotographerApp {
  constructor() {
    // Création d'une instance de PhotographersApi pour accéder aux données des photographes et de leurs publications
    this.usersDataApi = new PhotographersApi(
      "http://127.0.0.1:5500/v1.2/data/photographers.json"
    );
  }

  // Méthode principale asynchrone pour récupérer les données des photographes à partir de l'API
  async main() {
    try {
      // Appel à l'API pour récupérer les données des photographes
      const photosData = await this.usersDataApi.getPhotos();
      return photosData;
    } catch (error) {
      // Gestion des erreurs en cas d'échec de la récupération des données
      console.error("Échec de la récupération des données :", error);
      return { error: true, message: error.message };
    }
  }

  // Méthode statique qui met à jour l'interface utilisateur avec les publications du photographe
  static changeUIOfPosts(dataArray, photographerName, container) {
    container.innerHTML = ""; // Réinitialiser le conteneur des médias
    dataArray.forEach((postData) => {
      postData.name = photographerName;
      const type = postData.image ? "image" : "video";
      const postElement = new PhotographerFactory(postData, type);
      container.appendChild(postElement);
    });
  }

  // Méthode statique qui met à jour l'interface utilisateur avec les informations du profil du photographe
  static changeUIOfProfile(dataObject, profileContainer) {
    PhotographerProfileTemplate.updateProfileUI(dataObject, profileContainer);
  }

  // Méthode pour mettre à jour dynamiquement le nombre de likes et le prix quotidien
  static updateLikesAndPrice(photographerId, mediaArray, photographers) {
    const totalLikes = getTotalLikes(mediaArray, photographerId);
    const photographerPrice = getPhotographerPrice(
      photographers,
      photographerId
    );

    console.log(photographerPrice);

    // Vérifiez si le prix du photographe a été trouvé
    if (photographerPrice !== null) {
      document.querySelector(
        ".main__likes p"
      ).innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;
      document.querySelector(
        ".main__daily-cost p"
      ).textContent = `${photographerPrice}€ / jour`;
    } else {
      console.error(
        "Le prix du photographe n'a pas pu être récupéré. Vérifiez les données des photographes."
      );
    }
  }
  static handleLikeClicks(mediaArray, photographerId) {
    const likeButtons = document.querySelectorAll(".images__post-like-button");

    likeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const mediaId = parseInt(
          event.currentTarget.closest(".images__post-container").dataset.postId
        );

        // Augmente le nombre de likes pour le média cliqué
        const newLikeCount = increaseLike(mediaArray, mediaId);

        if (newLikeCount !== null) {
          // Met à jour le DOM pour afficher le nouveau nombre de likes
          event.currentTarget.innerHTML = `${newLikeCount} <i class="fa-solid fa-heart"></i>`;

          // Recalculer et mettre à jour le nombre total de likes affiché sur la page
          const totalLikes = getTotalLikes(mediaArray, photographerId);
          document.querySelector(
            ".main__likes p"
          ).innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i>`;
        }
      });
    });
  }

  static handleSortChange(
    mediaArray,
    photographerName,
    postsContainer,
    carousel
  ) {
    const sortSelect = document.getElementById("select");

    sortSelect.addEventListener("change", () => {
      let sortedArray;
      switch (sortSelect.value) {
        case "popularité":
          sortedArray = sortByLikes(mediaArray);
          break;
        case "date":
          sortedArray = sortByDate(mediaArray);
          break;
        case "titre":
          sortedArray = sortByTitle(mediaArray);
          break;
        default:
          sortedArray = mediaArray; // Aucun tri spécifique, affiche l'ordre original
      }

      // Met à jour l'affichage des posts
      PhotographerApp.changeUIOfPosts(
        sortedArray,
        photographerName,
        postsContainer
      );

      // Met à jour l'ordre des images dans la lightbox
      carousel.photographerMediaArray = sortedArray;

      // Réattacher les écouteurs d'événements pour chaque post afin d'ouvrir la lightbox
      postsContainer.querySelectorAll(".post-class").forEach((postElement) => {
        postElement.addEventListener("click", (e) => {
          carousel.displayLightboxModal(e);
        });
      });
    });
  }
}

// Initialisation de l'application des photographes
const launchPhotographerApp = new PhotographerApp().main();

// Sélection des conteneurs HTML où les informations du profil et les publications seront affichées
const profileContainer = document.querySelector(".main__profile-wrapper");
const postsContainer = document.querySelector(".images");

// Récupération de l'ID du photographe depuis les paramètres de l'URL
const urlPhotographerId = Number(getParameter("id"));

// Gestion des données une fois récupérées
launchPhotographerApp.then((data) => {
  if (data.error) {
    console.error("Erreur lors de la récupération des données :", data.message);
    return;
  }

  const { photographers, media } = data;

  // Récupération des informations du photographe sélectionné
  const photographerObject = getUserInfos(photographers, urlPhotographerId);

  // Récupération des publications du photographe sélectionné
  const photographerMediaArray = getPostsOfUser(media, urlPhotographerId);

  // Nettoie les anciens écouteurs d'événements avant de mettre à jour l'interface
  cleanUpEventListeners();

  // Mise à jour de l'interface utilisateur
  PhotographerApp.changeUIOfProfile(photographerObject, profileContainer);
  PhotographerApp.changeUIOfPosts(
    photographerMediaArray,
    photographerObject.name,
    postsContainer
  );

  // Mise à jour du nombre de likes et du prix quotidien
  const photographersCopy = [...photographers]; // Copie superficielle du tableau
  PhotographerApp.updateLikesAndPrice(
    urlPhotographerId,
    photographerMediaArray,
    photographersCopy
  );

  // Gestion des clics sur les icônes de cœur
  PhotographerApp.handleLikeClicks(photographerMediaArray, urlPhotographerId);

  // Initialisation de la modale de contact avec le nom complet du photographe
  const contactModal = new ContactModal(".contact__modal");

  // Ajouter un écouteur d'événement au bouton de contact pour ouvrir la modale
  const contactButton = document.querySelector(".contact-button");
  contactButton.addEventListener("click", () => {
    contactModal.displayContactModal(photographerObject.name);
  });

  // Initialisation du CarouselLightbox avec les données du photographe
  const carousel = new CarouselLightbox(
    ".lightbox__modal",
    photographerMediaArray
  );

  carousel.photographerId = urlPhotographerId; // Assurez-vous de définir cela

  // Ajouter un écouteur d'événement pour chaque post (image/vidéo) afin d'afficher la lightbox au clic
  postsContainer.querySelectorAll(".post-class").forEach((postElement) => {
    postElement.addEventListener("click", (e) => {
      carousel.displayLightboxModal(e);
    });
  });

  // Gestion du tri
  PhotographerApp.handleSortChange(
    photographerMediaArray,
    photographerObject.name,
    postsContainer,
    carousel
  );
});

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
import { ContactModal, ContactFormBuilder } from "../components/ContactModal.js";
import { CarouselLightbox } from "../components/CarouselLightbox.js";
import {
  getTotalLikes,
  getPhotographerPrice,
  increaseLike,
} from "../utils/photographerData.js";

// Importation des fonctions de tri depuis sortUtils.js
import {
  sortPostsForMobile,
  setItemNameAccessible,
  sortPostsForWidescreens,
  setItemName,
  sortPosts,
} from "../utils/sortUtils.js";

// Déclaration de la classe principale pour gérer la page du photographe
class PhotographerApp {
  constructor() {
    this.usersDataApi = new PhotographersApi(
      "http://127.0.0.1:5500/v1.2/data/photographers.json"
    );
  }

  // Méthode principale asynchrone pour récupérer les données des photographes à partir de l'API
  async main() {
    try {
      const photosData = await this.usersDataApi.getPhotos();
      return photosData;
    } catch (error) {
      console.error("Échec de la récupération des données :", error);
      return { error: true, message: error.message };
    }
  }

  static changeUIOfPosts(dataArray, photographerName, container) {
    container.innerHTML = "";
    dataArray.forEach((postData) => {
      postData.name = photographerName;
      const type = postData.image ? "image" : "video";
      const postElement = new PhotographerFactory(postData, type);
      container.appendChild(postElement);
    });
  }

  static changeUIOfProfile(dataObject, profileContainer) {
    PhotographerProfileTemplate.updateProfileUI(dataObject, profileContainer);
  }

  static updateLikesAndPrice(photographerId, mediaArray, photographers) {
    const totalLikes = getTotalLikes(mediaArray, photographerId);
    const photographerPrice = getPhotographerPrice(photographers, photographerId);

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

        const newLikeCount = increaseLike(mediaArray, mediaId);

        if (newLikeCount !== null) {
          event.currentTarget.innerHTML = `${newLikeCount} <i class="fa-solid fa-heart"></i>`;

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

    sortSelect.addEventListener("change", function () {
      sortPostsForMobile.call(this, PhotographerApp.sortPostsByProperty);
    });

    const sortButton = document.querySelector(".dropdown-menu__sort-button");
    sortButton.addEventListener("click", function () {
      sortPostsForWidescreens.call(this, PhotographerApp.sortPostsByProperty);
    });

    const dropdownMenuItems = document.querySelectorAll(
      ".dropdown-menu__list-item"
    );
    dropdownMenuItems.forEach((item) => {
      item.addEventListener("click", function () {
        setItemName.call(this, PhotographerApp.sortPostsByProperty);
      });
      item.addEventListener("keypress", setItemNameAccessible);
    });
  }

  static sortPostsByProperty(postsArray, property) {
    switch (property) {
      case "popularité":
        return sortByLikes(postsArray);
      case "date":
        return sortByDate(postsArray);
      case "titre":
        return sortByTitle(postsArray);
      default:
        return postsArray;
    }
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

  const photographerObject = getUserInfos(photographers, urlPhotographerId);
  const photographerMediaArray = getPostsOfUser(media, urlPhotographerId);

  cleanUpEventListeners();

  PhotographerApp.changeUIOfProfile(photographerObject, profileContainer);
  PhotographerApp.changeUIOfPosts(
    photographerMediaArray,
    photographerObject.name,
    postsContainer
  );

  const photographersCopy = [...photographers];
  PhotographerApp.updateLikesAndPrice(
    urlPhotographerId,
    photographerMediaArray,
    photographersCopy
  );

  PhotographerApp.handleLikeClicks(photographerMediaArray, urlPhotographerId);

  const contactModal = new ContactModal(".contact__modal");

  const contactButton = document.querySelector(".contact-button");
  contactButton.addEventListener("click", () => {
    contactModal.displayContactModal(photographerObject.name);
  });

  const carousel = new CarouselLightbox(
    ".lightbox__modal",
    photographerMediaArray
  );

  carousel.photographerId = urlPhotographerId;

  postsContainer.querySelectorAll(".post-class").forEach((postElement) => {
    postElement.addEventListener("click", (e) => {
      carousel.displayLightboxModal(e);
    });
  });

  PhotographerApp.handleSortChange(
    photographerMediaArray,
    photographerObject.name,
    postsContainer,
    carousel
  );
});

// photographer.js

// Importation des modules et classes nécessaires pour cette page
import PhotographersApi from "../apis/photographersApi.js";
import PhotographerProfileTemplate from "../templates/photographerProfile.js";
import getParameter from "../utils/getParameters.js";
import { PhotographerFactory } from "../factories/media.js";
import { getUserInfos, getPostsOfUser } from "../utils/photographerUtils.js";
import { ContactModal } from "../components/ContactModal.js";
import { CarouselLightbox } from "../components/CarouselLightbox.js";
import { 
    getTotalLikes, 
    getPhotographerPrice, 
    increaseLike 
} from "../utils/photographerData.js";
import { 
    sortPostsByProperty, 
    sortPostsForDesktop
} from "../utils/photographerSort.js";
import { cleanUpEventListeners, createElement } from "../utils/domUtils.js";

// Déclaration de la classe pour gérer la récupération des données des photographes
class PhotographerDataFetcher {
    constructor(apiUrl) {
        this.usersDataApi = new PhotographersApi(apiUrl);
    }

    async fetchData() {
        try {
            const photosData = await this.usersDataApi.getPhotos();
            return photosData;
        } catch (error) {
            console.error("Échec de la récupération des données :", error);
            return { error: true, message: error.message };
        }
    }
}

// Déclaration de la classe pour gérer les mises à jour de l'interface utilisateur
class PhotographerUIManager {
    static updatePostsUI(dataArray, photographerName, container, carousel) {
        if (!container) {
            console.error("Le conteneur pour les publications n'a pas été trouvé.");
            return;
        }
        container.innerHTML = "";
        dataArray.forEach((postData) => {
            postData.name = photographerName;
            const type = postData.image ? "image" : "video";
            const postElement = new PhotographerFactory(postData, type);
            container.appendChild(postElement);
        });

        const postsContainer = container.querySelectorAll(".post-class");
        postsContainer.forEach((postElement) => {
            postElement.addEventListener("click", (e) => {
                carousel.displayLightboxModal(e);
            });
            postElement.addEventListener("touchstart", (e) => {
                carousel.displayLightboxModal(e);
            });
        });
    }

    static updateProfileUI(dataObject, profileContainer) {
        PhotographerProfileTemplate.updateProfileUI(dataObject, profileContainer);
    }

    static updateLikesAndPrice(photographerId, mediaArray, photographers) {
        const totalLikes = getTotalLikes(mediaArray, photographerId);
        const photographerPrice = getPhotographerPrice(photographers, photographerId);

        if (photographerPrice !== null) {
            PhotographerUIManager.updateElementContent(
                ".main__likes p",
                `${totalLikes} <i class="fa-solid fa-heart"></i>`
            );
            PhotographerUIManager.updateElementContent(
                ".main__daily-cost p",
                `${photographerPrice}€ / jour`
            );
        } else {
            console.error(
                "Le prix du photographe n'a pas pu être récupéré. Vérifiez les données des photographes."
            );
        }
    }

    static updateElementContent(selector, content) {
        document.querySelector(selector).innerHTML = content;
    }
}

// Déclaration de la classe pour gérer les événements de l'application
class PhotographerEventHandler {
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
                    PhotographerUIManager.updateElementContent(
                        ".main__likes p",
                        `${totalLikes} <i class="fa-solid fa-heart"></i>`
                    );
                }
            });
        });
    }

    static handleSortChange(mediaArray, photographerName, postsContainer, carousel) {
        if (!mediaArray || !photographerName || !postsContainer || !carousel) {
            console.error("One or more required variables are undefined:", {
                mediaArray,
                photographerName,
                postsContainer,
                carousel
            });
            return; // Ne pas exécuter le code si l'une des variables est indéfinie
        }
        const sortSelect = document.getElementById("select");

        sortSelect.addEventListener("change", function () {
            const sortedArray = sortPostsByProperty(mediaArray, this.value);
            PhotographerUIManager.updatePostsUI(
                sortedArray,
                photographerName,
                postsContainer,
                carousel
            );
        });

        const sortButton = document.querySelector(".dropdown-menu__sort-button");
        sortButton.addEventListener("click", function () {
            const sortedArray = sortPostsByProperty(
                mediaArray,
                this.innerText.toLowerCase()
            );
            PhotographerUIManager.updatePostsUI(
                sortedArray,
                photographerName,
                postsContainer,
                carousel
            );
        });

        const dropdownMenuItems = document.querySelectorAll(
            ".dropdown-menu__list-item"
        );

        dropdownMenuItems.forEach((item) => {
            item.addEventListener("click", function () {
                PhotographerEventHandler.setItemName(
                    item, // Passe l'élément cliqué directement
                    sortPostsByProperty,
                    mediaArray,
                    photographerName,
                    postsContainer,
                    carousel
                );
            });

            item.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    PhotographerEventHandler.setItemName(
                        event.target,  // Passe l'élément déclencheur directement
                        sortPostsByProperty,
                        mediaArray,
                        photographerName,
                        postsContainer,
                        carousel
                    );
                }
            });
        });
    }

    static setItemName(element, sortFunction, photographerMediaArray, photographerName, postsContainer, carousel) {
        const itemElement = element;
        const buttonElement = document.querySelector(".dropdown-menu__sort-button");

        // Met à jour le texte du bouton de tri avec le nom de l'élément sélectionné
        buttonElement.textContent = itemElement.innerText;

        const sortedArray = sortFunction(photographerMediaArray, itemElement.innerText.toLowerCase());

        // Met à jour l'interface utilisateur avec les éléments triés
        PhotographerUIManager.updatePostsUI(
            sortedArray,
            photographerName,
            postsContainer,
            carousel
        );
    }
}




// Classe principale pour gérer l'application des photographes
class PhotographerApp {
    constructor() {
        this.dataFetcher = new PhotographerDataFetcher(
            "http://127.0.0.1:5500/v1.2/data/photographers.json"
        );
        this.photographerMediaArray = [];
        this.photographerName = '';
        this.postsContainer = null;
        this.carousel = null;
    }

    async init() {
        const data = await this.dataFetcher.fetchData();
        if (data.error) {
            PhotographerUIManager.updateElementContent(
                ".error-message",
                "Erreur lors de la récupération des données."
            );
            return;
        }

        const { photographers, media } = data;
        const urlPhotographerId = Number(getParameter("id"));
        const photographerObject = getUserInfos(photographers, urlPhotographerId);
        this.photographerMediaArray = getPostsOfUser(media, urlPhotographerId);
        this.photographerName = photographerObject.name;

        if (!Array.isArray(this.photographerMediaArray)) {
            console.error("photographerMediaArray is not initialized correctly:", this.photographerMediaArray);
            return;
        }

        cleanUpEventListeners();

        this.profileContainer = document.querySelector(".main__profile-wrapper");
        this.postsContainer = document.querySelector(".images");

        this.carousel = new CarouselLightbox(
            ".lightbox__modal",
            this.photographerMediaArray
        );
        this.carousel.photographerId = urlPhotographerId;

        PhotographerUIManager.updateProfileUI(photographerObject, this.profileContainer);

        PhotographerUIManager.updatePostsUI(
            this.photographerMediaArray,
            this.photographerName,
            this.postsContainer,
            this.carousel
        );

        PhotographerUIManager.updateLikesAndPrice(
            urlPhotographerId,
            this.photographerMediaArray,
            photographers
        );

        PhotographerEventHandler.handleLikeClicks(
            this.photographerMediaArray,
            urlPhotographerId
        );

        this.initContactModal(photographerObject.name);
        this.initSortChangeHandler();

        this.initDropdownMenu();
    }

    initContactModal(photographerName) {
        const contactModal = new ContactModal(".contact__modal");
        const contactButton = document.querySelector(".contact-button");
        contactButton.addEventListener("click", () => {
            contactModal.displayContactModal(photographerName);
        });
    }

    initSortChangeHandler() {
        PhotographerEventHandler.handleSortChange(
            this.photographerMediaArray,
            this.photographerName,
            this.postsContainer,
            this.carousel
        );
    }

    initDropdownMenu() {
        const sortButton = document.querySelector(".dropdown-menu__sort-button");
        const dropDownMenu = document.querySelector(".dropdown-menu");

        sortButton.addEventListener("click", () => {
            const isMenuVisible = dropDownMenu.classList.contains("show");

            dropDownMenu.classList.toggle("show");
            sortButton.setAttribute("aria-expanded", !isMenuVisible);
        });

        // Optionnel : Fermer le menu lorsqu'on clique en dehors
        document.addEventListener("click", (event) => {
            if (!sortButton.contains(event.target) && !dropDownMenu.contains(event.target)) {
                dropDownMenu.classList.remove("show");
                sortButton.setAttribute("aria-expanded", "false");
            }
        });
    }
}
    
// Initialisation de l'application
const photographerApp = new PhotographerApp();
photographerApp.init();

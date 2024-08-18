import { PhotographerDataFetcher } from "../data/PhotographerDataFetcher.js";
import { PhotographerUIManager } from "../components/PhotographerUiManager.js";
import { PhotographerEventHandler } from "../utils/PhotographerEventHandler.js";
import { ContactModal } from "../components/ContactModal.js";
import { CarouselLightbox } from "../components/CarouselLightbox.js";
import { cleanUpEventListeners } from "../utils/domUtils.js";
import getParameter from "../utils/getParameters.js";
import { getUserInfos, getPostsOfUser } from "../utils/photographerUtils.js";

class PhotographerApp {
  constructor() {
    this.dataFetcher = new PhotographerDataFetcher(
      "http://127.0.0.1:5500/v1.2/data/photographers.json"
    );
    this.photographerMediaArray = [];
    this.photographerName = "";
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
      console.error(
        "photographerMediaArray is not initialized correctly:",
        this.photographerMediaArray
      );
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

    PhotographerUIManager.updateProfileUI(
      photographerObject,
      this.profileContainer
    );

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
    const sortIcon = sortButton.querySelector(".sort-icon");

    sortButton.addEventListener("click", function () {
        const isMenuVisible = dropDownMenu.classList.contains("show");

        if (isMenuVisible) {
            dropDownMenu.classList.remove("show");
            sortButton.setAttribute("aria-expanded", "false");
            sortIcon.textContent = "v";  // Flèche vers le bas
        } else {
            dropDownMenu.classList.add("show");
            sortButton.setAttribute("aria-expanded", "true");
            sortIcon.textContent = "^";  // Flèche vers le haut

            const dropdownItems = document.querySelectorAll('.dropdown-menu__list-item');
            dropdownItems.forEach(item => {
                if (item.textContent.trim() === sortButton.querySelector('.sort-text').textContent.trim()) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }
            });
        }
    });

    const dropdownItems = document.querySelectorAll('.dropdown-menu__list-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function () {
            sortButton.querySelector('.sort-text').textContent = this.textContent;
            dropDownMenu.classList.remove("show");
            sortButton.setAttribute("aria-expanded", "false");
            sortIcon.textContent = "v";  // Flèche vers le bas
        });
    });

    document.addEventListener("click", function (event) {
        if (!sortButton.contains(event.target) && !dropDownMenu.contains(event.target)) {
            dropDownMenu.classList.remove("show");
            sortButton.setAttribute("aria-expanded", "false");
            sortIcon.textContent = "v";  // Flèche vers le bas
        }
    });
  }
}

// Initialisation de l'application
const photographerApp = new PhotographerApp();
photographerApp.init();

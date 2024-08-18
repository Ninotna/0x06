import PhotographerProfileTemplate from "../templates/photographerProfile.js";
import { PhotographerFactory } from "../factories/media.js";
import { PhotographerData } from "../utils/PhotographerData.js";
import {PhotographerEventHandler} from '../utils/PhotographerEventHandler.js';


export class PhotographerUIManager {
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

        // Reattach like button event listeners after updating the DOM
        const photographerId = dataArray.length > 0 ? dataArray[0].photographerId : null;
        if (photographerId) {
            PhotographerEventHandler.handleLikeClicks(dataArray, photographerId);
        }
    }

  static updateProfileUI(dataObject, profileContainer) {
    PhotographerProfileTemplate.updateProfileUI(dataObject, profileContainer);
  }

  static updateLikesAndPrice(photographerId, mediaArray, photographers) {
    const totalLikes = PhotographerData.getTotalLikes(mediaArray, photographerId);
    const photographerPrice = PhotographerData.getPhotographerPrice(
      photographers,
      photographerId
    );

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

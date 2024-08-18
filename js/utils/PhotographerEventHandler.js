// PhotographerEventHandler.js
import { sortPostsByProperty } from "../utils/photographerSort.js";
import { PhotographerUIManager } from "../components/PhotographerUiManager.js";
import { PhotographerData } from "../utils/PhotographerData.js";


export class PhotographerEventHandler {
    static handleLikeClicks(mediaArray, photographerId) {
        const likeButtons = document.querySelectorAll(".images__post-like-button");

        likeButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const mediaId = parseInt(
                    event.currentTarget.closest(".images__post-container").dataset.postId
                );
                
                // Call the increaseLike function as a static method of PhotographerData
                const newLikeCount = PhotographerData.increaseLike(mediaArray, mediaId);

                if (newLikeCount !== null) {
                    event.currentTarget.innerHTML = `${newLikeCount} <i class="fa-solid fa-heart"></i>`;
                    const totalLikes = PhotographerData.getTotalLikes(mediaArray, photographerId);
                    PhotographerUIManager.updateElementContent(
                        ".main__likes p",
                        `${totalLikes} <i class="fa-solid fa-heart"></i>`
                    );
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
    if (!mediaArray || !photographerName || !postsContainer || !carousel) {
      console.error("One or more required variables are undefined:", {
        mediaArray,
        photographerName,
        postsContainer,
        carousel,
      });
      return;
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
      PhotographerEventHandler.updateDropdownIcon();
    });

    const dropdownMenuItems = document.querySelectorAll(
      ".dropdown-menu__list-item"
    );

    dropdownMenuItems.forEach((item) => {
      item.addEventListener("click", function () {
        PhotographerEventHandler.setItemName(
          item,
          sortPostsByProperty,
          mediaArray,
          photographerName,
          postsContainer,
          carousel
        );
        PhotographerEventHandler.updateDropdownIcon();
      });

      item.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          PhotographerEventHandler.setItemName(
            event.target,
            sortPostsByProperty,
            mediaArray,
            photographerName,
            postsContainer,
            carousel
          );
          PhotographerEventHandler.updateDropdownIcon();
        }
      });
    });
  }

  static setItemName(
    element,
    sortFunction,
    photographerMediaArray,
    photographerName,
    postsContainer,
    carousel
  ) {
    const itemElement = element;
    const buttonElement = document.querySelector(".dropdown-menu__sort-button");

    let sortTextElement = buttonElement.querySelector(".sort-text");
    let sortIconElement = buttonElement.querySelector(".sort-icon");

    if (!sortTextElement) {
      sortTextElement = document.createElement('span');
      sortTextElement.className = 'sort-text';
      buttonElement.appendChild(sortTextElement);
    }

    if (!sortIconElement) {
      sortIconElement = document.createElement('span');
      sortIconElement.className = 'sort-icon';
      buttonElement.appendChild(sortIconElement);
    }

    sortTextElement.textContent = itemElement.innerText;

    const sortedArray = sortFunction(
      photographerMediaArray,
      itemElement.innerText.toLowerCase()
    );

    PhotographerUIManager.updatePostsUI(
      sortedArray,
      photographerName,
      postsContainer,
      carousel
    );

    sortIconElement.textContent = "v"; 
  }

  static updateDropdownIcon() {
    const sortButtonIcon = document.querySelector(".dropdown-menu__icon");
    if (sortButtonIcon) {
        sortButtonIcon.style.transform = 'rotate(0deg)';
        sortButtonIcon.textContent = 'v';
    }
  }
}

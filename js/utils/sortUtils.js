// sortUtils.js

export function sortPostsForMobile() {
    sortPosts(this);
  }
  
  export const setItemNameAccessible = (event) => {
    if (event.key === "Enter") {
      setItemName(event.target);
    }
  };
  
  export function sortPostsForWidescreens() {
    const iconLabelContainer = document.querySelector(
      ".dropdown-menu__icon-container"
    );
  
    let eventIsNotWindow = this.window === false;
  
    const dropDownMenu = document.querySelector(".dropdown-menu");
    const dropdownMenuItems = document.querySelectorAll(
      ".dropdown-menu__list-item"
    );
  
    const sortButton = document.querySelector(".dropdown-menu__sort-button");
  
    let dropDownMenuNotOpened = dropDownMenu.classList.contains("hide");
    if (dropDownMenuNotOpened) {
      dropDownMenu.classList.remove("hide");
      iconLabelContainer.classList.add("active-sort-button-icon");
      eventIsNotWindow
        ? this.setAttribute("aria-expanded", "true")
        : sortButton.setAttribute("aria-expanded", "true");
    } else {
      dropDownMenu.classList.add("hide");
      iconLabelContainer.classList.remove("active-sort-button-icon");
      eventIsNotWindow
        ? this.setAttribute("aria-expanded", "false")
        : sortButton.setAttribute("aria-expanded", "false");
    }
  
    dropdownMenuItems.forEach((item) => {
      item.addEventListener("click", setItemName);
      item.addEventListener("keypress", setItemNameAccessible);
    });
  }
  
  export function setItemName(elementForScreenReaders) {
    const itemElement = this.window ? elementForScreenReaders : this;
    const buttonElement = document.querySelector(".dropdown-menu__sort-button");
  
    buttonElement.textContent = itemElement.innerText;
    sortPosts(buttonElement);
  }
  
  export function sortPosts(element, sortPostsByProperty) {
    const actualPostsNodeList = document.querySelectorAll(".images > *:not(template)");
    const actualPostsArray = Array.from(actualPostsNodeList);
    
    const actualPostsDataArray = actualPostsArray.map(post => {
      const imageOfPost = post.querySelector("a[href]").children[0];
      const HTMLTagOfImage = imageOfPost.tagName;
  
      const photographerId = post.getAttribute("data-photographers-id");
      const srcAttribute = imageOfPost.getAttribute("src");
      let thumbnailName = null;
  
      if (srcAttribute) {
        // Si l'attribut src est présent, on extrait le nom du fichier
        thumbnailName = srcAttribute.split(`/assets/media/${photographerId}/`)[1];
      } else {
        // Si l'attribut src est manquant, on logue une erreur et ignore cet élément
        console.error(`L'attribut 'src' est manquant pour une image ou vidéo du photographe avec l'ID ${photographerId}.`);
        return null; // Retourne null pour indiquer qu'on ignore cet élément
      }
  
      return {
        title: post.getAttribute("data-title"),
        likes: Number(post.getAttribute("data-likes")),
        date: new Date(post.getAttribute("data-publishing-date")),
        photographerId: photographerId,
        id: post.getAttribute("data-post-id"),
        [HTMLTagOfImage === "IMG" ? "image" : "video"]: thumbnailName,
      };
    }).filter(post => post !== null); // Filtre les éléments nuls pour éviter les erreurs
  
    const valueOfElement = element.tagName === "BUTTON" ? element.innerText.toLowerCase() : element.value;
    const sortedArray = sortPostsByProperty(actualPostsDataArray, valueOfElement);
    photographerMediaArray = sortedArray;
  
    const documentFragment = document.createDocumentFragment();
    sortedArray.forEach(post => {
      const postHasImageOrVideo = post.image !== undefined ? "image" : "video";
      PhotographerApp.changeUIOfPostsV2(post, postHasImageOrVideo, documentFragment);
    });
  
    postsContainer.textContent = "";
    postsContainer.appendChild(documentFragment);
  
    addPostFeatures();
  }
  
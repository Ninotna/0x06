// photographerSort.js

// Fonction de tri par popularité (likes)
export function sortByLikes(mediaArray) {
    return mediaArray.sort((a, b) => b.likes - a.likes);
}

// Fonction de tri par date
export function sortByDate(mediaArray) {
    // console.log("Array passed to sortByDate:", mediaArray);
    if (!Array.isArray(mediaArray)) {
        console.error("sortByDate expects an array but received:", mediaArray);
        return []; // Retourne un tableau vide pour éviter l'erreur
    }
    return mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Fonction de tri par titre
export function sortByTitle(mediaArray) {
    return mediaArray.sort((a, b) => a.title.localeCompare(b.title));
}

// Méthode pour trier les publications par propriété
export function sortPostsByProperty(postsArray, property) {
    // console.log("Before sorting, array:", postsArray);
    if (!Array.isArray(postsArray)) {
        console.error("sortPostsByProperty expects an array but received:", postsArray);
        return []; // Retourne un tableau vide pour éviter l'erreur
    }

    let sortedArray;
    switch (property) {
        case "popularité":
            sortedArray = sortByLikes(postsArray);
            break;
        case "date":
            sortedArray = sortByDate(postsArray);
            break;
        case "titre":
            sortedArray = sortByTitle(postsArray);
            break;
        default:
            sortedArray = postsArray;
    }
    // console.log("After sorting by " + property + ":", sortedArray);
    return sortedArray;
}

// Fonction pour gérer le tri sur les appareils mobiles
export function sortPostsForMobile() {
    sortPosts(this, sortPostsByProperty);
}

// Fonction pour gérer le tri sur les écrans larges
export function sortPostsForDesktop(photographerMediaArray, photographerName, postsContainer, carousel) {
    const iconLabelContainer = document.querySelector(".dropdown-menu__icon-container");
    const dropDownMenu = document.querySelector(".dropdown-menu");
    const dropdownMenuItems = document.querySelectorAll(".dropdown-menu__list-item");
    const sortButton = document.querySelector(".dropdown-menu__sort-button");
    
    let dropDownMenuNotOpened = dropDownMenu.classList.contains("hide");
    if (dropDownMenuNotOpened) {
        dropDownMenu.classList.remove("hide");
        iconLabelContainer.classList.add("active-sort-button-icon");
        sortButton.setAttribute("aria-expanded", "true");
    } else {
        dropDownMenu.classList.add("hide");
        iconLabelContainer.classList.remove("active-sort-button-icon");
        sortButton.setAttribute("aria-expanded", "false");
    }

    dropdownMenuItems.forEach((item) => {
        item.addEventListener("click", function () {
            // console.log("Dropdown menu item clicked:", this.innerText);
        
            // Assurez-vous que ces variables sont bien définies dans le scope actuel
            if (
                typeof photographerMediaArray !== "undefined" &&
                typeof photographerName !== "undefined" &&
                typeof postsContainer !== "undefined" &&
                typeof carousel !== "undefined"
            ) {
                PhotographerEventHandler.setItemName.call(
                    this,
                    sortPostsByProperty,
                    photographerMediaArray,
                    photographerName,
                    postsContainer,
                    carousel
                );
            } else {
                console.error("Variables nécessaires non définies:", {
                    photographerMediaArray,
                    photographerName,
                    postsContainer,
                    carousel,
                });
            }
        });
        item.addEventListener(
            "keypress",
            function(event) {
                if (event.key === "Enter") {
                    PhotographerEventHandler.setItemName.call(
                        this,
                        sortPostsByProperty,
                        photographerMediaArray,
                        photographerName,
                        postsContainer,
                        carousel
                    );
                }
            }
        );
    });
}

// Fonction pour définir le nom de l'élément sélectionné dans le menu déroulant
export function setItemName(sortFunction, photographerMediaArray, photographerName, postsContainer, carousel) {
    const itemElement = this;
    const buttonElement = document.querySelector(".dropdown-menu__sort-button");

    // Met à jour le texte du bouton de tri avec le nom de l'élément sélectionné
    buttonElement.textContent = itemElement.innerText;

    // console.log("Sorting by:", itemElement.innerText.toLowerCase());
    
    // Appelle la fonction de tri basée sur l'élément sélectionné
    const sortedArray = sortFunction(photographerMediaArray, itemElement.innerText.toLowerCase());
    
    // Met à jour l'interface utilisateur avec les éléments triés
    PhotographerUIManager.updatePostsUI(
        sortedArray,
        photographerName,
        postsContainer,
        carousel
    );
}

// Fonction principale pour trier les publications selon la propriété spécifiée
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
            thumbnailName = srcAttribute.split(`/assets/media/${photographerId}/`)[1];
        } else {
            console.error(`L'attribut 'src' est manquant pour une image ou vidéo du photographe avec l'ID ${photographerId}.`);
            return null;
        }

        return {
            title: post.getAttribute("data-title"),
            likes: Number(post.getAttribute("data-likes")),
            date: new Date(post.getAttribute("data-publishing-date")),
            photographerId: photographerId,
            id: post.getAttribute("data-post-id"),
            [HTMLTagOfImage === "IMG" ? "image" : "video"]: thumbnailName,
        };
    }).filter(post => post !== null);

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

    addPostFeatures(); // Assurez-vous que cette fonction réattache les événements nécessaires
}

export function addPostFeatures() {
 
    //Code to sort the posts
     //1. For mobile devices
     const selectSortElement = document.querySelector("select");
   
     selectSortElement.addEventListener("change", sortPostsForMobile);
   
     //2. For widescreen devices
     const buttonSortElement = document.querySelector(
       ".dropdown-menu__sort-button"
     );
   
     buttonSortElement.addEventListener("click", sortPostsForDesktop);
}
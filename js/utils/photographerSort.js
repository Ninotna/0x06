// photographerSort.js

// Fonction de tri par popularité (likes)
export function sortByLikes(mediaArray) {
    return mediaArray.sort((a, b) => b.likes - a.likes);
}

// Fonction de tri par date
export function sortByDate(mediaArray) {
    return mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Fonction de tri par titre
export function sortByTitle(mediaArray) {
    return mediaArray.sort((a, b) => a.title.localeCompare(b.title));
}

// Fonction de tri pour les écrans larges
export function sortPostsForWidescreens(sortFunction) {
    const property = document.querySelector(".dropdown-menu__sort-button").dataset.sortProperty;
    const sortedArray = sortFunction(property);
    return sortedArray;
}

// Fonction de tri pour les mobiles
export function sortPostsForMobile(sortFunction) {
    const property = document.getElementById("select").value;
    const sortedArray = sortFunction(property);
    return sortedArray;
}

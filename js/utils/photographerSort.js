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

// photographerData.js

// Fonction pour calculer le nombre total de likes pour un photographe
export function getTotalLikes(mediaArray, photographerId) {
    /*
     * Cette fonction prend en entrée un tableau de médias (mediaArray)
     * et un identifiant de photographe (photographerId).
     * Elle retourne le nombre total de likes pour tous les médias appartenant à ce photographe.
     */
    
    return mediaArray
        // 1. Filtrage des médias pour ne conserver que ceux appartenant au photographe spécifié
        .filter(media => media.photographerId === photographerId)
        
        // 2. Réduction du tableau filtré pour calculer la somme totale des likes
        .reduce((total, media) => total + media.likes, 0);
        
        /*
         * Le filtre .filter(media => media.photographerId === photographerId) :
         * - Parcourt chaque élément du tableau mediaArray.
         * - Conserve uniquement les éléments dont l'identifiant du photographe (media.photographerId)
         *   correspond à celui spécifié (photographerId).
         *
         * La réduction .reduce((total, media) => total + media.likes, 0) :
         * - Démarre avec une valeur initiale de 0.
         * - Pour chaque élément filtré, ajoute le nombre de likes (media.likes) au total courant.
         * - Renvoie la somme totale des likes après avoir parcouru tous les éléments.
         */
}

// Fonction pour récupérer le prix du photographe
export function getPhotographerPrice(photographers, photographerId) {
    /*
     * Cette fonction prend en entrée un tableau de photographes (photographers)
     * et un identifiant de photographe (photographerId).
     * Elle retourne le prix quotidien du photographe correspondant à cet identifiant.
     */
    
    // 1. Recherche du photographe dont l'identifiant correspond à photographerId
    const photographer = photographers.find(p => p.id === photographerId);
    
    /*
     * La méthode .find(p => p.id === photographerId) :
     * - Parcourt chaque élément du tableau photographers.
     * - Renvoie le premier élément dont l'identifiant (p.id) correspond à photographerId.
     * - Si aucun élément n'est trouvé, renvoie undefined.
     */
    
    // 2. Si le photographe est trouvé, retourne son prix ; sinon, retourne null
    return photographer ? photographer.price : null;
    
    /*
     * Le retour (return photographer ? photographer.price : null) :
     * - Vérifie si un photographe a été trouvé (photographer est défini).
     * - Si oui, retourne la valeur de la propriété price du photographe.
     * - Sinon, retourne null, indiquant qu'aucun photographe correspondant n'a été trouvé.
     */
}


// Fonction pour augmenter le nombre de likes d'un média spécifique
export function increaseLike(mediaArray, mediaId) {
    const media = mediaArray.find(media => media.id === mediaId);
    if (media) {
        media.likes += 1;
    }
    return media ? media.likes : null;
}
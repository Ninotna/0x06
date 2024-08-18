export class PhotographerData {
    static getTotalLikes(mediaArray, photographerId) {
        return mediaArray
            .filter(media => media.photographerId === photographerId)
            .reduce((total, media) => total + media.likes, 0);
    }

    static getPhotographerPrice(photographers, photographerId) {
        const photographer = photographers.find(p => p.id === photographerId);
        return photographer ? photographer.price : null;
    }

    static increaseLike(mediaArray, mediaId) {
        const media = mediaArray.find(media => media.id === mediaId);
        if (media) {
            media.likes += 1;
        }
        return media ? media.likes : null;
    }
}

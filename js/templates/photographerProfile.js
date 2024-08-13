import {ContactModal,ContactFormBuilder} from "../components/ContactModal.js";

export default class PhotographerProfileTemplate {
    constructor(card) {
        this.card = card;
    }

    createProfileCard() {
        const template = document.getElementById('profile-template');
        const profileElement = document.importNode(template.content, true);

        profileElement.querySelector('.profile__name').textContent = this.card.name;
        profileElement.querySelector('.profile__location').textContent = `${this.card.city}, ${this.card.country}`;
        profileElement.querySelector('.profile__tagline').textContent = this.card.tagline;
        profileElement.querySelector('.profile__image').src = `./assets/photographersIdCard/${this.card.portrait}`;
        profileElement.querySelector('.profile__image').alt = `Photo de profil de ${this.card.name}`;

        return profileElement;
    }

    static updateProfileUI(card, container) {
        const profileTemplate = new PhotographerProfileTemplate(card);
        // console.log(card);
        const profileElement = profileTemplate.createProfileCard();
        container.appendChild(profileElement);

        const contactButton = container.querySelector(".contact-button");
        contactButton.addEventListener("click", () => {
            const contactModal = new ContactModal(".contact__modal");
            contactModal.displayContactModal();
        });
    }

    // Nouvelle méthode pour créer un post avec une image
    createPostImage() {
        const template = document.getElementById('image-post-template');
        const postElement = document.importNode(template.content, true);

        postElement.querySelector('.images__post-container').setAttribute('data-post-id', this.card.id);
        postElement.querySelector('.images__post-container').setAttribute('data-photographers-id', this.card.photographersId);
        postElement.querySelector('.images__post-container').setAttribute('data-publishing-date', this.card.date);
        postElement.querySelector('.images__post-container').setAttribute('data-likes', this.card.likes);
        postElement.querySelector('.images__post-container').setAttribute('data-title', this.card.title);

        const imgElement = postElement.querySelector('.images__image');
        imgElement.src = `./assets/media/${this.card.photographerId}/${this.card.image}`;
        imgElement.alt = `${this.card.title} fait le ${this.card.date}`;
        imgElement.title = this.card.title;

        const descriptionElement = postElement.querySelector('.images__post-description');
        descriptionElement.textContent = this.card.title;

        const likeButton = postElement.querySelector('.images__post-like-button');
        likeButton.innerHTML = `${this.card.likes} <i class="fa-solid fa-heart"></i>`;

        return postElement;
    }

    // Nouvelle méthode pour créer un post avec une vidéo
    createPostVideo() {
        const template = document.getElementById('video-post-template');
        const postElement = document.importNode(template.content, true);
        // console.log(this.card);

        postElement.querySelector('.images__post-container').setAttribute('data-post-id', this.card.id);
        postElement.querySelector('.images__post-container').setAttribute('data-photographers-id', this.card.photographerId);
        postElement.querySelector('.images__post-container').setAttribute('data-publishing-date', this.card.date);
        postElement.querySelector('.images__post-container').setAttribute('data-likes', this.card.likes);
        postElement.querySelector('.images__post-container').setAttribute('data-title', this.card.title);

        const videoElement = postElement.querySelector('.images__video');
        videoElement.src = `./assets/media/${this.card.photographerId}/${this.card.video}`;
        videoElement.title = this.card.title;

        const descriptionElement = postElement.querySelector('.images__post-description');
        descriptionElement.textContent = this.card.title;

        const likeButton = postElement.querySelector('.images__post-like-button');
        likeButton.innerHTML = `${this.card.likes} <i class="fa-solid fa-heart"></i>`;

        return postElement;
    }
}

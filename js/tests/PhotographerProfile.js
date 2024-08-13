import PhotographerProfileTemplate from "../templates/photographerProfile.js";

// Mock du DOM pour les tests
document.body.innerHTML = `
    <div class="main__profile-wrapper"></div>
    <div class="images"></div>

    <!-- Ajoutez ici les templates HTML nécessaires pour les tests -->
    <template id="profile-template">
        <section class="main__profile-banner">
            <div class="profile__card-container">
                <div class="profile__card">
                    <h1 class="profile__name"></h1>
                    <p class="profile__location"></p>
                    <p class="profile__tagline"></p>
                </div>
            </div>
            <div class="profile__contact">
                <button type="button" class="contact-button button button--rounded">
                    Contactez-moi
                </button>
            </div>
            <div class="profile__image-container">
                <img src="" alt="" class="profile__image" />
            </div>
        </section>
    </template>

    <template id="image-post-template">
        <div class="images__post-container" data-post-id="" data-photographers-id=""
            data-publishing-date="" data-likes="" data-user-liked="false" data-title="">
            <div class="images__post">
                <a href="#" title="" aria-label="" role="link" tabindex="0">
                    <img class="images__image" src="" alt="" />
                </a>
                <div class="images__post-text">
                    <p class="images__post-description" tabindex="0"></p>
                    <button class="images__post-like-button" title="" aria-pressed="false"
                        aria-label="" tabindex="0"> <i class="fa-solid fa-heart"></i></button>
                </div>
            </div>
        </div>
    </template>

    <template id="video-post-template">
        <div class="images__post-container" data-post-id="" data-photographers-id=""
            data-publishing-date="" data-likes="" data-user-liked="false" data-title="">
            <div class="images__post">
                <a href="#" title="" aria-label="" role="link" tabindex="0">
                    <video src="" class="images__video">
                        <track kind="captions" srclang="en" label="English captions"></track>
                    </video>
                </a>
                <div class="images__post-text">
                    <p class="images__post-description" tabindex="0"></p>
                    <button class="images__post-like-button" title="" aria-pressed="false"
                        aria-label="" tabindex="0"> <i class="fa-solid fa-heart"></i></button>
                </div>
            </div>
        </div>
    </template>
`;



// Initialisation des données du photographe pour les tests
const photographerCardData = {
    id: 1, // L'ID du post
    photographersId: 82, // L'ID du photographe
    name: "John Doe",
    city: "Paris",
    country: "France",
    tagline: "Capturing moments",
    portrait: "EllieRoseWilkens.jpg",
    image: "Art_Mine.jpg",
    video: "example_video.mp4", // ou null si non utilisé
    date: "2023-08-13",
    likes: 123,
    title: "Voyage Solitude"
};


// Sélection des conteneurs
const profileContainer = document.querySelector('.main__profile-wrapper');
const postsContainer = document.querySelector('.images');

// Test : Met à jour l'interface utilisateur avec le profil du photographe
PhotographerProfileTemplate.updateProfileUI(photographerCardData, profileContainer);

// Test : Ajoute un post image ou vidéo
const profileTemplate = new PhotographerProfileTemplate(photographerCardData);
const postElement = photographerCardData.image ? profileTemplate.createPostImage() : profileTemplate.createPostVideo();
postsContainer.appendChild(postElement);

// Optionnel : Afficher le contenu du body pour vérifier le rendu dans la console
console.log(document.body.innerHTML);


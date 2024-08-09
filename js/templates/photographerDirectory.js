/**
 * Fonction qui crée un modèle de carte pour un photographe
 * @param {Object} data - Les données du photographe
 * @returns {Object} - Un objet contenant le nom, l'image, et une fonction pour créer la carte DOM
 */
function photographerTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographersId/${portrait}`;

    /**
     * Fonction qui génère la carte DOM pour le photographe
     * @returns {DocumentFragment} - Le fragment de document contenant la carte du photographe
     */
    function getUserCardDOM() {
        // Crée un fragment de document pour assembler les éléments de la carte
        const fragment = document.createDocumentFragment();

        // Crée une section pour la carte du photographe
        const section = document.createElement('section');
        section.setAttribute("class", "card");

        // Crée l'image du photographe avec les attributs nécessaires
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
        img.setAttribute("aria-label", `Portrait de ${name}`);
        img.setAttribute("class", "card__image");

        // Crée un titre h2 pour le nom du photographe
        const h2 = document.createElement('h2');
        h2.setAttribute("class", "card__name");
        h2.textContent = name;

        // Crée un lien vers la page détaillée du photographe
        const lienPagePhotograph = document.createElement('a');
        lienPagePhotograph.setAttribute("href", `photographer.html?id=${id}`);
        lienPagePhotograph.setAttribute("title", `Portrait de ${name}`);
        lienPagePhotograph.setAttribute("aria-label", `Voir le profil de ${name}`);
        lienPagePhotograph.setAttribute("role", "link");
        lienPagePhotograph.setAttribute("class", "card__ph-profile");

        // Crée un conteneur pour le texte de la carte
        const cardTextContainer = document.createElement('div');
        cardTextContainer.setAttribute("class", "card__text-container");

        // Crée et ajoute le texte de localisation du photographe
        const pLocation = document.createElement('p');
        pLocation.setAttribute("class", "card__location");
        pLocation.textContent = `${city}, ${country}`;

        // Crée et ajoute la tagline du photographe
        const pTagline = document.createElement('p');
        pTagline.setAttribute("class", "card__tagline");
        pTagline.textContent = tagline;

        // Crée et ajoute le coût journalier du photographe
        const pPrice = document.createElement('p');
        pPrice.setAttribute("class", "card__daily-cost");
        pPrice.textContent = `${price}€/jour`;

        // Assemble les éléments texte dans le conteneur
        cardTextContainer.appendChild(pLocation);
        cardTextContainer.appendChild(pTagline);
        cardTextContainer.appendChild(pPrice);

        // Assemble les éléments de la carte
        lienPagePhotograph.appendChild(img);
        lienPagePhotograph.appendChild(h2);
        section.appendChild(lienPagePhotograph);
        section.appendChild(cardTextContainer);

        // Ajoute la section au fragment
        fragment.appendChild(section);

        // Retourne le fragment de document complet
        return fragment;
    }

    // Retourne un objet contenant le nom, l'image, et la méthode de création du DOM
    return { name, picture, getUserCardDOM };
}


export default photographerTemplate;
function photographerTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const section = document.createElement( 'section' );
        section.setAttribute("class", "card");
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
		img.setAttribute("alt", "");
		// img.setAttribute("alt", `Portrait de ${name}`);
		img.setAttribute("aria-label", `Portrait de ${name}`);
        img.setAttribute("class", "card__image");

        const h2 = document.createElement( 'h2' );
        h2.setAttribute("class","card__name");
        h2.textContent = name;

        const lienPagePhotograph = document.createElement( 'a' );
        lienPagePhotograph.setAttribute("href", `photographer.html?id=${id}`)
        lienPagePhotograph.setAttribute("title", `Portrait de ${name}`);
		lienPagePhotograph.setAttribute("aria-label", `Voir le profil de ${name}`);
        lienPagePhotograph.setAttribute("role", "link");
        lienPagePhotograph.setAttribute("class", "card__ph-profile");

        const cardTextContainer = document.createElement( 'div' );
        cardTextContainer.setAttribute("class", "card__text-container")
        const pLocation = document.createElement( 'p' );
        pLocation.setAttribute("class", "card__location");
        pLocation.textContent = `${city}, ${country}`;

        const pTagline = document.createElement( 'p' );
        pTagline.setAttribute("class", "card__tagline");
        pTagline.textContent = tagline;

        const pPrice = document.createElement( 'p' );
        pPrice.setAttribute("class", "card__daily-cost");
        pPrice.textContent = `${price}€/jour`;

        cardTextContainer.appendChild(pLocation);
        cardTextContainer.appendChild(pTagline);
        cardTextContainer.appendChild(pPrice);

        lienPagePhotograph.appendChild(img);
        lienPagePhotograph.appendChild(h2);
        section.appendChild(lienPagePhotograph);
        section.appendChild(cardTextContainer);


        return (section);
    }
    
    return { name, picture, getUserCardDOM }
}
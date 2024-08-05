function photographerTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
		img.setAttribute("alt", "");
		// img.setAttribute("alt", `Portrait de ${name}`);
		img.setAttribute("aria-label", `Portrait de ${name}`);
        img.setAttribute("class", "card__image");

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const lienPagePhotograph = document.createElement( 'a' );
        lienPagePhotograph.setAttribute("href", `photographer.html?id=${id}`)
        lienPagePhotograph.setAttribute("title", `Portrait de ${name}`);
		lienPagePhotograph.setAttribute("aria-label", `Voir le profil de ${name}`);
        lienPagePhotograph.setAttribute("role", "link");

        const pLocation = document.createElement( 'p' );
        pLocation.setAttribute("class", "card__location");
        pLocation.textContent = `${city}, ${country}`;

        const pTagline = document.createElement( 'p' );
        pTagline.setAttribute("class", "card__slogan");
        pTagline.textContent = tagline;

        const pPrice = document.createElement( 'p' );
        pPrice.setAttribute("class", "card__price");
        pPrice.textContent = `${price}€/jour`;

        lienPagePhotograph.appendChild(img);
        lienPagePhotograph.appendChild(h2);
        article.appendChild(lienPagePhotograph);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    }
    
    return { name, picture, getUserCardDOM }
}
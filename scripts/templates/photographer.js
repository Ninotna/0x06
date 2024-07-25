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

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const lienPagePhotograph = document.createElement( 'a' );
        lienPagePhotograph.setAttribute("href", `photographer.html?id=${id}`)
        img.setAttribute("alt", `Portrait de ${name}`);
		img.setAttribute("aria-label", `Voir le profil de ${name}`);
        img.setAttribute("role", "link");

        const pLocation = document.createElement( 'p' );
        pLocation.setAttribute("class", "ph_location");
        pLocation.textContent = `${city}, ${country}`;

        const pTagline = document.createElement( 'p' );
        pTagline.setAttribute("class", "ph_tagline");
        pTagline.textContent = tagline;

        const pPrice = document.createElement( 'p' );
        pPrice.setAttribute("class", "ph_price");
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
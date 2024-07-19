function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const pLocation = document.createElement( 'p' );
        pLocation.setAttribute("class", "ph_location");
        pLocation.textContent = `${city}, ${country}`;

        const pTagline = document.createElement( 'p' );
        pTagline.setAttribute("class", "ph_tagline");
        pTagline.textContent = tagline;

        const pPrice = document.createElement( 'p' );
        pPrice.setAttribute("class", "ph_price");
        pPrice.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}
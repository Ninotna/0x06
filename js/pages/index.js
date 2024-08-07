/**
 * Cette fonction asynchrone récupère les données des photographes
 * à partir d'un fichier JSON situé à l'adresse "./data/photographers.json".
 * Elle retourne un tableau de photographes si les données sont valides,
 * ou un tableau vide en cas d'erreur.
 */
async function getPhotographers() {
  try {
    // Effectue une requête HTTP pour récupérer le fichier JSON des photographes
    let response = await fetch("./data/photographers.json");

    // Vérifie si la réponse est correcte (statut HTTP 200-299)
    if (!response.ok) {
      // Lève une erreur si le statut HTTP indique une erreur
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Convertit la réponse en JSON
    let data = await response.json();

    // Vérifie que les données contiennent un tableau de photographes
    if (Array.isArray(data.photographers)) {
      return data.photographers;
    } else {
      // Lève une erreur si les données ne contiennent pas un tableau valide
      throw new Error(
        "Les données récupérées ne contiennent pas un tableau de photographes."
      );
    }
  } catch (error) {
    // Logge toute erreur survenue pendant la récupération ou le traitement des données
    console.error("Erreur lors de la récupération des données :", error);
    // Retourne un tableau vide en cas d'erreur pour éviter l'arrêt de l'application
    return [];
  }
}

/**
 * Fonction qui affiche les données des photographes sur la page web.
 * Elle utilise un DocumentFragment pour améliorer les performances lors de la manipulation du DOM.
 * @param {Array} photographers - Un tableau d'objets contenant les données des photographes.
 */
async function displayData(photographers) {
  try {
    // Affiche les données des photographes dans la console pour le débogage
    console.log(photographers);

    // Sélectionne l'élément DOM où les cartes des photographes seront ajoutées
    const photographersSection = document.querySelector(".main__cards-container");

    // Vérifie si le conteneur existe dans le DOM
    if (!photographersSection) {
      // Lève une erreur si le conteneur n'est pas trouvé
      throw new Error("Le conteneur .main__cards-container est introuvable.");
    }

    // Crée un DocumentFragment pour contenir temporairement les cartes des photographes
    const fragment = document.createDocumentFragment();

    // Itère sur chaque photographe dans le tableau des photographes
    photographers.forEach((photographer) => {
      // Crée un modèle de carte pour le photographe en utilisant sa fonction de modèle
      const photographerModel = photographerTemplate(photographer);

      // Appelle la méthode getUserCardDOM() pour obtenir l'élément DOM de la carte
      const userCardDOM = photographerModel.getUserCardDOM();

      // Ajoute l'élément de la carte au DocumentFragment
      fragment.appendChild(userCardDOM);
    });

    // Ajoute le DocumentFragment complet à l'élément DOM sélectionné
    photographersSection.appendChild(fragment);

  } catch (error) {
    // Logge une erreur dans la console si quelque chose ne va pas lors de l'affichage
    console.error("Erreur lors de l'affichage des données :", error);
  }
}

/**
 * Fonction d'initialisation qui récupère et affiche les données des photographes.
 * Elle utilise les fonctions getPhotographers() et displayData() pour
 * obtenir les données et les insérer dans le DOM.
 */
async function init() {
  try {
    // Récupère les données des photographes
    const photographers = await getPhotographers();
    // Affiche les données des photographes sur la page
    await displayData(photographers);
  } catch (error) {
    // Logge toute erreur survenue pendant l'initialisation
    console.error("Erreur lors de l'initialisation :", error);
  }
}

// Appelle la fonction d'initialisation pour démarrer le processus
init();

async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    let response = await fetch("./data/photographers.json");
    let data = await response.json();
  
    // et bien retourner le tableau photographers seulement une fois récupéré
  
    // Vérifier que les données contiennent bien un tableau de photographes
    if (Array.isArray(data.photographers)) {
      return data.photographers;
    } else {
      throw new Error(
        "Les données récupérées ne contiennent pas un tableau de photographes."
      );
    }
  }
  
  async function displayData(photographers) {
    console.log(photographers);
    const photographersSection = document.querySelector(".photographer_section");
  
    photographers.forEach((photographer) => {
      const photographerModel = photographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }
  
  async function init() {
    // Récupère les données des photographes
    const photographers = await getPhotographers();
    // Afficher les données des photographes
    displayData(photographers);
  }
  
  init().then();
  
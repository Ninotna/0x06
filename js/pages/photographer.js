import PhotographersApi from '../apis/photographersApi.js';
import PhotographerProfileTemplate from '../templates/photographerProfile.js';
import getParameter from '../utils/getParameters.js';
import ContactFormBuilder from '../utils/ContactModal.js';

class PhotographerApp
{
	/**
	 * Constructeur initialise l'instance de PhotographersApi avec l'URL donnée.
	 */
	constructor()
	{
		this.usersDataApi = new PhotographersApi(
			"http://127.0.0.1:5500/v1.1/data/photographers.json"
		);
	}

	/**
	 * Récupère les données du fichier JSON.
	 * @return: Les données JSON de l'API des photographes.
	 */
	async main()
	{
		try
		{
			const photosData = await this.usersDataApi.getPhotos();
			return (photosData);
		}
		catch (error)
		{
			console.error("Échec de la récupération des données :", error);
			return ({ error: true, message: error.message });
		}
	}

	/**
	 * Récupère les informations de l'utilisateur à partir d'un tableau d'utilisateurs et d'un ID de photographe.
	 * @arg arrayOfUsers: Tableau des utilisateurs.
	 * @arg urlIdOfPhotographer: ID du photographe à rechercher.
	 * @return: Un objet contenant les informations du photographe.
	 */
	static getUserInfos(arrayOfUsers, urlIdOfPhotographer)
	{
		let photographerInfosObject = {};
		for (let i = 0; i < arrayOfUsers.length; i++)
		{
			let user = arrayOfUsers[i];
			const { id } = user;
			if (id === urlIdOfPhotographer)
			{
				photographerInfosObject = user;
			}
		}
		return (photographerInfosObject);
	}

	/**
	 * Récupère les publications d'un photographe à partir d'un tableau de publications et d'un ID de photographe.
	 * @arg arrayOfPosts: Tableau des publications.
	 * @arg urlIdOfPhotographer: ID du photographe à rechercher.
	 * @return: Un tableau contenant les publications du photographe.
	 */
	static getPostsOfUser(arrayOfPosts, urlIdOfPhotographer)
	{
		let photographersPostsArray = [];
		for (let i = 0; i < arrayOfPosts.length; i++)
		{
			let post = arrayOfPosts[i];
			const { photographerId } = post;
			if (photographerId === urlIdOfPhotographer)
			{
				// Si l'ID du photographe dans la publication correspond à l'ID dans les paramètres de l'URL, récupère toutes ses publications
				photographersPostsArray.push(post);
			}
		}
		return (photographersPostsArray);
	}

	/**
	 * Méthode statique qui remplit les informations du profil.
	 * @arg dataObject: Objet contenant les données du profil.
	 * @arg container: Conteneur HTML pour afficher le profil.
	 */
	static changeUIOfProfile(dataObject, container)
	{
		const profileTemplate = new PhotographerProfileTemplate(dataObject);
		container.appendChild(profileTemplate.createProfileCard());
	}

/**
	 * Méthode statique qui remplit le conteneur pour les publications.
	 * @arg dataArray: Tableau contenant les données des publications.
	 * @arg photographerName: Nom du photographe pour récupérer les images.
	 * @arg container: Conteneur HTML pour afficher les publications.
	 */
static changeUIOfPosts(dataArray, photographerName, container)
{
	dataArray.forEach(postData =>
	{
		// Ajoutez le nom du photographe à l'objet postData
		postData.name = photographerName;

		const postTemplate = new PhotographerProfileTemplate(postData);
		container.appendChild(postTemplate.createPostsCard());
	});
}
}

// Initialisation de l'application des photographes
const launchPhotographerApp = new PhotographerApp().main();

const profileContainer = document.querySelector(".main__profile-banner");
const postsContainer = document.querySelector(".images");

let urlPhotographerId = Number(getParameter("id"));

let photographerObject = {};
let photographerMediaArray = [];

// Gestion des données une fois récupérées
launchPhotographerApp.then((data) =>
{
if (data.error)
{
	console.error("Erreur lors de la récupération des données :", data.message);
	return;
}

const { photographers, media } = data;

photographerObject = PhotographerApp.getUserInfos(
	photographers,
	urlPhotographerId
);

photographerMediaArray = PhotographerApp.getPostsOfUser(
	media,
	urlPhotographerId
);

PhotographerApp.changeUIOfProfile(photographerObject, profileContainer);
PhotographerApp.changeUIOfPosts(photographerMediaArray, photographerObject.name, postsContainer);
});

console.log("Id du photographe =", urlPhotographerId);

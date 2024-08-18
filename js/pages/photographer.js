// photographer.js

// Importation des modules et classes nécessaires pour cette page
import PhotographersApi from "../apis/photographersApi.js";
import PhotographerProfileTemplate from "../templates/photographerProfile.js";
import getParameter from "../utils/getParameters.js";
import { PhotographerFactory } from "../factories/media.js";
import {
	getUserInfos,
	getPostsOfUser,
	cleanUpEventListeners,
} from "../utils/photographerUtils.js";
import { ContactModal } from "../components/ContactModal.js";
import { CarouselLightbox } from "../components/CarouselLightbox.js";
import {
	getTotalLikes,
	getPhotographerPrice,
	increaseLike,
} from "../utils/photographerData.js";
// Importation des fonctions de tri
import {
	sortByLikes,
	sortByDate,
	sortByTitle,
	sortPostsForWidescreens,
	sortPostsForMobile
} from "../utils/photographerSort.js";

// Déclaration de la classe pour gérer la récupération des données des photographes
class PhotographerDataFetcher 
{
	constructor(apiUrl) 
	{
		this.usersDataApi = new PhotographersApi(apiUrl);
	}

	// Méthode principale asynchrone pour récupérer les données des photographes à partir de l'API
	async fetchData() 
	{
		try 
		{
			const photosData = await this.usersDataApi.getPhotos();
			return photosData;
		} 
		catch (error) 
		{
			console.error("Échec de la récupération des données :", error);
			return { error: true, message: error.message };
		}
	}
}

// Déclaration de la classe pour gérer les mises à jour de l'interface utilisateur
class PhotographerUIManager 
{
	// Mise à jour de l'interface utilisateur pour les publications
	static updatePostsUI(dataArray, photographerName, container) 
	{
		container.innerHTML = "";
		dataArray.forEach((postData) => 
		{
			postData.name = photographerName;
			const type = postData.image ? "image" : "video";
			const postElement = new PhotographerFactory(postData, type);
			container.appendChild(postElement);
		});
	}

	// Mise à jour de l'interface utilisateur pour le profil du photographe
	static updateProfileUI(dataObject, profileContainer) 
	{
		PhotographerProfileTemplate.updateProfileUI(dataObject, profileContainer);
	}

	// Mise à jour des likes et du prix du photographe
	static updateLikesAndPrice(photographerId, mediaArray, photographers) 
	{
		const totalLikes = getTotalLikes(mediaArray, photographerId);
		const photographerPrice = getPhotographerPrice(photographers, photographerId);

		if (photographerPrice !== null) 
		{
			this.updateElementContent(".main__likes p", `${totalLikes} <i class="fa-solid fa-heart"></i>`);
			this.updateElementContent(".main__daily-cost p", `${photographerPrice}€ / jour`);
		} 
		else 
		{
			console.error("Le prix du photographe n'a pas pu être récupéré. Vérifiez les données des photographes.");
		}
	}

	// Méthode pour mettre à jour le contenu d'un élément HTML
	static updateElementContent(selector, content) 
	{
		document.querySelector(selector).innerHTML = content;
	}
}

// Déclaration de la classe pour gérer les événements de l'application
class PhotographerEventHandler 
{
	// Gestion des clics sur les boutons de like
	static handleLikeClicks(mediaArray, photographerId) 
	{
		const likeButtons = document.querySelectorAll(".images__post-like-button");

		likeButtons.forEach((button) => 
		{
			button.addEventListener("click", (event) => 
			{
				const mediaId = parseInt(event.currentTarget.closest(".images__post-container").dataset.postId);
				const newLikeCount = increaseLike(mediaArray, mediaId);

				if (newLikeCount !== null) 
				{
					event.currentTarget.innerHTML = `${newLikeCount} <i class="fa-solid fa-heart"></i>`;
					const totalLikes = getTotalLikes(mediaArray, photographerId);
					PhotographerUIManager.updateElementContent(".main__likes p", `${totalLikes} <i class="fa-solid fa-heart"></i>`);
				}
			});
		});
	}

	// Gestion du changement de tri des publications
	static handleSortChange(mediaArray, photographerName, postsContainer, carousel) 
	{
		const sortSelect = document.getElementById("select");

		sortSelect.addEventListener("change", function () 
		{
			const sortedArray = sortPostsForMobile(PhotographerApp.sortPostsByProperty.bind(null, mediaArray));
			PhotographerUIManager.updatePostsUI(sortedArray, photographerName, postsContainer);
		});

		const sortButton = document.querySelector(".dropdown-menu__sort-button");
		sortButton.addEventListener("click", function () 
		{
			const sortedArray = sortPostsForWidescreens(PhotographerApp.sortPostsByProperty.bind(null, mediaArray));
			PhotographerUIManager.updatePostsUI(sortedArray, photographerName, postsContainer);
		});

		const dropdownMenuItems = document.querySelectorAll(".dropdown-menu__list-item");
		dropdownMenuItems.forEach((item) => 
		{
			item.addEventListener("click", function () 
			{
				setItemName.call(this, PhotographerApp.sortPostsByProperty);
			});
			item.addEventListener("keypress", PhotographerEventHandler.setItemNameAccessible);
		});
	}

	// Définir le nom de l'élément avec accessibilité au clavier
	static setItemNameAccessible(event) 
	{
		if (event.key === "Enter") 
		{
			setItemName(event.target);
		}
	}
}

// Classe principale pour gérer l'application des photographes
class PhotographerApp 
{
	constructor() 
	{
		this.dataFetcher = new PhotographerDataFetcher("http://127.0.0.1:5500/v1.2/data/photographers.json");
	}

	// Méthode d'initialisation de l'application
	async init() 
	{
		const data = await this.dataFetcher.fetchData();
		if (data.error) 
		{
			PhotographerUIManager.updateElementContent(".error-message", "Erreur lors de la récupération des données.");
			return;
		}

		const { photographers, media } = data;
		const urlPhotographerId = Number(getParameter("id"));
		const photographerObject = getUserInfos(photographers, urlPhotographerId);
		const photographerMediaArray = getPostsOfUser(media, urlPhotographerId);

		cleanUpEventListeners();

		const profileContainer = document.querySelector(".main__profile-wrapper");
		const postsContainer = document.querySelector(".images");

		PhotographerUIManager.updateProfileUI(photographerObject, profileContainer);
		PhotographerUIManager.updatePostsUI(photographerMediaArray, photographerObject.name, postsContainer);

		const photographersCopy = [...photographers];
		PhotographerUIManager.updateLikesAndPrice(urlPhotographerId, photographerMediaArray, photographersCopy);

		PhotographerEventHandler.handleLikeClicks(photographerMediaArray, urlPhotographerId);

		const contactModal = new ContactModal(".contact__modal");
		const contactButton = document.querySelector(".contact-button");
		contactButton.addEventListener("click", () => 
		{
			contactModal.displayContactModal(photographerObject.name);
		});

		const carousel = new CarouselLightbox(".lightbox__modal", photographerMediaArray);
		carousel.photographerId = urlPhotographerId;

		postsContainer.querySelectorAll(".post-class").forEach((postElement) => 
		{
			postElement.addEventListener("click", (e) => 
			{
				carousel.displayLightboxModal(e);
			});
		});

		PhotographerEventHandler.handleSortChange(photographerMediaArray, photographerObject.name, postsContainer, carousel);
	}

	// Méthode pour trier les publications par propriété
	static sortPostsByProperty(postsArray, property) 
	{
		switch (property) 
		{
			case "popularité":
				return sortByLikes(postsArray);
			case "date":
				return sortByDate(postsArray);
			case "titre":
				return sortByTitle(postsArray);
			default:
				return postsArray;
		}
	}
}

// Initialisation de l'application
const photographerApp = new PhotographerApp();
photographerApp.init();
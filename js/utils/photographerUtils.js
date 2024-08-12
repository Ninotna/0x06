// js/utils/photographerUtils.js

/**
 * Récupère les informations de l'utilisateur à partir d'un tableau d'utilisateurs et d'un ID de photographe.
 * @arg arrayOfUsers: Tableau des utilisateurs.
 * @arg urlIdOfPhotographer: ID du photographe à rechercher.
 * @return: Un objet contenant les informations du photographe.
 */
export function getUserInfos(arrayOfUsers, urlIdOfPhotographer)
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
export function getPostsOfUser(arrayOfPosts, urlIdOfPhotographer)
{
	let photographersPostsArray = [];
	for (let i = 0; i < arrayOfPosts.length; i++)
	{
		let post = arrayOfPosts[i];
		const { photographerId } = post;
		if (photographerId === urlIdOfPhotographer)
		{
			photographersPostsArray.push(post);
		}
	}
	return (photographersPostsArray);
}

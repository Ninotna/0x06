//Mettre le code JavaScript lié à la page photographer.html

document.addEventListener('DOMContentLoaded', (event) => {
	const params = new URLSearchParams(window.location.search);
	const photographerId = params.get('id');

	if (photographerId) {
		// Appeler une fonction pour charger les données du photographe
		loadPhotographerData(photographerId);
	}
});

function loadPhotographerData(id) {
	// Remplacer par votre logique pour récupérer les données du photographe
	console.log(`Chargement des données pour le photographe avec l'ID : ${id}`);
	
	
	fetch("./data/photographers.json")
		.then(response => response.json())
		.then(data => {
			console.log('Traitement des données');
			const photographer = data.photographers.find(ph => ph.id == id);
			if (photographer) {
				displayPhotographerData(photographer);
			} else {
				console.error('Photographe non trouvé');
			}
		})
		.catch(error => console.error('Erreur lors du chargement des données:', error));
		console.log('Fin de loadPhotographer');
}

function displayPhotographerData(data) {
	// Logique pour afficher les données du photographe sur la page
	console.log(data);
    
}
# Code du projet P6 FishEye - Parcours Javascript React

## Architecture JS du projet P6

/js
│
├── /components
│   ├── CarouselLightbox.js          // Gestion du carrousel pour la lightbox
│   ├── ContactModal.js              // Gestion spécifique de la modale de contact
│   └── PhotographerUiManager.js     // Gestion de l'interface utilisateur des photographes
│
├── /data
│   ├── PhotographerDataFetcher.js   // Gestion de la récupération des données des photographes
│   └── photographersApi.js          // Gestion des appels API pour les photographes
│
├── /factories
│   └── media.js                     // Gestion de la création des éléments média
│
├── /pages
│   ├── index.js                     // Script principal pour la page d'accueil
│   └── photographer.js              // Script principal pour la page du photographe
│
├── /templates
│   ├── photographerDirectory.js     // Gestion de la liste des photographes
│   └── photographerProfile.js       // Gestion du profil des photographes
│
├── /utils
│   ├── domUtils.js                  // Fonctions utilitaires pour la manipulation du DOM
│   ├── getParameters.js             // Fonction utilitaire pour obtenir les paramètres de l'URL
│   ├── PhotographerData.js          // Fonctions utilitaires pour la gestion des données des photographes
│   ├── PhotographerEventHandler.js  // Gestionnaire des événements liés aux photographes
│   ├── photographerSort.js          // Fonctions de tri pour les publications des photographes
│   └── photographerUtils.js         // Utilitaires pour les photographes (getUserInfos, getPostsOfUser)

## Description des Dossiers et Fichiers

### /components
Ce dossier contient les composants principaux de l'interface utilisateur, chacun étant responsable d'une partie spécifique de l'application.

- **CarouselLightbox.js** : Gère le carrousel pour afficher les images et vidéos dans la lightbox.
- **ContactModal.js** : Gère la modale de contact pour envoyer des messages aux photographes.
- **PhotographerUiManager.js** : Gère l'interface utilisateur des photographes, y compris la mise à jour de l'UI en fonction des interactions de l'utilisateur.

### /data
Ce dossier contient les modules responsables de la gestion des données.

- **PhotographerDataFetcher.js** : Gère la récupération des données des photographes depuis l'API.
- **photographersApi.js** : Gère les appels API pour récupérer les données des photographes et leurs publications.

### /factories
Ce dossier contient les modules responsables de la création dynamique des objets.

- **media.js** : Gère la création des éléments média (images ou vidéos) en fonction des données fournies.

### /pages
Ce dossier contient les scripts spécifiques aux pages de l'application.

- **index.js** : Script principal pour la page d'accueil, initialisant et orchestrant les composants de la page.
- **photographer.js** : Script principal pour la page du photographe, orchestrant les composants et initialisant la page.

### /templates
Ce dossier contient les modules responsables de la gestion des templates HTML pour les différentes sections de l'application.

- **photographerDirectory.js** : Gère l'affichage de l'annuaire des photographes.
- **photographerProfile.js** : Gère l'affichage et la mise à jour du profil des photographes.

### /utils
Ce dossier regroupe les fonctions utilitaires qui peuvent être utilisées dans l'ensemble du projet.

- **domUtils.js** : Fonctions utilitaires pour la manipulation du DOM, telles que la création et la gestion des éléments HTML.
- **getParameters.js** : Fonction utilitaire pour extraire les paramètres de l'URL.
- **PhotographerData.js** : Contient des fonctions utilitaires pour gérer les données spécifiques aux photographes.
- **PhotographerEventHandler.js** : Gestionnaire des événements liés aux photographes, comme les clics sur les boutons de tri ou de like.
- **photographerSort.js** : Fonctions de tri pour organiser les publications des photographes par popularité, date, ou titre.
- **photographerUtils.js** : Contient des fonctions spécifiques aux photographes, comme `getUserInfos` et `getPostsOfUser`.

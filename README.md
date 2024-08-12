# Base de code du projet P6 - Parcours Front-end

## Démarrer le projet

Rien à installer ici, il suffit d'ouvrir le fichier `index.html`.

Début du projet P6 Fisheye by Dev87 (Antonin)

Architecture JS du projet P6

/js
│
├── /components
│   ├── baseModal.js          // Classe de base pour toutes les modales
│   ├── lightboxModal.js      // Gestion spécifique de la modale lightbox
│   ├── contactModal.js       // Gestion spécifique de la modale de contact
│   ├── carousel.js           // Gestion du carrousel pour la lightbox
│   └── mediaHandler.js       // Gestion des éléments média (images, vidéos)
│
├── /factories
│   └── mediaFactory.js       // Gestion de la création des éléments média
│
├── /utils
│   ├── domUtils.js           // Fonctions utilitaires pour la manipulation du DOM
│   ├── eventUtils.js         // Fonctions utilitaires pour la gestion des événements
│   ├── photographerUtils.js  // Utilitaires pour les photographes (getUserInfos, getPostsOfUser)
│   └── getParameters.js      // Fonction utilitaire pour obtenir les paramètres de l'URL
│
├── /apis
│   └── photographersApi.js   // Gestion des appels API pour les photographes
│
├── /pages
│   ├── photographer.js       // Script principal pour la page du photographe
│
└── main.js                   // Point d'entrée principal pour l'initialisation

## Description des Dossiers et Fichiers

### `/components`

Ce dossier contient les composants principaux de l'interface utilisateur, chacun étant responsable d'une partie spécifique de l'application.

- **baseModal.js** : Classe de base pour toutes les modales, gérant les fonctionnalités communes comme l'ouverture et la fermeture.
- **lightboxModal.js** : Gère la modale de lightbox pour afficher les images et vidéos avec des fonctionnalités de carrousel.
- **contactModal.js** : Gère la modale de contact pour envoyer des messages aux photographes.
- **carousel.js** : Module pour gérer la navigation dans les images et vidéos au sein de la lightbox.
- **mediaHandler.js** : Gère l'affichage des éléments média (images ou vidéos) dans la lightbox.

### `/factories`

Ce dossier contient les modules responsables de la création dynamique des objets.

- **mediaFactory.js** : Gère la création des éléments média (images ou vidéos) en fonction des données fournies.

### `/utils`

Ce dossier regroupe les fonctions utilitaires qui peuvent être utilisées dans l'ensemble du projet.

- **domUtils.js** : Fonctions utilitaires pour la manipulation du DOM, telles que la création et la gestion des éléments HTML.
- **eventUtils.js** : Fonctions utilitaires pour la gestion des événements.
- **photographerUtils.js** : Contient des fonctions spécifiques aux photographes, comme `getUserInfos` et `getPostsOfUser`.
- **getParameters.js** : Fonction utilitaire pour extraire les paramètres de l'URL.

### `/apis`

Ce dossier contient les modules qui gèrent les interactions avec les APIs.

- **photographersApi.js** : Gère les appels API pour récupérer les données des photographes et leurs publications.

### `/pages`

Ce dossier contient les scripts spécifiques aux pages de l'application.

- **photographer.js** : Script principal pour la page du photographe, orchestrant les composants et initialisant la page.

### `main.js`

Le point d'entrée principal du projet. Ce fichier initialise l'application en appelant les fonctions principales lors du chargement de la page.

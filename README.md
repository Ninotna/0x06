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

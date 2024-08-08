class PhotographerProfileTemplate {
    constructor(card) {
      this.card = card;
    }
  
    	/**
	 * Crée la carte de profil pour le photographe
	 * @returns {HTMLElement} - La section du profil du photographe
	 */
	createProfileCard()
	{
		const { name, city, country, tagline, portrait } = this.card;

		// Récupérer le template
		const template = document.getElementById('profile-template');
		const clone = document.importNode(template.content, true);

		// Mettre à jour le contenu du clone
		clone.querySelector('.profile__name').textContent = name;
		clone.querySelector('.profile__location').textContent = `${city}, ${country}`;
		clone.querySelector('.profile__tagline').textContent = tagline;
		clone.querySelector('.profile__image').src = `./assets/Photographers/${portrait}`;
		clone.querySelector('.profile__image').alt = `Photo de profil du compte de: ${name}`;

		return clone;
	}

  
    /**
     * Crée la carte pour les publications du photographe
     * @returns {HTMLElement} - Le conteneur des publications
     */
    createPostsCard() {
      const { id, photographersId, title, image, video, likes, date } = this.card;
  
      // Créer le conteneur principal pour les publications
      const postContainer = document.createElement('div');
      postContainer.className = 'images__post-container';
      postContainer.setAttribute('data-post-id', id);
      postContainer.setAttribute('data-photographers-id', photographersId);
  
      const post = document.createElement('div');
      post.className = 'images__post';
  
      // Créer le lien pour la publication
      const link = document.createElement('a');
      link.href = '#';
      link.title = title;
  
      // Créer l'image de la publication
      if (image) {
        const imgElement = document.createElement('img');
        imgElement.className = 'images__image';
        imgElement.src = `./assets/images/${image}`;
        imgElement.alt = `'${title}' fait le ${date}`;
        link.appendChild(imgElement);
      }
  
      // Créer la vidéo de la publication
      if (video) {
        const videoElement = document.createElement('video');
        videoElement.className = 'images__video';
        videoElement.src = `./assets/videos/${video}`;
        videoElement.setAttribute('controls', 'true');
        link.appendChild(videoElement);
      }
  
      post.appendChild(link);
  
      // Créer le conteneur pour le texte de la publication
      const postTextContainer = document.createElement('div');
      postTextContainer.className = 'images__post-text';
  
      // Créer et ajouter la description de la publication
      const description = document.createElement('p');
      description.className = 'images__post-description';
      description.textContent = title;
  
      // Créer et ajouter le bouton des likes
      const likeButton = document.createElement('button');
      likeButton.className = 'images__post-like-button';
      likeButton.innerHTML = `${likes} <i class="fa-solid fa-heart"></i>`;
  
      postTextContainer.appendChild(description);
      postTextContainer.appendChild(likeButton);
  
      post.appendChild(postTextContainer);
      postContainer.appendChild(post);
  
      return postContainer;
    }
  }
  
  export default PhotographerProfileTemplate;
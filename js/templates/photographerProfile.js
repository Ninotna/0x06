class PhotographerProfileTemplate {
    constructor(card) {
      this.card = card;
    }
  
    /**
     * Crée la carte de profil pour le photographe
     * @returns {HTMLElement} - La section du profil du photographe
     */
    createProfileCard() {
      const { name, city, country, tagline, portrait } = this.card;
  
      // Créer la section principale pour le profil
      const section = document.createElement('section');
      section.className = 'main__profile-container';
  
      // Créer le conteneur de la carte de profil
      const cardContainer = document.createElement('div');
      cardContainer.className = 'profile__card-container';
  
      const card = document.createElement('div');
      card.className = 'profile__card';
  
      // Créer et ajouter le nom du photographe
      const nameElement = document.createElement('h1');
      nameElement.className = 'profile__name';
      nameElement.textContent = name;
  
      // Créer et ajouter la localisation
      const locationElement = document.createElement('p');
      locationElement.className = 'profile__location';
      locationElement.textContent = `${city}, ${country}`;
  
      // Créer et ajouter le slogan
      const taglineElement = document.createElement('p');
      taglineElement.className = 'profile__slogan';
      taglineElement.textContent = tagline;
  
      // Assembler les éléments de la carte
      card.appendChild(nameElement);
      card.appendChild(locationElement);
      card.appendChild(taglineElement);
      cardContainer.appendChild(card);
  
      // Créer le bouton de contact
      const contactContainer = document.createElement('div');
      contactContainer.className = 'profile__contact';
  
      const contactButton = document.createElement('button');
      contactButton.type = 'button';
      contactButton.className = 'button button--rounded';
      contactButton.textContent = 'Contactez-moi';
  
      contactContainer.appendChild(contactButton);
  
      // Créer le conteneur de l'image de profil
      const imageContainer = document.createElement('div');
      imageContainer.className = 'profile__image-container';
  
      const image = document.createElement('img');
      image.src = `./assets/images/Photographs Profile pictures/${portrait}`;
      image.alt = `Photo de profil du compte de: ${name}`;
      image.className = 'profile__image';
  
      imageContainer.appendChild(image);
  
      // Assembler la section complète
      section.appendChild(cardContainer);
      section.appendChild(contactContainer);
      section.appendChild(imageContainer);
  
      return section;
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
  
  
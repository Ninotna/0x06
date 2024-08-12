class Media {
    constructor(data) {
      // Validation des données fournies
      if (!data || typeof data !== 'object') {
        throw new Error('Les données fournies doivent être un objet valide.');
      }
  
      // Initialisation des propriétés
      this._id = data.id || null;
      this._photographersId = data.photographersId || null;
      this._title = data.title || '';
      this._image = data.image || null;
      this._video = data.video || null;
      this._likes = data.likes || 0;
      this._date = data.date ? new Date(data.date) : new Date();
      this._price = data.price || 0;
    }
  
    // Accesseurs pour les propriétés
    get id() {
      return this._id;
    }
    get photographersId() {
      return this._photographersId;
    }
    get title() {
      return this._title;
    }
    get image() {
      return this._image;
    }
    get video() {
      return this._video;
    }
    get likes() {
      return this._likes;
    }
    get date() {
      return this._date;
    }
    get price() {
      return this._price;
    }
  
    // Détermine le type de média
    get mediaType() {
      return this._image ? 'image' : 'video';
    }
  
    // Méthode pour incrémenter les likes
    addLike() {
      this._likes += 1;
    }
  
    // Logique pour construire un élément DOM
    build() {
      const element = document.createElement('div');
      element.className = 'media-item';
      element.innerHTML = `
        <h3>${this.title}</h3>
        <p>Type: ${this.mediaType}</p>
        <p>${this.likes} likes</p>
      `;
      return element;
    }
  }
  
class Photographer {
    constructor(data) {
      // Validation des données fournies
      if (!data || typeof data !== 'object') {
        throw new Error('Les données fournies doivent être un objet valide.');
      }
  
      // Initialisation des propriétés
      this._name = data.name || '';
      this._id = data.id || null;
      this._city = data.city || '';
      this._country = data.country || '';
      this._tagline = data.tagline || '';
      this._price = data.price || 0;
      this._portrait = data.portrait || '';
    }
  
    // Accesseurs pour les propriétés
    get name() {
      return this._name;
    }
    get id() {
      return this._id;
    }
    get city() {
      return this._city;
    }
    get country() {
      return this._country;
    }
    get tagline() {
      return this._tagline;
    }
    get price() {
      return this._price;
    }
    get portrait() {
      return this._portrait;
    }
  
    // Méthode pour obtenir le profil complet
    get fullProfile() {
      return `${this.name}, ${this.city}, ${this.country}`;
    }
  
    // Logique pour construire un élément DOM
    build() {
      const element = document.createElement('div');
      element.className = 'photographer-item';
      element.innerHTML = `
        <h3>${this.name}</h3>
        <p>${this.city}, ${this.country}</p>
        <p>${this.tagline}</p>
        <img src="${this.portrait}" alt="Portrait de ${this.name}">
      `;
      return element;
    }
  }
  
class ContactFormBuilder {
  constructor() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.message = "";
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setEmail(email) {
    this.email = email;
  }

  setMessage(message) {
    this.message = message;
  }

  getFormData() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      message: this.message,
    };
  }
}

class ContactModal {
  constructor(modalSelector) {
    this.modal = document.querySelector(modalSelector);
    this.titleElement = this.modal.querySelector(".contact__title");
    this.closeButton = this.modal.querySelector(
      ".contact__button-close-dialog"
    );
    this.formBuilder = new ContactFormBuilder(); // Initialisation de l'objet ContactFormBuilder
    this.formDataValidation = {
      firstName: false,
      lastName: false,
      email: false,
      message: false,
    };
    this.init();
  }

  init() {
    // Ajouter l'événement pour fermer la modale en cliquant sur le bouton de fermeture
    this.closeButton.addEventListener("click", () => this.closeModal());

    // Ajouter l'événement pour fermer la modale en cliquant en dehors du contenu
    this.modal.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.closeModal();
      }
    });

    // Ajouter l'événement pour la soumission du formulaire
    const form = this.modal.querySelector(".contact__form");
    form.addEventListener("submit", (e) => this.handleForm(e));

    // Ajouter les événements pour les inputs
    const inputs = this.modal.querySelectorAll(".contact__input");
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => this.handleInputs(e));
    });

    // Ajouter l'événement pour la zone de texte
    const textArea = this.modal.querySelector(".contact__text-area");
    textArea.addEventListener("input", (e) => this.handleInputs(e));
  }

  displayContactModal(fullName) {
    // Remplacement dynamique du nom dans le titre de la modale
    this.titleElement.innerHTML = `Contactez-moi <br /> ${fullName}`;

    // Affichage de la modale avec animation
    this.modal.classList.add("fade-in");
    this.modal.showModal();
    setTimeout(() => {
      this.modal.classList.remove("fade-in");
    }, 250);
  }

  closeModal() {
    // Ferme la modale avec une animation de disparition
    this.modal.classList.add("fade-out");
    setTimeout(() => {
      this.modal.classList.remove("fade-out");
      this.modal.close();
    }, 250);
  }

  // Méthodes handleForm, handleInputs, validateInput, validateTextArea

  handleForm(e) {
    e.preventDefault();

    const result = Object.values(this.formDataValidation);
    const invalidInputs = result.filter(isValid => !isValid);
    const validFormMessage = this.modal.querySelector(".contact__validated-form");
    const formElement = e.currentTarget;

    if (invalidInputs.length === 0) {
        formElement.classList.add("hide");
        validFormMessage.classList.remove("hide");
        console.log("Formulaire envoyé avec succès!", this.formBuilder.getFormData());

        // Affichage du message de confirmation avec les données
        const confirmationMessage = `
            <p>Merci, votre message a été envoyé avec succès !</p>
            <p>Nom : ${this.formBuilder.firstName} ${this.formBuilder.lastName}</p>
            <p>Email : ${this.formBuilder.email}</p>
            <p>Message : ${this.formBuilder.message}</p>
            </br>
            <p> Nous vous recontacterons sous peu</p>
            </br>
        `;
        validFormMessage.querySelector('p').innerHTML = confirmationMessage;
    } else {
        validFormMessage.classList.add("hide");
        formElement.classList.remove("hide");
        console.log("Erreur, certains champs sont incorrectement remplis");
    }
}

init() {
    // Ajouter l'événement pour fermer la modale en cliquant sur le bouton de fermeture
    this.closeButton.addEventListener('click', () => this.closeModal());

    // Ajouter l'événement pour fermer la modale en cliquant en dehors du contenu
    this.modal.addEventListener('click', (event) => {
        if (event.target === this.modal) {
            this.closeModal();
        }
    });

    // Ajouter l'événement pour la soumission du formulaire
    const form = this.modal.querySelector('.contact__form');
    form.addEventListener('submit', (e) => this.handleForm(e));

    // Ajouter les événements pour les inputs
    const inputs = this.modal.querySelectorAll('.contact__input');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => this.handleInputs(e));
    });

    // Ajouter l'événement pour la zone de texte
    const textArea = this.modal.querySelector('.contact__text-area');
    textArea.addEventListener('input', (e) => this.handleInputs(e));

    // Ajouter l'événement pour le bouton de réinitialisation du formulaire
    const resetButton = this.modal.querySelector('.contact__reset-button');
    resetButton.addEventListener('click', () => this.resetForm());
}

resetForm() {
    // Réinitialiser les valeurs du formulaire et les validations
    this.formBuilder = new ContactFormBuilder(); // Réinitialise l'objet formBuilder
    this.formDataValidation = {
        firstName: false,
        lastName: false,
        email: false,
        message: false
    };

    // Réinitialiser les champs du formulaire
    const form = this.modal.querySelector('.contact__form');
    form.reset();

    // Afficher de nouveau le formulaire et masquer le message de confirmation
    form.classList.remove('hide');
    this.modal.querySelector('.contact__validated-form').classList.add('hide');

    // Réinitialiser les classes des champs
    const inputs = this.modal.querySelectorAll('.contact__input, .contact__text-area');
    inputs.forEach(input => {
        input.classList.remove('valid-input', 'invalid-input');
    });
}


  handleInputs(event) {
    const inputElement = event.target;
    const valueOfInput = inputElement.value.trim(); // Suppression des espaces autour du texte
    const inputNameAttribute = inputElement.getAttribute("name");
    const containerOfInput = inputElement.closest(".contact__fieldset-section");
    const errorParagraph = containerOfInput.querySelector(
      ".contact__error-message"
    );

    const valueIsOverTwoCharsLong = valueOfInput.length >= 2;
    const valueHasTwoLetters = /[a-zA-Z].*[a-zA-Z]/.test(valueOfInput); // Vérifie qu'il y a au moins deux lettres
    const valueIsOverTenCharsLong = valueOfInput.length >= 10;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière plus stricte pour les emails

    switch (inputNameAttribute) {
      case "first-name":
      case "last-name": {
        const firstNameOrLastName =
          inputNameAttribute === "first-name" ? "firstName" : "lastName";

        if (valueIsOverTwoCharsLong && valueHasTwoLetters) {
          this.formDataValidation[firstNameOrLastName] = true;
          firstNameOrLastName === "firstName"
            ? this.formBuilder.setFirstName(valueOfInput)
            : this.formBuilder.setLastName(valueOfInput);
          this.validateInput(inputElement, true);
          inputElement.setAttribute("aria-invalid", "false");
          errorParagraph.classList.add("hide");
        } else {
          inputElement.setAttribute("aria-invalid", "true");
          this.formDataValidation[firstNameOrLastName] = false;
          this.validateInput(inputElement, false);
          errorParagraph.classList.remove("hide");
          errorParagraph.textContent =
            "Veuillez remplir ce champ avec au moins 2 caractères et 2 lettres";
        }
        break;
      }
      case "email": {
        if (emailRegex.test(valueOfInput)) {
          this.formDataValidation.email = true;
          this.validateInput(inputElement, true);
          errorParagraph.classList.add("hide");
          this.formBuilder.setEmail(valueOfInput);
          inputElement.setAttribute("aria-invalid", "false");
        } else {
          this.formDataValidation.email = false;
          inputElement.setAttribute("aria-invalid", "true");
          this.validateInput(inputElement, false);
          errorParagraph.classList.remove("hide");
          errorParagraph.textContent =
            "Veuillez entrer un email valide (ex. : pseudonyme@domaine.com)";
        }
        break;
      }
      case "message": {
        if (valueIsOverTenCharsLong) {
          this.formDataValidation.message = true;
          this.validateTextArea(inputElement, true);
          errorParagraph.classList.add("hide");
          this.formBuilder.setMessage(valueOfInput);
          inputElement.setAttribute("aria-invalid", "false");
        } else {
          this.formDataValidation.message = false;
          inputElement.setAttribute("aria-invalid", "true");
          this.validateTextArea(inputElement, false);
          errorParagraph.classList.remove("hide");
          errorParagraph.textContent =
            "Veuillez écrire un message avec au moins 10 caractères";
        }
        break;
      }
    }
  }

  validateInput(inputElement, inputValueIsValid) {
    if (inputValueIsValid) {
        inputElement.classList.remove("invalid-input");
        inputElement.classList.add("valid-input");
    } else {
        inputElement.classList.remove("valid-input");
        inputElement.classList.add("invalid-input");
    }
}

  validateTextArea(textAreaElement, textAreaValueIsValid) {
    if (textAreaValueIsValid) {
      textAreaElement.classList.remove("invalid-text-area");
      textAreaElement.classList.add("valid-text-area");
    } else {
      textAreaElement.classList.remove("valid-text-area");
      textAreaElement.classList.add("invalid-text-area");
    }
  }

  closeModalFadeOut() {
    this.modal.classList.add("fade-out");
    setTimeout(() => {
      this.modal.classList.remove("fade-out");
      this.modal.close();
    }, 250);
  }
}

// Exporte les classes pour utilisation dans d'autres modules
export { ContactModal, ContactFormBuilder };

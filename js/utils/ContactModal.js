class ContactFormBuilder
{
	constructor()
	{
		this.firstName = '';
		this.lastName = '';
		this.email = '';
		this.message = '';
	}

	setFirstName(firstName)
	{
		this.firstName = firstName;
	}

	setLastName(lastName)
	{
		this.lastName = lastName;
	}

	setEmail(email)
	{
		this.email = email;
	}

	setMessage(message)
	{
		this.message = message;
	}

	getFormData()
	{
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			message: this.message
		};
	}
}

class ContactModal
{
	constructor(modalSelector)
	{
		this.modal = document.querySelector(modalSelector);
		this.formDataValidation = {
			firstName: false,
			lastName: false,
			email: false,
			message: false
		};
		this.formBuilder = new ContactFormBuilder();
		this.init();
	}

	init()
	{
		const form = this.modal.querySelector(".contact__form");
		form.addEventListener("submit", this.handleForm.bind(this));

		const inputs = this.modal.querySelectorAll(".contact__input");
		inputs.forEach(input =>
		{
			input.addEventListener("change", this.handleInputs.bind(this));
		});
		const textArea = this.modal.querySelector(".contact__text-area");
		textArea.addEventListener("change", this.handleInputs.bind(this));

		const closeModalButton = this.modal.querySelector(".contact__button-close-dialog");
		closeModalButton.addEventListener("click", () =>
		{
			this.closeModalFadeOut();
		});
	}

	displayContactModal()
	{
		this.modal.classList.add("fade-in");
		setTimeout(() =>
		{
			this.modal.classList.remove("fade-in");
		}, 250);

		this.modal.showModal();
	}

	handleForm(e)
	{
		e.preventDefault();

		const result = Object.values(this.formDataValidation);
		const invalidInputs = result.filter(isValid => !isValid);
		const validFormMessage = document.querySelector(".contact__validated-form");

		if (invalidInputs.length === 0)
		{
			e.currentTarget.classList.add("hide");
			validFormMessage.classList.remove("hide");
			console.log("Formulaire envoyé avec succès!", this.formBuilder);
		}
		else
		{
			validFormMessage.classList.add("hide");
			e.currentTarget.classList.remove("hide");
			console.log("Erreur, certains champs sont incorrectement remplis");
		}
	}

	handleInputs(event)
	{
		const inputElement = event.target;
		const valueOfInput = inputElement.value;
		const inputNameAttribute = inputElement.getAttribute("name");
		const containerOfInput = inputElement.closest(".contact__fieldset-section");
		const errorParagraph = containerOfInput.querySelector(".contact__error-message");

		const valueIsOverTwoCharsLong = valueOfInput.length >= 2;
		const valueIsOverTenCharsLong = valueOfInput.length >= 10;
		const emailRegex = /^([a-zA-Z0-9.-]+)@([a-zA-Z0-9]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

		switch (inputNameAttribute)
		{
			case "name":
			{
				const firstNameOrLastName =
					inputElement.getAttribute("id") === "first-name" ? "firstName" : "lastName";

				if (valueIsOverTwoCharsLong)
				{
					this.formDataValidation[firstNameOrLastName] = true;
					firstNameOrLastName === "firstName"
						? this.formBuilder.setFirstName(valueOfInput)
						: this.formBuilder.setLastName(valueOfInput);
					this.validateInput(inputElement, true);
					inputElement.setAttribute("aria-invalid", "false");
					errorParagraph.classList.add("hide");
				}
				else
				{
					inputElement.setAttribute("aria-invalid", "true");
					this.formDataValidation[firstNameOrLastName] = false;
					this.validateInput(inputElement, false);
					errorParagraph.classList.remove("hide");
					errorParagraph.textContent = "Veuillez remplir ce champ avec au moins 2 caractères";
				}
				break;
			}
			case "email":
			{
				if (valueIsOverTwoCharsLong && emailRegex.test(valueOfInput))
				{
					this.formDataValidation.email = true;
					this.validateInput(inputElement, true);
					errorParagraph.classList.add("hide");
					this.formBuilder.setEmail(valueOfInput);
					inputElement.setAttribute("aria-invalid", "false");
				}
				else
				{
					this.formDataValidation.email = false;
					inputElement.setAttribute("aria-invalid", "true");
					this.validateInput(inputElement, false);
					errorParagraph.classList.remove("hide");
					errorParagraph.textContent = "Veuillez entrer un email sous ce format: pseudonyme@domaine.extension";
				}
				break;
			}
			case "message":
			{
				if (valueIsOverTenCharsLong)
				{
					this.formDataValidation.message = true;
					this.validateTextArea(inputElement, true);
					errorParagraph.classList.add("hide");
					this.formBuilder.setMessage(valueOfInput);
					inputElement.setAttribute("aria-invalid", "false");
				}
				else
				{
					this.formDataValidation.message = false;
					inputElement.setAttribute("aria-invalid", "true");
					this.validateTextArea(inputElement, false);
					errorParagraph.classList.remove("hide");
					errorParagraph.textContent = "Veuillez écrire un message avec au moins 10 caractères";
				}
				break;
			}
		}
	}

	validateInput(inputElement, inputValueIsValid)
	{
		if (inputValueIsValid)
		{
			inputElement.classList.remove("invalid-input");
			inputElement.classList.add("valid-input");
		}
		else
		{
			inputElement.classList.remove("valid-input");
			inputElement.classList.add("invalid-input");
		}
	}

	validateTextArea(textAreaElement, textAreaValueIsValid)
	{
		if (textAreaValueIsValid)
		{
			textAreaElement.classList.remove("invalid-text-area");
			textAreaElement.classList.add("valid-text-area");
		}
		else
		{
			textAreaElement.classList.remove("valid-text-area");
			textAreaElement.classList.add("invalid-text-area");
		}
	}

	closeModalFadeOut()
	{
		this.modal.classList.add("fade-out");
		setTimeout(() =>
		{
			this.modal.classList.remove("fade-out");
			this.modal.close();
		}, 250);
	}
}

// Initialisation de la modale de contact
const contactModal = new ContactModal(".contact__modal");

// Exemple d'utilisation pour ouvrir la modale
document.querySelector(".open-contact-modal-button").addEventListener("click", () =>
{
	contactModal.displayContactModal();
});

export {ContactModal, ContactFormBuilder};
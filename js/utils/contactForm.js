function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

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
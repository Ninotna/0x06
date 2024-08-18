// Exemple de fonction utilitaire pour le DOM
export function createElement(tag, className, attributes = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    return element;
}

export function cleanUpEventListeners() {
    // Exemple 1: Suppression des écouteurs d'événements sur les boutons "like"
    const likeButtons = document.querySelectorAll(".images__post-like-button");
    likeButtons.forEach(button => {
        const newButton = button.cloneNode(true); // Cloner le bouton sans les écouteurs d'événements
        button.replaceWith(newButton); // Remplacer l'ancien bouton par le nouveau
    });

    // Exemple 2: Suppression des écouteurs d'événements sur les éléments de tri
    const dropdownMenuItems = document.querySelectorAll(".dropdown-menu__list-item");
    dropdownMenuItems.forEach(item => {
        const newItem = item.cloneNode(true); // Cloner l'élément sans les écouteurs d'événements
        item.replaceWith(newItem); // Remplacer l'ancien élément par le nouveau
    });

    // Vous pouvez répéter ce modèle pour d'autres éléments qui nécessitent un nettoyage des écouteurs d'événements.
}

// scripts/index.js
// scripts/index.js

// 1. Array de tarjetas iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// 2. Mensajes para verificar que todo está bien
console.log("scripts/index.js conectado correctamente ✅");
console.log("initialCards:", initialCards);
console.log("Número de tarjetas iniciales:", initialCards.length);

// 3. Recorrer el array e imprimir solo los nombres en consola
initialCards.forEach((card) => {
  console.log(card.name);
});

// 4.  Elementos para el cuadro emergente "Editar perfil"

// Botón "Editar perfil"
const editProfileButton = document.querySelector(".profile__edit-button");

// Modal de "Editar perfil" (el popup con id="edit-popup")
const editProfileModal = document.querySelector("#edit-popup");

// Botón de cerrar (la X) dentro del modal
const closeEditProfileButton = editProfileModal.querySelector(".popup__close");

console.log("Botón Editar perfil:", editProfileButton);
console.log("Modal Editar perfil:", editProfileModal);
console.log("Botón Cerrar del modal:", closeEditProfileButton);

// 5. Funciones reutilizables para abrir y cerrar cualquier modal
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  console.log("Abriendo modal:", modal);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  console.log("Cerrando modal:", modal);
}

// 6. Escuchar los clics en los botones para abrir/cerrar el modal

// Abrir el modal cuando se hace clic en "Editar perfil"
editProfileButton.addEventListener("click", function () {
  // Antes de abrir el modal, copiar los valores actuales del perfil a los inputs
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  openModal(editProfileModal);
});

// Cerrar el modal cuando se hace clic en la X
closeEditProfileButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// 7. Elementos del perfil en la página
const profileName = document.querySelector(".profile__title"); // "Jacques Cousteau"
const profileDescription = document.querySelector(".profile__description"); // "Explorador"

// 8. Inputs dentro del popup "Editar perfil"
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description"
);

console.log("Nombre en el perfil:", profileName.textContent);
console.log("Descripción en el perfil:", profileDescription.textContent);
console.log("Input nombre:", nameInput);
console.log("Input descripción:", descriptionInput);

// 9. Formulario dentro del popup "Editar perfil"
const profileForm = editProfileModal.querySelector(".popup__form");

console.log("Formulario de edición de perfil:", profileForm);

// 10. Manejar el envío del formulario de edición de perfil
// Handler para el envío del formulario de edición de perfil
function handleProfileFormSubmit(evt) {
  // 1. Evitar que el formulario recargue la página
  evt.preventDefault();

  // 2. Actualizar los elementos del perfil con los valores de los inputs
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  // 3. Cerrar el modal después de guardar
  closeModal(editProfileModal);
}

// Conectar el handler al evento submit del formulario
profileForm.addEventListener("submit", handleProfileFormSubmit);

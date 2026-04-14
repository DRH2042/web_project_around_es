// scripts/index.js
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { validationConfig } from "./utils.js";

// --- Tarjetas iniciales ---
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

console.log("scripts/index.js conectado");

// --- Selección general de tarjetas ---
const cardsContainer = document.querySelector(".cards__list");

// --- Elementos del perfil y popup "Editar perfil" ---
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const closeEditProfileButton = editProfileModal.querySelector(".popup__close");

const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description"
);
const profileForm = editProfileModal.querySelector(".popup__form");

// --- Popup "Agregar tarjeta" ---
const addCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const closeNewCardButton = newCardPopup.querySelector(".popup__close");
const newCardForm = newCardPopup.querySelector("#new-card-form");
const placeTitleInput = newCardForm.querySelector("#place-title");
const placeLinkInput = newCardForm.querySelector("#place-link");

// --- Instancias de validación ---
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);

profileFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();

// --- Popup de imagen grande ---
const imagePopup = document.querySelector("#image-popup");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const closeImagePopupButton = imagePopup.querySelector(".popup__close");

// --- Funciones genéricas para popups ---

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
}
function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// --- Funciones relacionadas con tarjetas ---

function handleCardClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.generateCard();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsContainer.prepend(cardElement);
});

// --- Lógica del popup "Editar perfil" ---

// Abrir popup con los datos actuales
editProfileButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});
// Cerrar popup de perfil
closeEditProfileButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

// Guardar cambios del perfil
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// --- Lógica del popup "Agregar tarjeta" ---

// Abrir popup de nueva tarjeta
addCardButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

// Cerrar popup de nueva tarjeta
closeNewCardButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

// Crear nueva tarjeta desde el formulario
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: placeTitleInput.value,
    link: placeLinkInput.value,
  };

  const cardElement = createCard(cardData);
  cardsContainer.prepend(cardElement);

  newCardForm.reset();
  closeModal(newCardPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

// --- Lógica del popup de imagen grande ---

closeImagePopupButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

[editProfileModal, newCardPopup, imagePopup].forEach((popup) => {
  popup.addEventListener("mousedown", closeByOverlay);
});

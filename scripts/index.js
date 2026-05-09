// scripts/index.js
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
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

// --- Elementos del perfil y popup "Editar perfil" ---
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");

const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description"
);
const profileForm = editProfileModal.querySelector(".popup__form");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// --- Popup "Agregar tarjeta" ---
const addCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = newCardPopup.querySelector("#new-card-form");
const placeTitleInput = newCardForm.querySelector("#place-title");
const placeLinkInput = newCardForm.querySelector("#place-link");

// --- Instancias de validación ---
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);

profileFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();

// --- Popup de imagen grande ---

const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

// --- Funciones relacionadas con tarjetas ---

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

// --- Lógica del popup "Editar perfil" ---
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    description: inputValues.description,
  });

  editProfilePopup.close();
});

editProfilePopup.setEventListeners();

// Abrir popup con los datos actuales
editProfileButton.addEventListener("click", function () {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.description;

  profileFormValidator.resetValidation();

  editProfilePopup.open();
});

const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const cardData = {
    name: inputValues["place-name"],
    link: inputValues.link,
  };

  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);

  addCardPopup.close();
});

addCardPopup.setEventListeners();

// --- Lógica del popup "Agregar tarjeta" ---

// Abrir popup de nueva tarjeta
addCardButton.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  addCardPopup.open();
});

// scripts/index.js
import Api from "./Api.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { validationConfig } from "./utils.js";

let currentUserId;

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "5e12ce1d-c90e-4c0c-add3-4d6a9c042bd5",
    "Content-Type": "application/json",
  },
});

// --- Elementos del perfil y popup "Editar perfil" ---

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

// --- Popup "Cambiar avatar" ---
const profileAvatar = document.querySelector(".profile__image");
const avatarPopup = document.querySelector("#avatar-popup");
const avatarForm = avatarPopup.querySelector("#avatar-form");

// --- Instancias de validación ---
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

profileFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();
avatarFormValidator.setEventListeners();

// --- Popup de imagen grande ---

const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation(
  "#delete-card-popup",
  () => {}
);
deleteCardPopup.setEventListeners();

// --- Funciones relacionadas con tarjetas ---

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleLikeClick(card) {
  api
    .changeLikeCardStatus(card.getCardId(), card.isLiked())
    .then((updatedCard) => {
      card.setLikeStatus(updatedCard.isLiked);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteClick(card) {
  deleteCardPopup.setSubmitAction(() => {
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  deleteCardPopup.open();
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    currentUserId
  );

  return card.generateCard();
}

const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });

    profileAvatar.src = userData.avatar;

    cards.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// --- Lógica del popup "Editar perfil" ---

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  editProfilePopup.renderLoading(true);

  api
    .editProfile(inputValues)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
      });

      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
});
editProfilePopup.setEventListeners();

const avatarProfilePopup = new PopupWithForm("#avatar-popup", (inputValues) => {
  avatarProfilePopup.renderLoading(true);

  api
    .updateAvatar(inputValues)
    .then((userData) => {
      profileAvatar.src = userData.avatar;

      avatarProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarProfilePopup.renderLoading(false);
    });
});

avatarProfilePopup.setEventListeners();

// Abrir popup con los datos actuales
editProfileButton.addEventListener("click", function () {
  const currentUserInfo = userInfo.getUserInfo();

  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.description;

  profileFormValidator.resetValidation();

  editProfilePopup.open();
});

const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  addCardPopup.renderLoading(true);

  const cardData = {
    name: inputValues["place-name"],
    link: inputValues.link,
  };

  api
    .addNewCard(cardData)
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      cardSection.addItem(cardElement);

      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
});

addCardPopup.setEventListeners();

// --- Lógica del popup "Agregar tarjeta" ---

// Abrir popup de nueva tarjeta

addCardButton.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  addCardPopup.open();
});

profileAvatar.addEventListener("click", () => {
  avatarForm.reset();
  avatarFormValidator.resetValidation();
  avatarProfilePopup.open();
});

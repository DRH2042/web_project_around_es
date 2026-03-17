// scripts/index.js

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
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

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

// -- PROBANDO Validation Message “Por favor, rellena este campo.”--
const profileNameInput = profileForm.querySelector("#profile-name");

setProfileInputListener(profileNameInput);

const profileDescriptionInput = profileForm.querySelector(
  "#profile-description"
);

setProfileInputListener(profileDescriptionInput);

// --- Popup "Agregar tarjeta" ---
const addCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const closeNewCardButton = newCardPopup.querySelector(".popup__close");
const newCardForm = newCardPopup.querySelector("#new-card-form");
const placeTitleInput = newCardForm.querySelector("#place-title");
const placeLinkInput = newCardForm.querySelector("#place-link");

placeTitleInput.addEventListener("input", () => {
  showInputError(newCardForm, placeTitleInput);
  toggleNewCardButtonState();
});

placeLinkInput.addEventListener("input", () => {
  placeLinkInput.checkValidity();
  showInputError(newCardForm, placeLinkInput);
  toggleNewCardButtonState();
});

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

// Crea una tarjeta a partir de name y link
function getCardElement(name, link) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Me gusta
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  // Eliminar tarjeta
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  // Abrir imagen grande
  cardImage.addEventListener("click", function () {
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
  });

  return cardElement;
}

// Inserta una tarjeta en el contenedor (al inicio)
function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

// Renderizar tarjetas iniciales
initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

// --- Lógica del popup "Editar perfil" ---

// Abrir popup con los datos actuales
editProfileButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  toggleProfileButtonState();
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
  toggleNewCardButtonState();
  openModal(newCardPopup);
});

// Cerrar popup de nueva tarjeta
closeNewCardButton.addEventListener("click", function () {
  closeModal(newCardPopup);
});

// Crear nueva tarjeta desde el formulario
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = placeTitleInput.value;
  const link = placeLinkInput.value;

  renderCard(name, link, cardsContainer);
  newCardForm.reset();
  closeModal(newCardPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

// --- Lógica del popup de imagen grande ---

closeImagePopupButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

function showInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    inputElement.classList.add("popup__input_type_error"); // agrega rojo
    errorElement.textContent = inputElement.validationMessage;
  } else {
    inputElement.classList.remove("popup__input_type_error"); // quita rojo
    errorElement.textContent = "";
  }
}

function toggleProfileButtonState() {
  const saveButton = profileForm.querySelector(".popup__button");

  if (!profileForm.checkValidity()) {
    saveButton.disabled = true;
    saveButton.classList.add("popup__button_disabled");
  } else {
    saveButton.disabled = false;
    saveButton.classList.remove("popup__button_disabled");
  }
}

function toggleNewCardButtonState() {
  const createButton = newCardForm.querySelector(".popup__button");

  if (!newCardForm.checkValidity()) {
    createButton.disabled = true;
    createButton.classList.add("popup__button_disabled");
  } else {
    createButton.disabled = false;
    createButton.classList.remove("popup__button_disabled");
  }
}

function setProfileInputListener(inputElement) {
  inputElement.addEventListener("input", () => {
    showInputError(profileForm, inputElement);
    toggleProfileButtonState();
  });
}

[editProfileModal, newCardPopup, imagePopup].forEach((popup) => {
  popup.addEventListener("mousedown", closeByOverlay);
});

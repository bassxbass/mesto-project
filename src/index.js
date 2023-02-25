import "./styles/index.css";

import { handleProfileFormSubmit } from "./components/modal.js";
import { enableValidation, toggleButtonState } from "./components/validate.js";
import {
  handleAddCardFormSubmit,
  addCard,
  createCard,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/utils.js";

const cards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const cardTemplate = document.querySelector(".card__template").content;
export const cardSection = document.querySelector(".cards");

export const imagePopup = document.querySelector(".popup_type_photo");
export const imagePopupImage = imagePopup.querySelector(".card-opened__image");
export const imagePopupText = imagePopup.querySelector(".card-opened__name");
const imagePopupClose = imagePopup.querySelector(
  ".container__close-button_type_photo"
);

const fullForm = {
    formSelector: ".container__form",
    inputSelector: ".container__input",
    submitButtonSelector: ".container__save-button",
    inactiveButtonClass: "container__save-button_inactive",
    inputErrorClass: "container__input_type_error",
    errorClass: "container__input-error_active",
};

const formElementProfile = document.querySelector(".container__form_type_profile");

export const nameInput = formElementProfile.querySelector(
  ".container__input_type_name"
);
export const jobInput = formElementProfile.querySelector(
  ".container__input_type_info"
);

export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__text");

const editButton = document.querySelector(".profile__edit-button");
export const editPopup = document.querySelector(".popup_type_edit");
const closeEditButton = document.querySelector(
  ".container__close-button_type_edit"
);

const formElementAddCard = document.querySelector(".container__form_type_add");
export const imageNameInput = formElementAddCard.querySelector(
  ".container__input_type_name"
);
export const linkInput = formElementAddCard.querySelector(
  ".container__input_type_info"
);

const addButton = document.querySelector(".profile__add-button");
export const addPopup = document.querySelector(".popup_type_add");
const closeAddButton = document.querySelector(".container__close-button_type_add");

//загружаем 6 карточек с фото
cards.forEach(function (item) {
  addCard(createCard(item.link, item.name));
});

//открытие формы для редактирования профиля
editButton.addEventListener("click", function () {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// закрытие попапов на крестик
function сlosePopup(buttonElement, popupElement) {
  buttonElement.addEventListener("mousedown", function () {
    closePopup(popupElement);
  });
}

сlosePopup(imagePopupClose, imagePopup);
сlosePopup(closeAddButton, addPopup);
сlosePopup(closeEditButton, editPopup);

// закрытие попапов на оверлей
function сlosePopupHandler(popupElement) {
  popupElement.addEventListener("mousedown", function (evt) {
    const target = evt.target;
    if (!target.closest(".container") && !target.closest(".container__form") && !target.closest(".card-opened")) {
      closePopup(popupElement);
    }
  });
}

сlosePopupHandler(editPopup);
сlosePopupHandler(addPopup);
сlosePopupHandler(imagePopup);

//редактируем профиль
formElementProfile.addEventListener("submit", handleProfileFormSubmit);


//открытие формы для добавления карточки
addButton.addEventListener("click", function () {
  openPopup(addPopup);
  formElementAddCard.reset();

  const inputListAddPopup = Array.from(
    addPopup.querySelectorAll(".container__input")
  );
  const buttonAddPopup = addPopup.querySelector(".container__save-button");

  toggleButtonState(inputListAddPopup, buttonAddPopup, fullForm);
});


//добавление карточки с фото
formElementAddCard.addEventListener("submit", handleAddCardFormSubmit);


//валидация форм
enableValidation(fullForm);

import "./styles/index.css";

import {
  handleProfileFormSubmit,
  handleProfilePhotoFormSubmit,
} from "./components/modal.js";
import { enableValidation, toggleButtonState } from "./components/validate.js";
import {
  handleAddCardFormSubmit,
  addCard,
  createCard,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/utils.js";
import { getProfileInfo, getCards } from "./components/api";

export const cardTemplate = document.querySelector(".card__template").content;
export const cardSection = document.querySelector(".cards");

export const imagePopup = document.querySelector(".popup_type_photo");
export const imagePopupImage = imagePopup.querySelector(".card-opened__image");
export const imagePopupText = imagePopup.querySelector(".card-opened__name");
const imagePopupClose = imagePopup.querySelector(
  ".container__close-button_type_photo"
);

const formElementProfile = document.querySelector(".container__form_type_profile");
export const nameInput = formElementProfile.querySelector(
  ".container__input_type_name"
);
export const jobInput = formElementProfile.querySelector(
  ".container__input_type_info"
);
export const saveProfile = formElementProfile.querySelector(
  ".container__save-button"
);

export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__text");
export const profileImage = document.querySelector(".profile__avatar");

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
export const saveCard = formElementAddCard.querySelector(
  ".container__save-button"
);

const addButton = document.querySelector(".profile__add-button");
export const addPopup = document.querySelector(".popup_type_add");
const closeAddButton = document.querySelector(".container__close-button_type_add");

const photoEdit = document.querySelector(".profile__avatar_position_hover");
export const photoEditPopup = document.querySelector(
  ".popup_type_profile-photo"
);
const photoEditCloseButton = document.querySelector(
  ".container__close-button_type_profile-photo"
);
const photoEditForm = document.querySelector(
  ".container__form_type_profile-photo"
);
export const photoInput = photoEditForm.querySelector(
  ".container__input_type_info"
);
export const savePhoto = photoEditForm.querySelector(".container__save-button");

const fullForm = {
  formSelector: ".container__form",
  inputSelector: ".container__input",
  submitButtonSelector: ".container__save-button",
  inactiveButtonClass: "container__save-button_inactive",
  inputErrorClass: "container__input_type_error",
  errorClass: "container__input-error_active",
};

export let userID;

//Загрузка профиля и карточек с сервера
Promise.all([getProfileInfo(), getCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.src = userData.avatar;
    profileImage.alt = userData.name;
    userID = userData._id;

    cards.reverse().forEach(function (item) {
      addCard(
        createCard(item.link, item.name, item.likes, item.owner._id, item._id)
      );
    });
  })
  .catch((err) => {
    console.log(err);
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
сlosePopup(photoEditCloseButton, photoEditPopup);


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
сlosePopupHandler(photoEditPopup);


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

photoEditForm.addEventListener("submit", handleProfilePhotoFormSubmit);

//Открытие формы для изменения фотографии профиля
photoEdit.addEventListener("click", function () {
  openPopup(photoEditPopup);
  photoEditForm.reset();

  const inputListphotoEditPopup = Array.from(
    photoEditPopup.querySelectorAll(".container__input")
  );
  const buttonphotoEditPopup = photoEditPopup.querySelector(
    ".container__save-button"
  );

  toggleButtonState(inputListphotoEditPopup, buttonphotoEditPopup, fullForm);
});


//валидация форм
enableValidation(fullForm);

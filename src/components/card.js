//создаём карточку
import {
  cardSection,
  cardTemplate,
  imagePopupImage,
  imagePopupText,
  imagePopup,
  addPopup,
  linkInput,
  imageNameInput,
} from "../index.js";

import { openPopup, closePopup } from "./utils.js";

export function addCard(card) {
  cardSection.prepend(card);
}

export function createCard(link, name) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  card.querySelector(".card__name").textContent = name;

  card.querySelector(".card__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like_active");
  });

  card.querySelector(".card__delete").addEventListener("click", function (evt) {
    evt.target.closest(".card").remove();
  });

  cardImage.addEventListener("click", function () {
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupText.textContent = name;
    openPopup(imagePopup);
  });
  return card;
}

export function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  addCard(createCard(linkInput.value, imageNameInput.value));

  closePopup(addPopup);
}

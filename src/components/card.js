//создаём карточку
import {
  cardSection,
  cardTemplate,
  cardOpenedImage,
  cardOpenedText,
  cardOpened,
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

  card.querySelector(".card__image").src = link;
  card.querySelector(".card__image").alt = name;
  card.querySelector(".card__name").textContent = name;

  card.querySelector(".card__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like_active");
  });

  card.querySelector(".card__delete").addEventListener("click", function (evt) {
    evt.target.closest(".card").remove();
  });

  card.querySelector(".card__image").addEventListener("click", function () {
    cardOpenedImage.src = link;
    cardOpenedImage.alt = name;
    cardOpenedText.textContent = name;
    openPopup(cardOpened);
  });
  return card;
}

export function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  addCard(createCard(linkInput.value, imageNameInput.value));

  closePopup(addPopup);
}

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
  saveCard,
  userID,
} from "../index.js";

import { openPopup, closePopup } from "./utils.js";
import { appendCard, deleteCard, putLike, deleteLike } from "./api.js";

export function addCard(card) {
  cardSection.prepend(card);
}

export function createCard(link, name, likes, owner, id) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardLikeNumber = card.querySelector(".card__like-number");
  const cardImage = card.querySelector(".card__image");
  const cardHeart = card.querySelector(".card__like");
  // const deleteButton = card.querySelector(".card__delete"); до задание

  cardImage.src = link;
  cardImage.alt = name;
  card.querySelector(".card__name").textContent = name;
  cardLikeNumber.textContent = likes.length;

  cardHeart.addEventListener("click", function (evt) {
    if (!evt.target.classList.contains("card__like_active")) {
      putLike(id)
        .then((res) => {
          cardLikeNumber.textContent = res.likes.length;
          evt.target.classList.toggle("card__like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteLike(id)
        .then((res) => {
          cardLikeNumber.textContent = res.likes.length;
          evt.target.classList.toggle("card__like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  if (
    likes.some(function (id) {
      return id._id === userID;
    })
  ) {
    if (!cardHeart.classList.contains("card__like_active")) {
      cardHeart.classList.add("card__like_active");
    }
  }

  if (owner === userID) {
    card
      .querySelector(".card__delete")
      .addEventListener("click", function (evt) {
        deleteCard(id)
          .then(() => {
            evt.target.closest(".card").remove();
          })
          .catch((err) => {
            console.log(err);
          });
      });
  } else {
    card.querySelector(".card__delete").remove();
  }
  // доп задание
  // deleteButton.addEventListener('click', () => {
  //   // Открываем окно с подтверждением удаления
  //   const confirmDelete = confirm(openPopup);
  //   if (confirmDelete) {
  //     // Удаляем карточку
  //     card.remove();
  //   } else {

  //   }
  // });

  cardImage.addEventListener("click", function () {
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupText.textContent = name;
    openPopup(imagePopup);
  });
  return card;
}

export function handleAddCardFormSubmit(evt) {
  saveCard.textContent = "Создание...";
  evt.preventDefault();

  appendCard(imageNameInput.value, linkInput.value)
    .then((res) => {
      addCard(
        createCard(res.link, res.name, res.likes, res.owner._id, res._id)
      );
      closePopup(addPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveCard.textContent = "Создать";
    });
}

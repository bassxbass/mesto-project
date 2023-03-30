import { cardTemplate } from "./constants.js";

export default class Card {
  constructor(
    name,
    link,
    ownerId,
    userID,
    cardId,
    likes,
    selector,
    { delLikeHandler, putLikeHandler, delCardHandler, openCardHandler }
  )
  {   // Инициализация свойств карточки
      (this.name = name),
      (this.link = link),
      (this.ownerId = ownerId),
      (this.userID = userID),
      (this.cardId = cardId),
      (this.likes = likes),
      (this.selector = selector),
      (this._delLikeHandler = delLikeHandler),
      (this._putLikeHandler = putLikeHandler),
      (this._delCardHandler = delCardHandler),
      (this._openCardHandler = openCardHandler);
    // Клонирование шаблона карточки и сохранение элементов в свойствах объекта
    this.card = cardTemplate.querySelector(this.selector).cloneNode(true);
    this.cardImage = this.card.querySelector(".card__image");
    this.cardTrash = this.card.querySelector(".card__delete");
    this.cardHeart = this.card.querySelector(".card__like");
    this.cardLikeNumber = this.card.querySelector(".card__like-number");
    this.cardLikeContainer = this.card.querySelector(".card__like-container");
  }


  // Добавление данных карточки в DOM
  _addCardInfo() {
    this.cardImage.src = this.link;
    this.card.querySelector(".card__name").textContent = this.name;
    this.cardImage.alt = this.name;
  }

  // Проверка, стоял ли уже наш лайк у карточки
  _cardHeart() {
    this.likes.forEach((element) => {
      if (this.userID == element._id) {
        this.cardHeart.classList.add("card__like_active");
      }
    });
  }

  // Проверка, если карточка не наша, убираем иконку удаления карточки
  _checkCardOwner() {
    if (this.userID !== this.ownerId) {
      this.cardTrash.classList.add("card__delete_disabled");
    }
  }

  // Изменение видимости количества лайков карточки в DOM
  _cardLikeVisibility() {
    if (this.likes.length !== 0) {
      this.cardLikeNumber.textContent = this.likes.length;
    } else {
      this.cardLikeNumber.style.display = "none";
    }
  }

  // создание новой карточки
  createNewCard() {
    // Изменяем отображение количества лайков в DOM, в зависимости от их наличия
    this._cardLikeVisibility();

    // функция проверки лайка
    this._cardHeart();

    // Вызываем функцию для проверки, является ли текущий пользователь владельцем карточки
    this._checkCardOwner();

    // Добавляем информацию о карточке в DOM
    this._addCardInfo();

    // Добавляем слушатель события на кнопку лайка, чтобы пользователь мог поставить или убрать лайк
    this.cardHeart.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("card__like_active")) {
        this._delLikeHandler(
          this.cardId,
          evt,
          this.cardLikeNumber,
          this.cardLikeContainer
        );
      } else {
        this._putLikeHandler(
          this.cardId,
          evt,
          this.cardLikeNumber,
          this.cardLikeContainer
        );
      }
    });

    // Добавляем слушатель события на фотографию карточки, чтобы пользователь мог увеличить ее в попапе
    this.cardImage.addEventListener("click", () => {
      this._openCardHandler(this.name, this.link);
    });

    // Добавляем слушатель события на кнопку удаления карточки
    this.cardTrash.addEventListener("click", (evt) => {
      this._delCardHandler(this.cardId, evt);
    });

    // Возвращаем готовую карточку
    return this.card;
  }
}

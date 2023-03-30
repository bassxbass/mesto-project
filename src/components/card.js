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
    this.post = cardTemplate.querySelector(this.selector).cloneNode(true);
    this.postImage = this.post.querySelector(".card__image");
    this.cardTrash = this.post.querySelector(".card__delete");
    this.buttonLike = this.post.querySelector(".card__like");
    this.likeCount = this.post.querySelector(".card__like-number");
    this.likeContainer = this.post.querySelector(".card__like-container");
  }


  // Добавление данных карточки в DOM
  _addDomCardInfo() {
    this.postImage.src = this.link;
    this.post.querySelector(".card__name").textContent = this.name;
    this.postImage.alt = this.name;
  }

  // Проверка, стоял ли уже наш лайк у карточки
  _checkActiveLike() {
    this.likes.forEach((element) => {
      if (this.userID == element._id) {
        this.buttonLike.classList.add("card__like_active");
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
  _changeLikeVisibility() {
    if (this.likes.length !== 0) {
      this.likeCount.textContent = this.likes.length;
    } else {
      this.likeCount.style.display = "none";
    }
  }

  // создание новой карточки
  createNewPost() {
    // Изменяем отображение количества лайков в DOM, в зависимости от их наличия
    this._changeLikeVisibility();

    // функция проверки лайка
    this._checkActiveLike();

    // Вызываем функцию для проверки, является ли текущий пользователь владельцем карточки
    this._checkCardOwner();

    // Добавляем информацию о карточке в DOM
    this._addDomCardInfo();

    // Добавляем слушатель события на кнопку лайка, чтобы пользователь мог поставить или убрать лайк
    this.buttonLike.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("card__like_active")) {
        this._delLikeHandler(
          this.cardId,
          evt,
          this.likeCount,
          this.likeContainer
        );
      } else {
        this._putLikeHandler(
          this.cardId,
          evt,
          this.likeCount,
          this.likeContainer
        );
      }
    });

    // Добавляем слушатель события на фотографию карточки, чтобы пользователь мог увеличить ее в попапе
    this.postImage.addEventListener("click", () => {
      this._openCardHandler(this.name, this.link);
    });

    // Добавляем слушатель события на кнопку удаления карточки
    this.cardTrash.addEventListener("click", (evt) => {
      this._delCardHandler(this.cardId, evt);
    });

    // Возвращаем готовую карточку
    return this.post;
  }
}

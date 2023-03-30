import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // Инициализация экземпляра класса PopupWithImage, унаследованного от класса Popup
    // Нахождение необходимых элементов для работы с ними
    this._image = this._popup.querySelector(".card-opened__image");
    this._title = this._popup.querySelector(".card-opened__name");
  }
  
  // Открытие попапа с передачей ссылки и имени изображения
  open(name, link) {
    // Заполнение контента попапа изображениями и соответствующими данными
    this._image.src = link;
    this._title.textContent = name;
    this._image.alt = name;

    // Вызов метода open родительского класса для открытия попапа
    super.open();
  }
}

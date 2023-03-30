export default class Popup {
  constructor(popupSelector) {
    // Ищем элемент с идентификатором, переданным в конструктор класса и записываем его в свойство класса _popup
    this._popup = document.getElementById(popupSelector).closest(".popup");
    // Привязываем метод close к экземпляру класса
    this.closePopup = this.closePopup.bind(this);
  }

  openPopup() {
    // Добавляем класс "popup_opened" для показа попапа
    this._popup.classList.add("popup_opened");
    // Добавляем обработчик события нажатия клавиши на весь документ для закрытия попапа на клавишу Esc
    document.addEventListener("keydown", this._closeByEscape);
  }

  closePopup() {
    // Удаляем класс "popup_opened" для скрытия попапа
    this._popup.classList.remove("popup_opened");
    // Удаляем обработчик события нажатия клавиши на весь документ для закрытия попапа на клавишу Esc
    document.removeEventListener("keydown", this._closeByEscape);
  }

  // Обработчик события нажатия клавиши на весь документ для закрытия попапа на клавишу Esc
  _closeByEscape = (evt) => {
    if (evt.key === "Escape") {
      if (document.querySelector(".popup_opened")) {
        // Вызываем метод close, чтобы закрыть попап
        this.closePopup();
      }
    }
  };

  // Обработчик события нажатия на оверлей для закрытия попапа
  _closeByOverlay = (evt) => {
    if (
      evt.target.classList.contains("popup_opened") || evt.target.classList.contains("container__close-button")
    ) {
      // Вызываем метод close, чтобы закрыть попап
      this.closePopup();
    }
  };

  setEventListeners() {
    // Добавляем обработчик события клика на оверлей, чтобы закрыть попап
    this._popup.addEventListener("click", (evt) => this._closeByOverlay(evt));
  }
}

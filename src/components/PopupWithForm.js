import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
    this._inputList = this._popup.querySelectorAll(".container__input");
    this._button = this._popup.querySelector(".container__save-button");
    this._formPopup = this._popup.querySelector(".container__form");
  }
  // Получение значений всех инпутов формы
  _getInputValues() {
    const inputValuesList = [];
    this._inputList.forEach((item) => {
      inputValuesList.push(item.value);
    });

    return inputValuesList;
  }

  setEventListeners() {
    super.setEventListeners();// вызов метода из родительского класса
    // добавляем обработчик на событие submit
    this._formPopup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // вызов функции callback из переданных параметров с передачей значений инпутов
      this._callback(this._getInputValues());
    });
  }

  // переопределяем метод закрытия попапа
  close() {
    super.close();
    // сброс формы при закрытии попапа
    this._formPopup.reset();
  }
}

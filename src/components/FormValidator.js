export default class FormValidator {
  constructor(fullForm, popupForm) {
    // Присваивание свойствам класса значений аргументов конструктора
    this.fullForm = fullForm;
    this._popupForm = popupForm;
    // Получение списка инпутов формы и преобразование его в массив
    this._inputList = this._popupForm.querySelectorAll(this.fullForm.inputSelector);
    this._inputListArray = Array.from(this._inputList);
    // Получение кнопки submit формы
    this._submitButton = this._popupForm.querySelector(this.fullForm.submitButtonSelector);
    // Получение списка элементов для вывода ошибок и присвоение их свойствам класса
    this._errorList = this._popupForm.querySelectorAll(this.fullForm.errorSpanSelector);
  }

  // Отображение сообщения об ошибке для переданного инпута
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.fullForm.inputErrorClass);
    errorElement.classList.add(this.fullForm.errorClass);
    errorElement.textContent = errorMessage;
  };

  // Скрытие сообщения об ошибке для переданного инпута
  _hideInputError = (inputElement) => {
    const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.fullForm.inputErrorClass);
    errorElement.classList.remove(this.fullForm.errorClass);
    // Очистка текста ошибки
    errorElement.textContent = "";
  };

  // Проверка валидности переданного инпута и отображение/скрытие сообщения об ошибке
  _checkInputValidity = (inputElement) => {
    // Проверка соответствия значения инпута шаблону валидации
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    // Если инпут не валиден - отображение сообщения об ошибке, иначе - скрытие
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Проверка наличия невалидных инпутов
  _hasInvalidInput = () => {
    // Проверка каждого инпута на валидность
    return this._inputListArray.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Включение/отключение состояния кнопки submit в зависимости от наличия невалидных инпутов
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      // Если есть невалидные инпуты - отключение кнопки и добавление соответствующих классов
      this._submitButton.classList.add(this.fullForm.inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "disabled");
    } else {
      // Если все инпуты валидны - включение кнопки и удаление соответствующих классов
      this._submitButton.classList.remove(this.fullForm.inactiveButtonClass);
      this._submitButton.removeAttribute("disabled", "disabled");
    }
  };

  // Метод для установки обработчиков событий на инпуты формы
  _setEventListeners = () => {
    // Устанавливаем состояние кнопки submi
    this._toggleButtonState();
    this._inputListArray.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);// Проверяем валидность инпута
        this._toggleButtonState();// Обновляем состояние кнопки submit
      });
    });
  };

  // Метод для включения валидации формы
  enableValidation = () => {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();// Отменяем действие по умолчанию при отправке формы
    });

    this._setEventListeners();// Устанавливаем обработчики событий на инпуты
  };

  // Метод для сброса формы к изначальному состоянию
  resetForm = () => {
    this._errorList.forEach((errorElement) => {
      errorElement.classList.remove(this.fullForm.errorClass);// Удаляем классы ошибок
    });
    this._inputList.forEach((errorInput) => {
      errorInput.classList.remove(this.fullForm.inputErrorClass);// Удаляем классы ошибок
    });

    this._disableButton();// Отключаем кнопку submit
  };

  // Метод для отключения кнопки submit и добавления соответствующих классов
  _disableButton = () => {
    this._submitButton.classList.add("container__save-button_inactive");
    this._submitButton.setAttribute("disabled", "disabled");
  };
}

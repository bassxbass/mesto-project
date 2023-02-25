//валидация
function showInputError(formElement, inputElement, errorMessage, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

function hideInputError(formElement, inputElement, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(selectors.errorClass);
}

function isValid(formElement, inputElement, selectors) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,

      inputElement.dataset.errorMessage,
      inputElement.validationMessage,
      selectors
    );
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
}

function hasInvalidInput(inputList, selectors) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList, selectors)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

function setEventListeners(formElement, selectors) {
  const inputList = Array.from(
    formElement.querySelectorAll(selectors.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    selectors.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, selectors);

      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
}

export function enableValidation(selectors) {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, selectors);
  });
}

import "./styles/index.css";

import {
    cardSection,
    editNameInput,
    editAboutInput,
    postNameInput,
    postLinkInput,
    profileName,
    profileAbout,
    userAvatar,
    avatarLinkInput,
    popupAddPost,
    popupEditor,
    popupAvatar,
    popupEditProfileOpenButton,
    popupAvatarOpenButton,
    popupAddPostOpenButton,
} from "./components/constants.js"

import Api from "./components/api.js"
import Card from './components/card.js'
import FormValidator from "./components/FormValidator.js"
import UserInfo from "./components/userinfo.js"
import Section from "./components/section.js"
import PopupWithForm from "./components/PopupWithForm.js"
import PopupWithImage from "./components/PopupWithImage.js"

let userID

// создание профиля нашего пользователя
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: "22162963-fa24-4ef5-ad47-93b0e908a5f5",
    "Content-Type": "application/json",
    }
});

const userInfo = new UserInfo(profileName, profileAbout, userAvatar, api);
const popupImage = new PopupWithImage("popup_type_photo-container");
const section = new Section({ renderer: render }, cardSection)


// Функция для добавления количества лайков на страницу в виде текста
// Принимает объект и количество лайков в качестве аргументов
function addDomLike(obj, likeCount) {
    // Если в объекте всего один лайк
    if (obj.likes.length == 1) {
      // Показать количество лайков и установить текстовое содержимое элемента likeCount
        likeCount.style.display = "block"
        likeCount.textContent = obj.likes.length;
    } else {
        // Установить текстовое содержимое элемента likeCount
        likeCount.textContent = obj.likes.length
    }
}

// Удаление лайка из DOM
function delDomLike(obj, likeCount) {
    if (obj.likes.length == 0) {// Проверяем, есть ли лайки у объекта (карточки)
        likeCount.style.display = "none" // Если лайков нет, скрываем счетчик лайков
    } else {
        likeCount.textContent = obj.likes.length // Иначе, записываем в счетчик количество
    }
}

// Удаление карточки из DOM
function delDomCard(evt) {
    evt.target.closest(".card").remove()// Удаляем родительский элемент кнопки удаления
}


// Удаление лайка с сервера и из DOM
function delLikeHandler(cardId, evt, likeCount, likeContainer) {
    api.deleteLike(cardId) // Выполняем запрос на сервер для удаления лайка
        .then((res) => {
            evt.target.classList.remove("card__like_active") // Удаляем активный класс у кнопки лайка
            delDomLike(res, likeCount, likeContainer) // Обновляем информацию о лайке на странице
        })
        .catch((error) => {
            console.log(error);
        })
}

// Добавление лайка на сервер и в DOM
function putLikeHandler(cardId, evt, likeCount, likeContainer) {
    api.putLike(cardId) // Выполняем запрос на сервер для добавления лайка
        .then((res) => {
            evt.target.classList.add("card__like_active") // Добавляем активный класс кнопке лайка
            addDomLike(res, likeCount, likeContainer) // Обновляем информацию о лайке на странице
        })
        .catch((error) => {
            console.log(error);
        })
}

// Удаление карточки с сервера и из DOM
function delCardHandler(cardId, evt) {
    api.deleteCard(cardId) // Выполняем запрос на сервер для удаления карточки
        .then(() => {
            delDomCard(evt) // Удаляем карточку на странице
        })
        .catch((error) => {
            console.log(error);
        })
}
// Создание новой карточки
function createCard(item) {
    const cardElement = new Card(item.name,item.link, item.owner._id, userID, item._id, item.likes, '.card', {
        delLikeHandler,
        putLikeHandler,
        delCardHandler,
        openCardHandler: (name, link) => {
            popupImage.open(name, link)

        }
    })
  return cardElement.createNewPost() // Создание карточки и возврат ее элемента
}

// Селекторы попапов
const fullForm = {
    formSelector: '.container__form',
    inputSelector: '.container__input',
    submitButtonSelector: '.container__save-button',
    inactiveButtonClass: 'container__save-button_inactive',
    inputErrorClass: 'window__input_type_error',
    errorClass: 'container__input-error_active',
    errorSpanSelector: '.container__input-error'
}

function render(item) {
  cardSection.append(item) // Добавление элемента на страницу
}

// Выполнение Promise.all, чтобы получить данные о пользователе и карточки
Promise.all([userInfo.getUserInfo(), api.getCards()])
  .then((data) => {
    // Редактирование информации пользователя на странице
    editNameInput.textContent = data[0].name;
    editAboutInput.textContent = data[0].about;
    avatarLinkInput.value = "";

    // Установка информации о пользователе в объекте userInfo и получение ID пользователя
    userInfo.setUserInfo(data[0]);
    userID = userInfo.getUserId();

    // Создание карточек из полученных данных и добавление их в секцию на странице
    const items = [];
    data[1].forEach((item) => {
      items.push(createCard(item));
    });
    section.renderAll(items);
  })
  .catch((error) => {
    console.log(error);
  });


// Функция для изменения надписи на кнопке во время загрузки
function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение..."
    }
    else {
        button.textContent = "Сохранить"
    }
}



// Обработчик добавления новой карточки
function addCardHandler(obj) {
  // Нахождение кнопки сохранения и изменение надписи на ней во время загрузки
    const button = popupAddPost.querySelector('.container__save-button');
    renderLoading(true, button)
    // Добавление карточки через API и добавление новой карточки в секцию на странице
    api.appendCard(postNameInput.value, postLinkInput.value)
        .then((res) => {
            section.prependItem(createCard(res))
            popupPostForm.close()
            popupPostFormValidate.resetForm()
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            // Изменение надписи на кнопке после загрузки
            renderLoading(false, button);
        });
}

// Обработчик изменения информации профиля
function editProfileHandler() {
    // Нахождение кнопки сохранения и изменение надписи на ней во время загрузки
    const button = popupEditor.querySelector('.container__save-button');
    renderLoading(true, button)
    // Получение новой информации о пользователе через API и ее установка в объекте userInfo
    const editName = editNameInput.value;
    const editAbout = editAboutInput.value;
    userInfo.setUserInfo({name: editName, about: editAbout})
    .then(() => {
        popupEditForm.close()
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        // Изменение надписи на кнопке после загрузки
        renderLoading(false, button);
    });
}


// Обработчик смены аватара профиля
function patchAvatarHandler() {
    // Нахождение кнопки сохранения и изменение надписи на ней во время загрузки
    const button = popupAvatar.querySelector('.container__save-button');
    renderLoading(true, button) // вызываем функцию для отображения процесса загрузки
    // Установка новой аватарки пользователя через API
    userInfo.setUserAvatar(avatarLinkInput.value)
    .then(() => {
        popupAvatarForm.close()
        popupAvatarFormValidate.resetForm()
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        renderLoading(false, button); // вызываем функцию для отмены отображения процесса загрузки
    });
}

const popupEditForm = new PopupWithForm("popup_type_edit-container", editProfileHandler); // создаем попап для редактирования профиля
const popupAvatarForm = new PopupWithForm("popup_type_profile-photo-container", patchAvatarHandler); // создаем попап для изменения аватара
const popupPostForm = new PopupWithForm("popup_type_add-container", addCardHandler); // создаем попап для добавления карточки

const popupEditFormValidate = new FormValidator(fullForm, popupEditor.querySelector(fullForm.formSelector)) // создаем валидатор формы редактирования профиля
const popupAvatarFormValidate = new FormValidator(fullForm, popupAvatar.querySelector(fullForm.formSelector)) // создаем валидатор формы изменения аватара
const popupPostFormValidate = new FormValidator(fullForm, popupAddPost.querySelector(fullForm.formSelector)) // создаем валидатор формы добавления карточки
popupEditFormValidate.enableValidation() // включаем валидацию для формы редактирования профиля
popupAvatarFormValidate.enableValidation() // включаем валидацию для формы изменения аватара
popupPostFormValidate.enableValidation() // включаем валидацию для формы добавления карточки


popupAddPostOpenButton.addEventListener("click", () => { // добавляем слушатель для кнопки открытия формы добавления карточки
    popupPostForm.open() // открываем форму
    popupPostFormValidate.resetForm() // сбрасываем валидацию
})

popupEditProfileOpenButton.addEventListener("click", () => { // добавляем слушатель для кнопки открытия формы редактирования профиля
    popupEditForm.open() // открываем форму
    userInfo.getUserInfo().then(obj => { // получаем информацию о пользователе и устанавливаем ее в поля формы
        editNameInput.value = obj.name
        editAboutInput.value = obj.about
    })
    popupEditFormValidate.resetForm() // сбрасываем валидацию
})

popupAvatarOpenButton.addEventListener("click", () => { // добавляем слушатель для кнопки открытия формы изменения аватара
    popupAvatarForm.open() // открываем форму
    popupAvatarFormValidate.resetForm() // сбрасываем валидацию
})

// Устанавливаем обработчики событий на модальные окна для открытия и закрытия
popupImage.setEventListeners();
popupAvatarForm.setEventListeners();
popupPostForm.setEventListeners();
popupEditForm.setEventListeners();

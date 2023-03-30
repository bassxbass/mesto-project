export const popupAddPost = document.querySelector("#popup_type_add-container").parentNode;
export const popupEditor = document.querySelector("#popup_type_edit-container").parentNode;
export const popupOpen = document.querySelector("#popup_type_photo-container").parentNode;
export const popupAvatar = document.querySelector("#popup_type_profile-photo-container").parentNode;
export const popups = document.querySelectorAll(".popup");

export const page = document.querySelector(".page");
export const content = document.querySelector(".content");
export const profile = content.querySelector(".profile");

//находим куда добавлять посты и заготовку поста
export const cardSection = document.querySelector(".cards");
export const cardTemplate = document.querySelector(".card__template").content;

// форма редактирования профиля в DOM
export const formEditElement = popupEditor.querySelector(".container__form");
export const formAddElement = popupAddPost.querySelector(".container__form");
export const formAvatarElement = popupAvatar.querySelector(".container__form");
// Поля для редактирования в DOM
export const profileName = profile.querySelector(".profile__name");
export const profileJob = profile.querySelector(".profile__text");

// Находим инпуты для редактирования профиля
export const editNameInput = popupEditor.querySelector(".container__input_type_name"); //Инпут имя
export const editAboutInput = popupEditor.querySelector(".container__input_type_info"); //Инпут о себе
export const postNameInput = popupAddPost.querySelector(".container__input_type_name"); //Инпут имя пост
export const postLinkInput = popupAddPost.querySelector(".container__input_type_info"); //Инпут ссылка пост
export const avatarLinkInput = popupAvatar.querySelector(".container__input_type_info"); //Инпут ссылка аватар

export const userName = document.querySelector(".profile__name");
export const userJob = document.querySelector(".profile__text");
export const userAvatar = document.querySelector(".profile__avatar");

export const editButton = profile.querySelector(".profile__edit-button");
export const addButton = profile.querySelector(".profile__add-button");
export const photoEdit = profile.querySelector(".profile__avatar_position_hover");

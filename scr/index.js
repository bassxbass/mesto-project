// карточки
const cardTemplate = document.querySelector('.card__template').content;
const cardSection = document.querySelector('.cards');

const cardOpened = document.querySelector('.popup_type_photo');
const cardOpenedImage = cardOpened.querySelector('.card-opened__image');
const cardOpenedText = cardOpened.querySelector('.card-opened__name');
const cardOpenedClose = cardOpened.querySelector('.container__close-button_type_photo');

//открытие, закрытие формы изменения профиля
const formElementProfile = document.querySelector('.container__form_type_profile');
const nameInput = formElementProfile.querySelector('.container__input_type_name');
const jobInput = formElementProfile.querySelector('.container__input_type_info');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__text');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const closeEditButton = document.querySelector('.container__close-button_type_edit');

//Открытие и закрытие формы для добавление карточки
const formElementAddCard = document.querySelector('.container__form_type_add');
const imageNameInput = formElementAddCard.querySelector('.container__input_type_name');
const linkInput = formElementAddCard.querySelector('.container__input_type_info');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const closeAddButton = document.querySelector('.container__close-button_type_add');

// добавления класса для открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// создаём карточку
function createCard(link, name) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__name').textContent = name;

  card.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });

  card.querySelector('.card__delete').addEventListener('click', function(evt) {
    evt.target.closest('.card').remove();
  });

  card.querySelector('.card__image').addEventListener('click', function() {
    cardOpenedImage.src = link;
    cardOpenedImage.alt = name;
    cardOpenedText.textContent = name;
    openPopup(cardOpened);
  });
  return card;
};

function addCard(card) {
  cardSection.prepend(card);
};

// инициируем карточки 
initialCards.forEach(function(item) {
  addCard(createCard(item.link, item.name));
});

// ивенты по кликам
editButton.addEventListener('click', function() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeEditButton.addEventListener('click', function() {
  closePopup(editPopup);
});

addButton.addEventListener('click', function() {
  openPopup(addPopup);
  formElementAddCard.reset();
});

closeAddButton.addEventListener('click', function() {
  closePopup(addPopup);
});

//изменяем профиль
function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editPopup);
}

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

//добавляем карточку
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();

  addCard(createCard(linkInput.value, imageNameInput.value));

  closePopup(addPopup);
};

formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);

cardOpenedClose.addEventListener('click', function() {
  closePopup(cardOpened);
});

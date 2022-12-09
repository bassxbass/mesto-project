const cards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      },
      {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      },
      {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      },
      {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      },
      {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      },
      {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
      }
];
  
  // Edit popup popup_type_edit
  const profilePopup = document.querySelector('.popup_type_edit');
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__subtitle');
  const profileForm = profilePopup.querySelector('.form');
  const profileNameInput = profileForm.querySelector('#name');
  const profileDescriptionInput = profileForm.querySelector('#about');
  const profileSaveButton = profileForm.querySelector('.popup__button');
  
  // Image popup popup_type_image
  const imagePopup = document.querySelector('.popup_type_image');
  const imagePopupImage = imagePopup.querySelector('.popup__image');
  const imagePopupHeading = imagePopup.querySelector('.popup__image-name');
  
  // Cards
  const cardsContainer = document.querySelector('.elements__box');
  const cardTemplate = document.querySelector('#elements__card').content;
  
  // Card popup popup_type_card
  const addButton = document.querySelector('.profile__plus');
  const cardPopup = document.querySelector('.popup_type_card');
  const cardHeading = cardPopup.querySelector('#place-heading');
  const cardLink = cardPopup.querySelector('#link');
  const cardForm = cardPopup.querySelector('.form');
  
  //Функции начало
  
  function openPopup(popup) {
    popup.classList.add('popup_opened');
  }
  
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }
  
  function renderProfilePopup() {
    openPopup(profilePopup);
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  }
  
  function saveProfilePopup(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profilePopup);
  }
  
  function renderCardPopup(evt) {
    openPopup(imagePopup);
  
    const cardImage = evt.target;
    const card = cardImage.closest('.elements__card');
    const cardHeading = card.querySelector('.elements__title');
  
    imagePopupImage.src = cardImage.src;
    imagePopupImage.alt = cardHeading.textContent;
    imagePopupHeading.textContent = cardHeading.textContent;
  }
  
  function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
    cardElement.querySelector('.elements__title').textContent = name;
    const cardImage = cardElement.querySelector('.elements__img');
    cardImage.src = link;
    cardImage.alt = name;
    cardImage.addEventListener('click', renderCardPopup);
  
    cardElement
      .querySelector('.elements__like')
      .addEventListener('click', (evt) => {
        evt.target.classList.toggle('elements__like_active');
      });
  
    cardElement
      .querySelector('.elements__delete-button')
      .addEventListener('click', deleteCard);
  
    return cardElement;
  }
  
  function renderCard(card, container) {
    container.prepend(card);
  }
  
  function renderCards() {
    cards.forEach((item) =>
      renderCard(createCard(item.name, item.link), cardsContainer)
    );
  }
  
  function deleteCard(evt) {
    const card = evt.target.closest('.elements__card');
    card.remove();
  }
  
  function addCard(evt) {
    evt.preventDefault();
    renderCard(createCard(cardHeading.value, cardLink.value), cardsContainer);
    cardHeading.value = '';
    cardLink.value = '';
    closePopup(cardPopup);
  }
  
  // Функции конец
  
  // Закрывание всех попапов по кнопке
  
  document
    .querySelectorAll('.popup__close')
    .forEach((item) =>
      item.addEventListener('click', (evt) =>
        closePopup(evt.target.closest('.popup'))
      )
    );
  
  document
    .querySelector('.profile__button')
    .addEventListener('click', renderProfilePopup);
  
  profileForm.addEventListener('submit', saveProfilePopup);
  cardForm.addEventListener('submit', addCard);
  
  addButton.addEventListener('click', () => openPopup(cardPopup));
  
  renderCards();
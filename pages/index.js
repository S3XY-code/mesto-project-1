//Profile PopUp

const popupProfile = document.querySelector('#popupProfile');
const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupProfileCloseButton = document.querySelector('#popupProfileCloseButton');
const popupProfileForm = popupProfile.querySelector('#popupProfileForm');
const nameInput = popupProfileForm.querySelector('#popupInputName');
const jobInput = popupProfileForm.querySelector('#popupInputJob');

//Card PopUp

const popupCard = document.querySelector('#popupCard');
const popupCardOpenButton = document.querySelector('#AddButton');
const popupCardCloseButton = document.querySelector('#popupCardCloseButton');
const popupCardForm = popupCard.querySelector('.popup__form');
const NameInput = popupCard.querySelector('#NameInput');
const UrlInput = popupCard.querySelector('#UrlInput');

//Actual Profile name and Job

const ProfileName = document.querySelector('.profile__title');
const ProfileJob = document.querySelector('.profile__subtitle');

// Cards

const cardsContainer = document.querySelector('.elements__cards');
const cardTemplate = document.querySelector('#card').content;

//Image PopUp

const imagePopup = document.querySelector('.popup_image');
const image = document.querySelector('.popup__image-zoom');
const caption = document.querySelector('.popup__image-figcaption');

//Open and Close PopUp

function openPopup(popup) {
  popup.classList.add('popup_opened')
};

function closePopup(popup) {
  popup.classList.remove('popup_opened')
};

popupProfileOpenButton.addEventListener('click', function () {
  openPopup(popupProfile);
});

popupCardOpenButton.addEventListener('click', function () {
  openPopup(popupCard)
});

window.addEventListener('click', function (e) {
  if (e.target.classList.contains('popup__close-icon') || e.target.classList.contains('popup')) {
    closePopup(e.target.closest('.popup'));
  }
});

//Edit profile info

function formSubmitActualName() {
  jobInput.value = ProfileJob.textContent;
  nameInput.value = ProfileName.textContent;
};

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  ProfileJob.textContent = jobInput.value;
  ProfileName.textContent = nameInput.value;
  popupProfile.classList.remove('popup_opened');
  popupCard.classList.remove('popup_opened');
};

popupProfileForm.addEventListener('submit', formSubmitHandler);
popupCardForm.addEventListener('submit', formSubmitHandler);

//Add, delete, likes cards

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });

  cardElement.querySelector('.card__trash-button').addEventListener('click', function (e) {
    e.target.closest('.card').remove();
  });

  cardImage.addEventListener('click', function () {
    openPopup(imagePopup);
    image.src = link;
    image.alt = name;
    caption.textContent = name;
  });

  return cardElement;
};

function renderCard(card, container) {
  container.prepend(card);
};

function addCard(evt) {
  evt.preventDefault();
  renderCard(createCard(NameInput.value, UrlInput.value), cardsContainer);
  NameInput.value = '';
  UrlInput.value = '';
  popupCardClose(popupCard);
}

popupCard.addEventListener('submit', addCard);

//Render cards from array

function renderCards() {
  cards.forEach((database) =>
    renderCard(createCard(database.name, database.link), cardsContainer)
  );
};

renderCards();
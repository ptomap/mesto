const openProfileButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeProfileButton = document.querySelector('.popup-profile__close');
const formElement = document.querySelector('.popup-profile__form');
//Значения в полях формы
const nameInput = document.querySelector('.popup-profile__input_type_name');
const jobInput = document.querySelector('.popup-profile__input_type_job');
// Элементы из верстки, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const jobName = document.querySelector('.profile__job');
//для попапа добавления карточке с фото и названием
const openPopupCardButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup-add-card');
const closePopupCardButton = document.querySelector('.popup-add-card__close');
//для превью фото
const closePreviewButton = document.querySelector('.popup-preview__close');
const openPreviewButton = document.querySelector('.element__image');
// Определяю попапы для функции открытия и закрытия
const previewPopup = document.querySelector('.popup-preview');
const profilePopup = document.querySelector('.popup-profile');
const cardPopup = document.querySelector('.popup-add-card');
//Для добавления карточек
const cardsContainer = document.querySelector('.elements');
const postTemplate = document.querySelector('#card-template').content;
const postingFormElement = document.querySelector('.popup-add-card__form');
const titleCardInput = document.querySelector('.popup-add-card__input_type_title');
const linkCardInput = document.querySelector('.popup-add-card__input_type_link');

//массив для первичного наполнения
const initialCards = [
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

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ ПО КНОПКЕ
//открытие попапа для редактированяи профиля по кнопке редактировать
openProfileButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent; // Значения полей jobInput и nameInput из верстки при октрытии попапа
  jobInput.value = jobName.textContent;
});

//отменяем стандартную работу формы и вставляем значения в верстку
formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value; // Новые значения из формы вставляем в вертку
  jobName.textContent = jobInput.value;
  closePopup(profilePopup)
})

//закрытие попапа для редактированяи профиля по кнопке крестик
closeProfileButton.addEventListener("click", () => {
  closePopup(profilePopup);
});

//ПРЕВЬЮ карточек открытие и закрытие
const previewCardPopup = (data) => {
  openPopup(previewPopup);
  document.querySelector('.popup-preview__image').src = data.link;
  document.querySelector('.popup-preview__caption').textContent = data.name;
}

//закрытие попапа
closePreviewButton.addEventListener("click", () => {
  closePopup(previewPopup);
});

//СОЗДАНИЕ КАРТОЧЕК
//функция рендера карточек (вставляем в верстку) результат функции создания карточки
const renderCard = (data) => {
  cardsContainer.prepend(createCard(data));
};

//первичный рендеринг из массива в верстку
initialCards.forEach(renderCard);

//по кнопке сабмит вызываем рендеринг
const cardFormSubmitHandle = (evt) => {
  evt.preventDefault();
  renderCard({name: titleCardInput.value,link: linkCardInput.value});
  postingFormElement.reset();
  closePopup(cardPopup)
};
postingFormElement.addEventListener('submit', cardFormSubmitHandle);

// функия создания карточки
function createCard(data) {
  const card = postTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = data.link;
  card.querySelector('.element__image').alt = 'Картинка';
  card.querySelector('.element__title').textContent = data.name;
  card.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active'); // лайки
  });
  card.querySelector('.element__trash-button').addEventListener('click', function (evt) { //удаление
    card.remove();
  });
  card.querySelector('.element__image').addEventListener('click', () => previewCardPopup(data)); //превью
    return card;
}

//открываем попап для содания карточки по кнопке
openPopupCardButton.addEventListener("click", () => {
  enableValidation(config);
  openPopup(cardPopup);
});
//закрываем попап для содания карточки по кнопке
closePopupCardButton.addEventListener("click", () => {
  closePopup(cardPopup);
});

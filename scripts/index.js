import {FormValidator, config} from './FormValidator.js';
import {Card} from './Card.js';

const openProfileButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeProfileButton = document.querySelector('.popup-profile__close');
export const formElement = document.querySelector('.popup-profile__form');
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
//const postTemplate = document.querySelector('.card-template').content;
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

//СОЗДАНИЕ КАРТОЧЕК
//функция рендера карточек (вставляем в верстку) результат функции создания карточки
const renderCard = (name, link) => {
  const card = new Card (name, link,'.card-template').createCard();
  cardsContainer.prepend(card);
};


// загрузка карточек из массива
const renderInitialCards = (array) => {
  array.forEach((item) => {
    renderCard(item.name, item.link);
  })
};

//первичный рендеринг из массива в верстку
renderInitialCards(initialCards);

//по кнопке сабмит вызываем рендеринг
const cardFormSubmitHandle = (evt) => {
  evt.preventDefault();
  renderCard(titleCardInput.value, linkCardInput.value);
  postingFormElement.reset();
  closePopup(cardPopup)
};
postingFormElement.addEventListener('submit', cardFormSubmitHandle);

//открываем попап для содания карточки по кнопке
openPopupCardButton.addEventListener("click", () => {
  formAddCardValidator.enableValidation();
  openPopup(cardPopup);
});

//закрываем попап для содания карточки по кнопке
closePopupCardButton.addEventListener("click", () => {
  closePopup(cardPopup);
});

//массив попапов закрытие оверлэй и Esc
export const setPopup = (popupSelector) => {
  const popupList = Array.from(document.querySelectorAll(popupSelector));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', (e) => {
      if (popupElement.classList.contains('popup_opened') && e.target === e.currentTarget) {
        closePopup(popupElement);
      }
    });
    document.addEventListener('keydown', (evt) => {
      if (popupElement.classList.contains('popup_opened') && evt.key === 'Escape') {
        closePopup(popupElement);
        document.removeEventListener('keydown', evt);
      }
    });
  });
};

// валидация формы профиля
const formProfileValidator = new FormValidator(config, formElement);
formProfileValidator.enableValidation();

// валидация формы новой карточки
const formAddCardValidator = new FormValidator(config, postingFormElement);
formAddCardValidator.enableValidation();

export {openPopup, closePopup, closePreviewButton, initialCards, previewPopup};

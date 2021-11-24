export const closePreviewButton = document.querySelector('.popup-preview__close');
export const previewPopup = document.querySelector('.popup-preview');
export const openProfileButton = document.querySelector('.profile__edit-button');
export const profileFormElement = document.querySelector('.popup-profile__form');
//Значения в полях формы
export const nameInput = document.querySelector('.popup-profile__input_type_name');
export const jobInput = document.querySelector('.popup-profile__input_type_job');
// Элементы из верстки, куда должны быть вставлены значения полей
export const profileName = document.querySelector('.profile__name');
export const jobName = document.querySelector('.profile__job');
//для попапа добавления карточке с фото и названием
export const openPopupCardButton = document.querySelector('.profile__add-button');
export const closePopupCardButton = document.querySelector('.popup-add-card__close');
// Определяю попапы для функции открытия и закрытия
export const closeProfileButton = document.querySelector('.popup-profile__close');
export const profilePopup = document.querySelector('.popup-profile');
export const cardPopup = document.querySelector('.popup-add-card');
//Для добавления карточек
export const cardsContainer = document.querySelector('.elements');
//const postTemplate = document.querySelector('.card-template').content;
export const postingFormElement = document.querySelector('.popup-add-card__form');
export const titleCardInput = document.querySelector('.popup-add-card__input_type_title');
export const linkCardInput = document.querySelector('.popup-add-card__input_type_link');

//массив для первичного наполнения
export const initialCards = [
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

export const config = {
  popupSelector: '.popup',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

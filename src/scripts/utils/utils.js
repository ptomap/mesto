export const profileEditBtn = document.querySelector('.profile__edit-button');
// Находим инпуты формы попапа редактирования профиля
export const nameInput = document.querySelector('.popup-profile__input_type_name');
export const jobInput = document.querySelector('.popup-profile__input_type_job');
// Находим попап добавления карточки
export const popupAddNewCard = document.querySelector('.popup-add-card');
// находим кнопку для открытия попапа добавления новой карточки
export const addNewCardBtn = document.querySelector('.profile__add-button');
export const profileFormElement = document.querySelector('.popup-profile__form');
export const addCardFormElement = document.querySelector('.popup-add-card__form');
//Аватар
export const editAvatarBtn = document.querySelector('.profile__avatar-button');
// Форма редактирования аватара пользователя
export const formEditAvatar = document.querySelector('.popup_edit-avatar__form');
// аватар пользователя
export const avatar = document.querySelector('.profile__avatar');

//массив для первичного наполнения
export const initialCards = [
  {
    titlePhoto: 'Архыз',
    linkPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    titlePhoto: 'Челябинская область',
    linkPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    titlePhoto: 'Иваново',
    linkPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    titlePhoto: 'Камчатка',
    linkPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    titlePhoto: 'Холмогорский район',
    linkPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    titlePhoto: 'Байкал',
    linkPhoto: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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



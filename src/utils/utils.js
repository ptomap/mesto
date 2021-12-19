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
export const formEditAvatar = document.querySelector('.popup-edit-avatar__form');
// аватар пользователя
export const avatar = document.querySelector('.profile__avatar');

export const config = {
  popupSelector: '.popup',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};



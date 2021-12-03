import {FormValidator, config} from './FormValidator.js';
import {Card} from './Card.js';
import {openProfileButton, profileFormElement, initialCards,nameInput,jobInput, profileName, jobName, openPopupCardButton,closePopupCardButton, closeProfileButton, profilePopup, cardPopup, cardsContainer, postingFormElement, titleCardInput, linkCardInput, previewPopup} from "./utils.js";

//закрытие по esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlay);
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByOverlay);
}

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ ПО КНОПКЕ
//открытие попапа для редактированяи профиля по кнопке редактировать
openProfileButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent; // Значения полей jobInput и nameInput из верстки при октрытии попапа
  jobInput.value = jobName.textContent;
});

//отменяем стандартную работу формы и вставляем значения в верстку
profileFormElement.addEventListener("submit", (evt) => {
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
  const card = new Card (name, link,'.card-template', openPopup, closePopup).createCard();
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
  formAddCardValidator.toggleBtnState();
};
postingFormElement.addEventListener('submit', cardFormSubmitHandle);

//открываем попап для создания карточки по кнопке
openPopupCardButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

//закрываем попап для содания карточки по кнопке
closePopupCardButton.addEventListener("click", () => {
  closePopup(cardPopup);
});

//закрытие оверлэй
const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
//закрытие оверлэй
profilePopup.addEventListener('mousedown', closeByOverlay);
cardPopup.addEventListener('mousedown', closeByOverlay);
previewPopup.addEventListener('mousedown', closeByOverlay);

// валидация формы профиля
const formProfileValidator = new FormValidator(config, profileFormElement);
formProfileValidator.enableValidation();

// валидация формы новой карточки
const formAddCardValidator = new FormValidator(config, postingFormElement);
formAddCardValidator.enableValidation();


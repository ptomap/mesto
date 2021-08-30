let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
//Значения в полях формы
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
// Элементы из верстки, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__name');
let jobName = document.querySelector('.profile__job');

function togglePopup() {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent; // Значения полей jobInput и nameInput из верстки при октрытии попапа
  jobInput.value = jobName.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы на сервер
  profileName.textContent = nameInput.value; // Новые значения из формы вставляем в вертку
  jobName.textContent = jobInput.value;
  togglePopup() // Вызываем функцию и убираем модификтаор, чтобы попап скрылся
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

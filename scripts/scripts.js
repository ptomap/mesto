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

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent; // Значения полей jobInput и nameInput из верстки при октрытии попапа
  jobInput.value = jobName.textContent;
}
function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // отменяем стандартную отправку формы на сервер
  profileName.textContent = nameInput.value; // Новые значения из формы вставляем в вертку
  jobName.textContent = jobInput.value;
  closePopup() // Вызываем функцию и убираем модификтаор, чтобы попап скрылся
}

openPopupButton.addEventListener('click', openPopup); //открываем попам кликом
closePopupButton.addEventListener('click', closePopup); //закрываем попам кликом
formElement.addEventListener('submit', formSubmitHandler);

//Форма с фото

let openPopupCardButton = document.querySelector('.profile__add-button');
let popupCard = document.querySelector('.popup-photo');
let closePopupCardButton = document.querySelector('.popup-photo__close');


//Открытие и закрытие попапа, надо добавить сохранение карточки (сейчас замена текущей карточки)
function openPopupCard() {
  popupCard.classList.add('popup-photo_opened');
}
function closePopupCard() {
  popupCard.classList.remove('popup-photo_opened');
}

openPopupCardButton.addEventListener('click', openPopupCard); //открываем попам кликом
closePopupCardButton.addEventListener('click', closePopupCard); //закрываем попам кликом


//Добавление карточек из массива
const postingFormElement = document.querySelector('.posting__form');
const titleInput = document.querySelector('.popup-photo__input_type_title');
const linkInput = document.querySelector('.popup-photo__input_type_link');

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
//Для доабвления карточек
const postCards = document.querySelector('.elements');
const postTemplate = document.querySelector('#card-template').content;
//Для превью
const photoPopup = document.querySelector('.popup-preview');
const closePhotoButton = document.querySelector('.popup-preview__close');
const openPhotoButton = document.querySelector('.element__image');

const addCard = (data) => {
  const postCard = postTemplate.querySelector('.element').cloneNode(true);
  postCard.querySelector('.element__image').src = data.link;
  postCard.querySelector('.element__image').alt = 'Картинка';
  postCard.querySelector('.element__title').textContent = data.name;

  postCards.prepend(postCard);

  postCard.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active'); // лайки
  });

  postCard.querySelector('.element__trash-button').addEventListener('click', function (evt) { //удаление
    evt.target.closest('.element').remove();
  });

  postCard.querySelector('.element__image').addEventListener('click', () => handlePreviewPicture(data));
}

//Добавление карточек
const postingFormHandler = (event) => {
  event.preventDefault();

  addCard({
    name: titleInput.value,
    link: linkInput.value
  });

  postingFormElement.reset();
  closePopupCard()
};

postingFormElement.addEventListener('submit', postingFormHandler);


initialCards.forEach((data) => {
  addCard(data);
});

//Превью карточек
const handlePreviewPicture = (data) => {
  document.querySelector('.popup-preview__image').src = data.link;
  document.querySelector('.popup-preview__caption').textContent = data.name;
  photoPopup.classList.add('popup-preview_active');
};

//закрытие попапа
function closePhoto() {
  photoPopup.classList.remove('popup-preview_active');
}
closePhotoButton.addEventListener('click', closePhoto); //закрываем попам кликом

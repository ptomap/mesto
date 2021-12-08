import '../../../src/index.css';

import {profileEditBtn, profileFormElement,addCardFormElement, nameInput, jobInput,
  addNewCardBtn,  initialCards, config} from "../utils/utils.js";
import Section from "../components/Section.js";
import FormValidator from '../components/FormValidator.js';
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

// профиль
function editProfile({ profileName, jobName }) {
  nameInput.value = profileName;
  jobInput.value = jobName;
};
// новая карточка
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (titlePhoto, linkPhoto) => {
      viewImagePopup.open(titlePhoto, linkPhoto);
    }}, '.card-template');
  const cardElement = card.generateCard();
  return cardElement;
};

// создание экземпляра класса
const userInfo = new UserInfo({
  profileName: '.profile__name',
  jobName: '.profile__job'
});

const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup-profile',
  handleFormSubmit: (dataForm) => {
    userInfo.setUserInfo({
      profileName: dataForm.profileName,
      jobName: dataForm.jobName
    });
    editProfilePopup.close();
  }
});
editProfilePopup.setEventListeners();

// Кнопка редактировать
profileEditBtn.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  editProfile({
    profileName: info.profileName,
    jobName: info.jobName
  });
  editProfilePopup.open();
});

const addNewCard = new PopupWithForm({
  popupSelector: '.popup-add-card',
  handleFormSubmit: (formData) => {
    cardsList.addItem(createCard(formData));
    addNewCard.close();
  }
});

addNewCard.setEventListeners();
// обработчик попапа
addNewCardBtn.addEventListener('click', () => {
  formAddCardValidator.toggleBtnState();
  addNewCard.open();
})
// карточкииз массива
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
}, '.elements');
cardsList.renderItems();


const viewImagePopup = new PopupWithImage('.popup-preview');
viewImagePopup.setEventListeners();

const formProfileValidator = new FormValidator(config, profileFormElement);
formProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(config, addCardFormElement);
formAddCardValidator.enableValidation();


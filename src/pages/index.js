import './index.css';

import {profileEditBtn, profileFormElement,addCardFormElement, nameInput, jobInput,
  addNewCardBtn, editAvatarBtn, config, formEditAvatar, avatar} from "../utils/utils.js";
import Section from "../components/Section.js";
import FormValidator from '../components/FormValidator.js';
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";


//API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '26da26a8-d945-47d3-8e71-ad9465211601',
    'Content-Type': 'application/json'
  }
});

let userId;


// карточки и юзер с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


// создание экземпляра класса
const userInfo = new UserInfo({
  profileName: '.profile__name',
  jobName: '.profile__job',
  avatar: '.profile__avatar'
});

const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup-profile',
  handleFormSubmit: (dataForm) => {
    editProfilePopup.loading(true);
    api.editUserInfo(dataForm)
      .then((dataForm) => {
        userInfo.setUserInfo(dataForm);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editProfilePopup.loading(false);
      });
  }
});
editProfilePopup.setEventListeners();

// профиль
function editProfile({ profileName, jobName }) {
  nameInput.value = profileName;
  jobInput.value = jobName;
};

// редакция аватара пользователя
const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup-edit-avatar',
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api.editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  }
});
editAvatarPopup.setEventListeners();

// кнопка редактировать
profileEditBtn.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  editProfile({
    profileName: info.profileName,
    jobName: info.jobName
  });
  editProfilePopup.open();
});

// кнопка редактировать аватар пользователя
editAvatarBtn.addEventListener('click', () => {
  formEditAvatarValidator.toggleBtnState();
  editAvatarPopup.open();
});




// новая карточка
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: '.card-template',
    userId: userId,
    handleCardClick: (titlePhoto, linkPhoto) => {
      viewImagePopup.open(titlePhoto, linkPhoto);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements');

// подтверждение удаления карточки
const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.popup-delete-card'
});
deleteCardPopup.setEventListeners();

//новая карточка
const addNewCard = new PopupWithForm({
  popupSelector: '.popup-add-card',
  handleFormSubmit: (formData) => {
    addNewCard.loading(true);
    api.createCard(formData)
      .then((formData) => {
        cardsList.addItem(createCard(formData));
        addNewCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addNewCard.loading(false);
      });
  }
});;

addNewCard.setEventListeners();

// обработчик попапа
addNewCardBtn.addEventListener('click', () => {
  formAddCardValidator.toggleBtnState();
  addNewCard.open();
})


const viewImagePopup = new PopupWithImage('.popup-preview');
viewImagePopup.setEventListeners();

const formProfileValidator = new FormValidator(config, profileFormElement);
formProfileValidator.enableValidation();

const formAddCardValidator = new FormValidator(config, addCardFormElement);
formAddCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(config, formEditAvatar);
formEditAvatarValidator.enableValidation();

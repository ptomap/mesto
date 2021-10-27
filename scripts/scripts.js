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
//переменная для ошибок
//const formError = formElement.querySelector(`.${nameInput.id}-error`);



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
openProfileButton.addEventListener("click", openProfilePopup = () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent; // Значения полей jobInput и nameInput из верстки при октрытии попапа
  jobInput.value = jobName.textContent;
});

//отменяем стандартную работу формы и вставляем значения в верстку
formElement.addEventListener("submit", submitProfileHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value; // Новые значения из формы вставляем в вертку
  jobName.textContent = jobInput.value;
  closePopup(profilePopup)
})

//закрытие попапа для редактированяи профиля по кнопке крестик
closeProfileButton.addEventListener("click", closeProfilePopup = () => {
  closePopup(profilePopup);
});


//ПРЕВЬЮ карточек открытие и закрытие
const previewCardPopup = (data) => {
  openPopup(previewPopup);
  document.querySelector('.popup-preview__image').src = data.link;
  document.querySelector('.popup-preview__caption').textContent = data.name;
}

//закрытие попапа
closePreviewButton.addEventListener("click", closePreviewPopup = () => {
  closePopup(previewPopup);
});

//СОЗДАНИЕ КАРТОЧЕК
//функция рендера карточек (вставляем в верстку) результат функции создания карточки
const renderCard = (data) => {
  cardsContainer.prepend(createCard(data));
};


//первичный рендеринг из массива в верстку
initialCards.forEach((data) => {
  renderCard(data)
})
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
  openPopup(cardPopup);
})
//закрываем попап для содания карточки по кнопке
closePopupCardButton.addEventListener("click", () => {
  closePopup(cardPopup);
})




//спринт 6

const showError = (formElement, inputElement, errorMessage) => {
//переменная для ошибок
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error'); //красное подчеркивание
  errorElement.textContent = errorMessage;
  errorElement.classList.add('.popup__input-error'); // текст ошибки
};

const hideError = (formElement, inputElement, ) => {
  //переменная для ошибок
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error'); // удаляем подчеркивание
  errorElement.classList.remove('.popup__input-error');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  }else {
    hideError(formElement, inputElement);
  }

};

//массив попапов закрытие оверлэй и Esc
const setPopup = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
  popupElement.addEventListener('click', (e) => {
    if(e.target === e.currentTarget) {
      closePopup(popupElement);
      }
  })
  document.addEventListener('keydown',  (evt) => {
    if(evt.key==='Escape') {
      closePopup(popupElement);
    }
})
})
}
setPopup();

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


const toggleBtnState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit_inactive')
    buttonElement.disabled = true;
  }else {
    buttonElement.classList.remove('popup__submit_inactive');
    buttonElement.disabled = false;
  }
}



const setEventListenetrs = (formElement) => {
  // Находим все поля внутри формы, которую передали аргументом
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleBtnState(inputList, buttonElement);
   // Обходим все элементы полученной коллекции
   inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
    // Внутри колбэка вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);
      toggleBtnState(inputList, buttonElement);
    });
   })
}


const setForms = () => {
  // Находим все формы с указанным классом в DOM
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
     evt.preventDefault();
   });
// Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  setEventListenetrs(formElement);
  });
}
// Вызовем функцию
setForms();





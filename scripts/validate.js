const showError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  //переменная для ошибок
  inputElement.classList.add(inputErrorClass); //красное подчеркивание
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass); // текст ошибки
};

const hideError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  //переменная для ошибок
  inputElement.classList.remove(inputErrorClass); // удаляем подчеркивание
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showError(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideError(inputElement, errorElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const hasIputValue = (inputList) => {
  return inputList.every((inputElement) => {
    return !inputElement.value.length === 0;
  });
};

const toggleBtnState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  if (hasInvalidInput(inputList) || hasIputValue(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//массив попапов закрытие оверлэй и Esc
const setPopup = (popupSelector) => {
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

const setEventListenetrs = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
  // Находим все поля внутри формы, которую передали аргументом
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  toggleBtnState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
  // Обходим все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleBtnState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });
  });
};

const enableValidation = (config) => {
  // Находим все формы с указанным классом в DOM
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListenetrs(formElement, config.inputSelector, config.submitButtonSelector, config.inputErrorClass, config.errorClass, config.inactiveButtonClass);
    setPopup(config.popupSelector);
  });
};

const config = {
  popupSelector: '.popup',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

// Вызовем функцию
enableValidation(config);

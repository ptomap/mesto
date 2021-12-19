export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector)); // Находим все поля внутри формы, которую передали аргументом
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showError(inputElement, errorElement, inputErrorClass, errorClass) {
    //переменная для ошибок
    inputElement.classList.add(inputErrorClass); //красное подчеркивание
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass); // текст ошибки
  }

  _hideError(inputElement, errorElement, inputErrorClass, errorClass) {
    //переменная для ошибок
    inputElement.classList.remove(inputErrorClass); // удаляем подчеркивание
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showError(inputElement, errorElement, inputErrorClass, errorClass);
    } else {
      this._hideError(inputElement, errorElement, inputErrorClass, errorClass);
    }
  }

  _checkHasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkHasInputValue() {
    return this._inputList.every((inputElement) => {
      return !inputElement.value.length === 0;
    });
  }

  toggleBtnState() {
    if (this._checkHasInvalidInput(this._inputList) || this._checkHasInputValue(this._inputList)) {
      this._buttonElement.classList.add(config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListenetrs() {
    this.toggleBtnState();
    // Обходим все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем checkInputValidity,
        // передав ей форму и проверяемый элемент
        this._checkInputValidity(this._formElement, inputElement, config.inputErrorClass, config.errorClass,);
        this.toggleBtnState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    this._setEventListenetrs();
  };
}

export const config = {
  popupSelector: '.popup',
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
};

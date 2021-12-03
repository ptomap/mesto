import {closePreviewButton, previewPopup, popupPreviewImg, popupPreviewCaption} from "./utils.js";
export class Card {
  constructor(name, link, cardSelector, openPopup, closePopup) {
    this._container = document.querySelector(cardSelector);
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._closePopup = closePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _likeCard() {
    const likeBtn = this._element.querySelector('.element__like-button');
    likeBtn.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

//ПРЕВЬЮ карточек открытие
  _previewCardPopup() {
    this._openPopup(previewPopup);
    popupPreviewImg.src = this._link;
    popupPreviewCaption.textContent = this._name;
  }

  //ПРЕВЬЮ карточек закрытие
  _closePreviewPopup() {
    this._closePopup(previewPopup);
  }

  _setEventListeners() {
  // кнопка удаления
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
    this._deleteCard();
  })
  // кнопка лайк
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
    this._likeCard();
  })
  //открытие попапа просмотра изображения кликом на кнопку закрытия
  this._element.querySelector('.element__image').addEventListener('click', () => {
    this._previewCardPopup();
  })

  // закрытие попапа просмотра изображения кликом на кнопку закрытия
  closePreviewButton.addEventListener('click', () => {
    this._closePreviewPopup();
  })
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

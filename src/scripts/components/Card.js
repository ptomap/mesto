export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._titlePhoto = data.titlePhoto;
    this._linkPhoto = data.linkPhoto;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  //лайк
  _likeCard() {
    const likeBtn = this._element.querySelector('.element__like-button');
    likeBtn.classList.toggle('element__like-button_active');
  }

  //удаление
  _deleteCard() {
    this._element.remove();
    this._element = null;
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
// открытие попапа просмотра изображения кликом по изображению
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._titlePhoto, this._linkPhoto);
    })
  }
  //создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._linkPhoto;
    this._element.querySelector('.element__image').alt = this._titlePhoto;
    this._element.querySelector('.element__title').textContent = this._titlePhoto;

    return this._element;
  }
}

export class Card {
  constructor(name, link, cardSelector) {
    this._container = document.querySelector(cardSelector);
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
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

  _setEventListeners() {
  // кнопка удаления
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
    this._deleteCard();
  })
  // кнопка лайк
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
    this._likeCard();
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

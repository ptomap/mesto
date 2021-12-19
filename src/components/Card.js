export default class Card {
  constructor({ data, cardSelector, userId, handleCardClick, handleDeleteIconClick, handleSetLike, handleRemoveLike }) {
    this._titlePhoto = data.name;
    this._linkPhoto = data.link;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._likes = data.likes;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  //удаление
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
  // кнопка удаления
    this._element.querySelector('.element__trash-button').addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId);
  })
  // кнопка лайк
  this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('element__like-button_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    })
// открытие попапа изображения кликом по изображению
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._titlePhoto, this._linkPhoto);
    })
  }


  //создание карточки
  generateCard() {
    this._element = this._getTemplate();


    this._image = this._element.querySelector('.element__image');
    this._likeBtn = this._element.querySelector('.element__like-button');
    this._likesNumber = this._element.querySelector('.element__likes-number');
    this._deleteBtn = this._element.querySelector('.element__trash-button');


    this._image.src = this._linkPhoto;
    this._image.alt = this._titlePhoto;
    this._element.querySelector('.element__title').textContent = this._titlePhoto;
    this._hideDeleteBtn();
    this._checkCardLiked();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }

// есть ли лайк
  _checkCardLiked() {
    if (this._likes.some((user) => {
    return this._userId === user._id;
    })) {
    this._likeBtn.classList.add('element__like-button_active');
    }
  }

// кол-во лайков
  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeBtn.classList.toggle('element__like-button_active');
  }

// убрать кнопку удаления
  _hideDeleteBtn() {
    if (this._userId !== this._ownerId) {
      this._deleteBtn.remove();
    }
  }


}



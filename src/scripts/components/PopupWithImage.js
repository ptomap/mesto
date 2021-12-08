import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup-preview__image');
    this._popupName = this._popup.querySelector('.popup-preview__caption');
  }
  //вставка в попап картинки с src изображения и подписью к картинке
  open(titlePhoto, linkPhoto) {
    this._popupImage.src = linkPhoto;
    this._popupName.textContent = titlePhoto;
    super.open();
  }
}



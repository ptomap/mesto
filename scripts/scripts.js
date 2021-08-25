let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let submitPopupButton = document.querySelector('.popup__submit');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);
submitPopupButton.addEventListener('click', togglePopup);

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    nameInput = document.querySelector('.popup__input_type_name').value;
    jobInput = document.querySelector('.popup__input_type_job').value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let nameForm = document.querySelector('.profile__name');
    let jobForm = document.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
    nameForm.textContent = nameInput;
    jobForm.textContent = jobInput;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



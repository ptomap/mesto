export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //отрисовка всех элементов, отрисовка каждого отдельного элемента
  renderItems(data) {
    data.forEach(item => this._renderer(item));
  }
  //принимаем DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //отрисовка всех элементов, отрисовка каждого отдельного элемента
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }
  //оторый принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}

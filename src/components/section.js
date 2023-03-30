export default class Section {
  constructor({ renderer }, container) {
    this.renderer = renderer;
    this.container = container;
  }

  // Метод для отрисовки всех переданных элементов на странице
  renderAll = (items) => {
    items.forEach((item) => {
      this.renderer(item);
    });
  };

  // Метод для добавления элемента в конец контейнера
  addItem(item) {
    this.container.append(item);
  }

  // Метод для добавления элемента в начало контейнера
  prependItem(item) {
    this.container.prepend(item);
  }
}

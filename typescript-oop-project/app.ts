class UserInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLFormElement;
  element: HTMLDivElement;
  todoInput: HTMLInputElement;
  typeInput: HTMLSelectElement;
  constructor() {
    this.templateElement = document.querySelector(
      "#form-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLFormElement;
    const importNode = document.importNode(this.templateElement.content, true)!;
    this.element = importNode.firstElementChild as HTMLDivElement;
    this.todoInput = this.element.querySelector(
      ".todo-input"
    )! as HTMLInputElement;
    this.typeInput = this.element.querySelector(
      ".form-select"
    )! as HTMLSelectElement;
    this.render();
  }
  getInput() {}
  render() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}
const userInput = new UserInput();

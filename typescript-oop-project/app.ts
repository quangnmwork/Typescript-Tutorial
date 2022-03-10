abstract class TodoComponent<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(templateId: string, hostId: string, isRenderAtStart: boolean) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId)! as T;
    const importNode = document.importNode(this.templateElement.content, true)!;
    this.element = importNode.firstElementChild as U;
    this.render(isRenderAtStart);
  }
  render(isRenderAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      isRenderAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }
}

class TodoList extends TodoComponent<HTMLDivElement, HTMLDivElement> {
  constructor() {
    super("todo-list", "app", false);
  }
}

class TodoInput extends TodoComponent<HTMLDivElement, HTMLFormElement> {
  todoInput: HTMLInputElement;
  typeInput: HTMLSelectElement;
  constructor() {
    super("form-input", "app", true);
    this.todoInput = this.element.querySelector(
      ".todo-input"
    )! as HTMLInputElement;
    this.typeInput = this.element.querySelector(
      ".form-select"
    )! as HTMLSelectElement;
  }
  getInput() {}
  render() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const todoInput = new TodoInput();
const todoList = new TodoList();

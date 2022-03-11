import { nameBeginWithCapital, validate } from "./validation.decorators";

type Listener<T> = (items: T[]) => void;

enum TodoStatus {
  Active,
  Finished,
}

class Todo {
  constructor(
    public id: string,
    public todoInput: string,
    public todoStatus: TodoStatus
  ) {}
}

class State<T> {
  protected listeners: Listener<T>[];
  dispatchListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}

class TodoProvider extends State<Todo> {
  private static _instance: TodoProvider;
  private listTodo: Todo[] = [];
  static getInstance() {
    if (!this._instance) {
      return new TodoProvider();
    } else return this._instance;
  }
  constructor() {
    super();
  }
  addTodo(todo: Todo) {
    this.listTodo.push(todo);
    this.updateListener();
  }
  removeTodo(todo: Todo) {
    const removeIndex: number = this.listTodo.findIndex((el) => {
      return (el.id = todo.id);
    });
    if (removeIndex) {
      this.listTodo = this.listTodo.splice(removeIndex, 1);
      this.updateListener();
    }
  }
  editStatusIndex(todo: Todo) {
    const editIndex: number = this.listTodo.findIndex((el) => {
      return (el.id = todo.id);
    });
    this.listTodo[editIndex].todoStatus =
      this.listTodo[editIndex].todoStatus == TodoStatus.Active
        ? TodoStatus.Finished
        : TodoStatus.Active;
    this.updateListener();
  }
  private updateListener() {
    for (let listenerFn of this.listeners) {
      listenerFn(this.listTodo.slice());
    }
  }
}
const todoProvider = TodoProvider.getInstance();

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

// class TodoItem extends TodoComponent<HTMLDivElement,HTMLDivElement> {

// }

class TodoList extends TodoComponent<HTMLDivElement, HTMLDivElement> {
  constructor() {
    super("todo-list", "app", false);
  }
  mount() {}
  updateMount() {}
}

class TodoInput extends TodoComponent<HTMLDivElement, HTMLFormElement> {
  todoInput: HTMLInputElement;
  typeInput: HTMLSelectElement;
  buttonInput: HTMLButtonElement;
  constructor() {
    super("form-input", "app", true);
    this.todoInput = this.element.querySelector(
      ".todo-input"
    )! as HTMLInputElement;
    this.typeInput = this.element.querySelector(
      ".form-select"
    )! as HTMLSelectElement;
    this.buttonInput = this.element.querySelector(
      ".form-button"
    )! as HTMLButtonElement;
  }
  getInput() {}
  @validate
  submitHandler(@nameBeginWithCapital a: string) {
    console.log(a);
  }
}

const todoInput = new TodoInput();
const todoList = new TodoList();

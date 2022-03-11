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

class TabPanelProvider {
  private static _instance: TabPanelProvider;
  private panel: TodoStatus = TodoStatus.Active;
  static getInstance() {
    if (!this._instance) {
      return new TabPanelProvider();
    } else return this._instance;
  }
  get typePanel() {
    return this.panel;
  }
  switchType() {
    this.panel =
      this.panel == TodoStatus.Active ? TodoStatus.Finished : TodoStatus.Active;
  }
}
const tabPanelProvider = TabPanelProvider.getInstance();

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
    // console.log(this.element, this.templateElement, this.hostElement);
    this.render(isRenderAtStart);
  }
  render(isRenderAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      isRenderAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }
  abstract eventListener(): void;
}

class TodoItem extends TodoComponent<HTMLDivElement, HTMLDivElement> {
  todo: Todo;
  constructor() {
    super("list-todo-ul", "todo-container", false);
  }
  eventListener(): void {}
}

class TodoList extends TodoComponent<HTMLDivElement, HTMLDivElement> {
  activeType: HTMLDivElement;
  finishedType: HTMLDivElement;
  constructor() {
    super("todo-list", "app", false);
    this.activeType = this.element.querySelector("#active");
    this.finishedType = this.element.querySelector("#finished");
    this.eventListener();
    this.updateMount();
  }

  mount() {}
  resetPanel() {
    this.activeType.classList.remove("todo-type__active");
    this.finishedType.classList.remove("todo-type__active");
  }
  updateMount() {
    this.resetPanel();
    if (tabPanelProvider.typePanel === TodoStatus.Active) {
      this.activeType.classList.add("todo-type__active");
    } else {
      this.finishedType.classList.add("todo-type__active");
    }
  }
  eventListener(): void {
    this.activeType.addEventListener("click", (e) => {
      e.preventDefault();
      tabPanelProvider.switchType();
      this.updateMount();
    });
    this.finishedType.addEventListener("click", (e) => {
      e.preventDefault();
      tabPanelProvider.switchType();
      this.updateMount();
    });
  }
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

  submitHandler(a: string) {
    console.log(a);
  }
  eventListener(): void {}
}

const todoInput = new TodoInput();
const todoList = new TodoList();
const todoItem = new TodoItem();

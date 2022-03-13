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
type Listener<T> = (items: T[]) => Todo[];
class State<T> {
  protected listeners: Listener<T>[] = [];
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
  switchType(status: TodoStatus) {
    this.panel = status;
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
  getAllTodo() {
    // console.log("GetallTodo", this.listTodo);
    return this.updateListener();
  }
  addTodo(todo: Todo) {
    console.log("add to do call");
    this.listTodo.push(todo);
  }
  removeTodo(todo: Todo) {
    const removeIndex: number = this.listTodo.findIndex((el) => {
      return (el.id = todo.id);
    });
    if (removeIndex) {
      this.listTodo = this.listTodo.splice(removeIndex, 1);
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
  }
  private updateListener(): Todo[] {
    // console.log(this.listeners.length);
    if (this.listeners.length) {
      let todoList: Todo[] = [];
      for (let listenerFn of this.listeners) {
        console.log("function", listenerFn);
        todoList = listenerFn(this.listTodo.slice());
      }
      return todoList;
    }
    return [];
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
  todoList: Todo[] = [];
  constructor() {
    super("todo-list", "app", false);
    this.activeType = this.element.querySelector("#active");
    this.finishedType = this.element.querySelector("#finished");
    this.filterTodo(tabPanelProvider.typePanel);
    this.eventListener();
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
  filterTodo(status: TodoStatus) {
    todoProvider.dispatchListener((todoItems: Todo[]) => {
      return todoItems.filter((todo) => todo.todoStatus == status);
    });
  }
  renderTodoItem() {}
  eventListener(): void {
    this.activeType.addEventListener("click", (e) => {
      e.preventDefault();
      tabPanelProvider.switchType(TodoStatus.Active);
      this.updateMount();
      this.filterTodo(tabPanelProvider.typePanel);
      todoProvider.getAllTodo();
      // console.log(todoProvider.getAllTodo());
      // console.log("this todo list", this.todoList);
    });
    this.finishedType.addEventListener("click", (e) => {
      e.preventDefault();
      tabPanelProvider.switchType(TodoStatus.Finished);
      this.updateMount();
      this.filterTodo(tabPanelProvider.typePanel);
      todoProvider.getAllTodo();
      // console.log(todoProvider.getAllTodo());

      // console.log("this todo list", this.todoList);
    });
  }
}

class TodoInput extends TodoComponent<HTMLDivElement, HTMLFormElement> {
  todoInput: HTMLInputElement;
  typeInput: HTMLSelectElement;
  formSubmit: HTMLFormElement;
  constructor() {
    super("form-input", "app", true);
    this.todoInput = this.element.querySelector(
      ".todo-input"
    )! as HTMLInputElement;
    this.typeInput = this.element.querySelector(
      ".form-select"
    )! as HTMLSelectElement;
    this.formSubmit = this.element.querySelector(
      "#user-input"
    )! as HTMLFormElement;

    this.eventListener();
  }
  getInput(): [string, TodoStatus] {
    return [
      this.todoInput.value,
      this.typeInput.value == "active"
        ? TodoStatus.Active
        : TodoStatus.Finished,
    ];
  }

  eventListener(): void {
    this.formSubmit.addEventListener("submit", (e) => {
      const [todoInput, typeInput] = this.getInput();
      let newTodo = new Todo(Date.now().toString(), todoInput, typeInput);
      e.preventDefault();
      todoProvider.addTodo(newTodo);
      // console.log(todoProvider.getAllTodo());
    });
  }
}
const todoList = new TodoList();
const todoItem = new TodoItem();
const todoInput = new TodoInput();

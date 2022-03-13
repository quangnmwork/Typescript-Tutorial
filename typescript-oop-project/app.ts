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
  get length() {
    return this.listTodo.length;
  }
  getAllTodo() {
    // console.log("GetallTodo", this.listTodo);
    return this.updateListener();
  }
  addTodo(todo: Todo) {
    this.listTodo.push(todo);
  }
  removeTodo(id: string) {
    this.listTodo = this.listTodo.filter((todoItem) => todoItem.id !== id);
  }
  editStatusIndex(id: string) {
    const editIndex: number = this.listTodo.findIndex((el) => {
      return el.id == id;
    });
    this.listTodo[editIndex].todoStatus = TodoStatus.Finished;
  }
  private updateListener(): Todo[] {
    // console.log(this.listeners.length);
    if (this.listeners.length) {
      let todoList: Todo[] = [];
      for (let listenerFn of this.listeners) {
        // console.log("function", listenerFn);
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
    // console.log(this.templateElement, templateId);
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
  abstract mount(): void;
}

class TodoList extends TodoComponent<HTMLDivElement, HTMLDivElement> {
  activeType: HTMLDivElement;
  finishedType: HTMLDivElement;
  todoList: Todo[] = [];

  constructor() {
    super("todo-list", "app", false);
    this.mount();
    this.eventListener();
  }
  mount() {
    this.activeType = this.element.querySelector("#active");
    this.finishedType = this.element.querySelector("#finished");
  }
  resetPanel() {
    this.activeType.classList.remove("todo-type__active");
    this.finishedType.classList.remove("todo-type__active");
  }
  renderTodoList() {
    this.filterTodo(tabPanelProvider.typePanel);
    this.todoList = todoProvider.getAllTodo();
    this.element.querySelector("#list-todo-ul").innerHTML = ``;
    this.todoList.forEach((todoItem) => {
      this.element
        .querySelector("#list-todo-ul")
        .insertAdjacentHTML("afterbegin", `${this.convertTodoItem(todoItem)}`);
    });
  }
  convertTodoItem(todoItem: Todo) {
    if (todoItem.todoStatus == TodoStatus.Active) {
      return `<div class="template-item" id=${todoItem.id}><div class="list-todo-item" >
    <p class="list-todo-des">${todoItem.todoInput}</p>
    <div class="list-todo-handler">
      <button class="list-todo-btn list-todo-check">Done</button
      ><button class="list-todo-btn list-todo-del">Del</button>
    </div>
  </div></div>`;
    } else {
      return `<div class="template-item" id=${todoItem.id}><div class="list-todo-item" >
     <p class="list-todo-des">${todoItem.todoInput}</p>
     <div class="list-todo-handler">
       <button class="list-todo-btn list-todo-del">Del</button>
     </div>
   </div></div>`;
    }
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
  handlerActionItem() {
    if (this.element.querySelectorAll(".template-item").length) {
      this.element.querySelectorAll(".template-item").forEach((todoItem) => {
        todoItem
          .querySelector(".list-todo-check")
          ?.addEventListener("click", (e) => {
            e.preventDefault();
            todoProvider.editStatusIndex(todoItem.id);
            this.activeType.click();
          });
        todoItem
          .querySelector(".list-todo-del")
          .addEventListener("click", (e) => {
            e.preventDefault();
            console.log(todoItem.id);
            todoProvider.removeTodo(todoItem.id);
            if (tabPanelProvider.typePanel === TodoStatus.Active) {
              this.activeType.click();
            } else {
              this.finishedType.click();
            }
            console.log(todoProvider.getAllTodo());
          });
      });
    }
  }
  eventListener(): void {
    this.activeType.addEventListener("click", (e) => {
      e.preventDefault();
      tabPanelProvider.switchType(TodoStatus.Active);
      this.updateMount();
      this.renderTodoList();
      this.handlerActionItem();
    });
    this.finishedType.addEventListener("click", (e) => {
      e.preventDefault();
      tabPanelProvider.switchType(TodoStatus.Finished);
      this.updateMount();
      this.renderTodoList();
      this.handlerActionItem();
    });
  }
}
const todoList = new TodoList();
class TodoInput extends TodoComponent<HTMLDivElement, HTMLFormElement> {
  todoInput: HTMLInputElement;
  typeInput: HTMLSelectElement;
  formSubmit: HTMLFormElement;
  constructor() {
    super("form-input", "app", true);
    this.mount();
    this.eventListener();
  }
  mount() {
    this.todoInput = this.element.querySelector(
      ".todo-input"
    )! as HTMLInputElement;
    this.typeInput = this.element.querySelector(
      ".form-select"
    )! as HTMLSelectElement;
    this.formSubmit = this.element.querySelector(
      "#user-input"
    )! as HTMLFormElement;
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
      let newTodo = new Todo(
        (todoProvider.length + 1).toString(),
        todoInput,
        typeInput
      );
      e.preventDefault();
      todoProvider.addTodo(newTodo);
      if (tabPanelProvider.typePanel === TodoStatus.Active) {
        todoList.activeType.click();
      } else {
        todoList.finishedType.click();
      }
    });
  }
}
const todoInput = new TodoInput();

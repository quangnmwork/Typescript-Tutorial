var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TodoStatus;
(function (TodoStatus) {
    TodoStatus[TodoStatus["Active"] = 0] = "Active";
    TodoStatus[TodoStatus["Finished"] = 1] = "Finished";
})(TodoStatus || (TodoStatus = {}));
var Todo = /** @class */ (function () {
    function Todo(id, todoInput, todoStatus) {
        this.id = id;
        this.todoInput = todoInput;
        this.todoStatus = todoStatus;
    }
    return Todo;
}());
var State = /** @class */ (function () {
    function State() {
        this.listeners = [];
    }
    State.prototype.dispatchListener = function (listener) {
        this.listeners.push(listener);
    };
    return State;
}());
var TabPanelProvider = /** @class */ (function () {
    function TabPanelProvider() {
        this.panel = TodoStatus.Active;
    }
    TabPanelProvider.getInstance = function () {
        if (!this._instance) {
            return new TabPanelProvider();
        }
        else
            return this._instance;
    };
    Object.defineProperty(TabPanelProvider.prototype, "typePanel", {
        get: function () {
            return this.panel;
        },
        enumerable: false,
        configurable: true
    });
    TabPanelProvider.prototype.switchType = function (status) {
        this.panel = status;
    };
    return TabPanelProvider;
}());
var tabPanelProvider = TabPanelProvider.getInstance();
var TodoProvider = /** @class */ (function (_super) {
    __extends(TodoProvider, _super);
    function TodoProvider() {
        var _this = _super.call(this) || this;
        _this.listTodo = [];
        return _this;
    }
    TodoProvider.getInstance = function () {
        if (!this._instance) {
            return new TodoProvider();
        }
        else
            return this._instance;
    };
    Object.defineProperty(TodoProvider.prototype, "length", {
        get: function () {
            return this.listTodo.length;
        },
        enumerable: false,
        configurable: true
    });
    TodoProvider.prototype.getAllTodo = function () {
        // console.log("GetallTodo", this.listTodo);
        return this.updateListener();
    };
    TodoProvider.prototype.addTodo = function (todo) {
        this.listTodo.push(todo);
    };
    TodoProvider.prototype.removeTodo = function (id) {
        this.listTodo = this.listTodo.filter(function (todoItem) { return todoItem.id !== id; });
    };
    TodoProvider.prototype.editStatusIndex = function (id) {
        var editIndex = this.listTodo.findIndex(function (el) {
            return el.id == id;
        });
        this.listTodo[editIndex].todoStatus = TodoStatus.Finished;
    };
    TodoProvider.prototype.updateListener = function () {
        // console.log(this.listeners.length);
        if (this.listeners.length) {
            var todoList_1 = [];
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listenerFn = _a[_i];
                // console.log("function", listenerFn);
                todoList_1 = listenerFn(this.listTodo.slice());
            }
            return todoList_1;
        }
        return [];
    };
    return TodoProvider;
}(State));
var todoProvider = TodoProvider.getInstance();
var TodoComponent = /** @class */ (function () {
    function TodoComponent(templateId, hostId, isRenderAtStart) {
        this.templateElement = document.getElementById(templateId);
        // console.log(this.templateElement, templateId);
        this.hostElement = document.getElementById(hostId);
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        // console.log(this.element, this.templateElement, this.hostElement);
        this.render(isRenderAtStart);
    }
    TodoComponent.prototype.render = function (isRenderAtStart) {
        this.hostElement.insertAdjacentElement(isRenderAtStart ? "afterbegin" : "beforeend", this.element);
    };
    return TodoComponent;
}());
var TodoList = /** @class */ (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        var _this = _super.call(this, "todo-list", "app", false) || this;
        _this.todoList = [];
        _this.mount();
        _this.eventListener();
        return _this;
    }
    TodoList.prototype.mount = function () {
        this.activeType = this.element.querySelector("#active");
        this.finishedType = this.element.querySelector("#finished");
    };
    TodoList.prototype.resetPanel = function () {
        this.activeType.classList.remove("todo-type__active");
        this.finishedType.classList.remove("todo-type__active");
    };
    TodoList.prototype.renderTodoList = function () {
        var _this = this;
        this.filterTodo(tabPanelProvider.typePanel);
        this.todoList = todoProvider.getAllTodo();
        this.element.querySelector("#list-todo-ul").innerHTML = "";
        this.todoList.forEach(function (todoItem) {
            _this.element
                .querySelector("#list-todo-ul")
                .insertAdjacentHTML("afterbegin", "".concat(_this.convertTodoItem(todoItem)));
        });
    };
    TodoList.prototype.convertTodoItem = function (todoItem) {
        if (todoItem.todoStatus == TodoStatus.Active) {
            return "<div class=\"template-item\" id=".concat(todoItem.id, "><div class=\"list-todo-item\" >\n    <p class=\"list-todo-des\">").concat(todoItem.todoInput, "</p>\n    <div class=\"list-todo-handler\">\n      <button class=\"list-todo-btn list-todo-check\">Done</button\n      ><button class=\"list-todo-btn list-todo-del\">Del</button>\n    </div>\n  </div></div>");
        }
        else {
            return "<div class=\"template-item\" id=".concat(todoItem.id, "><div class=\"list-todo-item\" >\n     <p class=\"list-todo-des\">").concat(todoItem.todoInput, "</p>\n     <div class=\"list-todo-handler\">\n       <button class=\"list-todo-btn list-todo-del\">Del</button>\n     </div>\n   </div></div>");
        }
    };
    TodoList.prototype.updateMount = function () {
        this.resetPanel();
        if (tabPanelProvider.typePanel === TodoStatus.Active) {
            this.activeType.classList.add("todo-type__active");
        }
        else {
            this.finishedType.classList.add("todo-type__active");
        }
    };
    TodoList.prototype.filterTodo = function (status) {
        todoProvider.dispatchListener(function (todoItems) {
            return todoItems.filter(function (todo) { return todo.todoStatus == status; });
        });
    };
    TodoList.prototype.handlerActionItem = function () {
        var _this = this;
        if (this.element.querySelectorAll(".template-item").length) {
            this.element.querySelectorAll(".template-item").forEach(function (todoItem) {
                var _a;
                (_a = todoItem
                    .querySelector(".list-todo-check")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
                    e.preventDefault();
                    todoProvider.editStatusIndex(todoItem.id);
                    _this.activeType.click();
                });
                todoItem
                    .querySelector(".list-todo-del")
                    .addEventListener("click", function (e) {
                    e.preventDefault();
                    console.log(todoItem.id);
                    todoProvider.removeTodo(todoItem.id);
                    if (tabPanelProvider.typePanel === TodoStatus.Active) {
                        _this.activeType.click();
                    }
                    else {
                        _this.finishedType.click();
                    }
                    console.log(todoProvider.getAllTodo());
                });
            });
        }
    };
    TodoList.prototype.eventListener = function () {
        var _this = this;
        this.activeType.addEventListener("click", function (e) {
            e.preventDefault();
            tabPanelProvider.switchType(TodoStatus.Active);
            _this.updateMount();
            _this.renderTodoList();
            _this.handlerActionItem();
        });
        this.finishedType.addEventListener("click", function (e) {
            e.preventDefault();
            tabPanelProvider.switchType(TodoStatus.Finished);
            _this.updateMount();
            _this.renderTodoList();
            _this.handlerActionItem();
        });
    };
    return TodoList;
}(TodoComponent));
var todoList = new TodoList();
var TodoInput = /** @class */ (function (_super) {
    __extends(TodoInput, _super);
    function TodoInput() {
        var _this = _super.call(this, "form-input", "app", true) || this;
        _this.mount();
        _this.eventListener();
        return _this;
    }
    TodoInput.prototype.mount = function () {
        this.todoInput = this.element.querySelector(".todo-input");
        this.typeInput = this.element.querySelector(".form-select");
        this.formSubmit = this.element.querySelector("#user-input");
    };
    TodoInput.prototype.getInput = function () {
        return [
            this.todoInput.value,
            this.typeInput.value == "active"
                ? TodoStatus.Active
                : TodoStatus.Finished,
        ];
    };
    TodoInput.prototype.eventListener = function () {
        var _this = this;
        this.formSubmit.addEventListener("submit", function (e) {
            var _a = _this.getInput(), todoInput = _a[0], typeInput = _a[1];
            var newTodo = new Todo((todoProvider.length + 1).toString(), todoInput, typeInput);
            e.preventDefault();
            todoProvider.addTodo(newTodo);
            if (tabPanelProvider.typePanel === TodoStatus.Active) {
                todoList.activeType.click();
            }
            else {
                todoList.finishedType.click();
            }
        });
    };
    return TodoInput;
}(TodoComponent));
var todoInput = new TodoInput();

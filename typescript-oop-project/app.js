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
    TabPanelProvider.prototype.switchType = function () {
        this.panel =
            this.panel == TodoStatus.Active ? TodoStatus.Finished : TodoStatus.Active;
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
    TodoProvider.prototype.addTodo = function (todo) {
        this.listTodo.push(todo);
        this.updateListener();
    };
    TodoProvider.prototype.removeTodo = function (todo) {
        var removeIndex = this.listTodo.findIndex(function (el) {
            return (el.id = todo.id);
        });
        if (removeIndex) {
            this.listTodo = this.listTodo.splice(removeIndex, 1);
            this.updateListener();
        }
    };
    TodoProvider.prototype.editStatusIndex = function (todo) {
        var editIndex = this.listTodo.findIndex(function (el) {
            return (el.id = todo.id);
        });
        this.listTodo[editIndex].todoStatus =
            this.listTodo[editIndex].todoStatus == TodoStatus.Active
                ? TodoStatus.Finished
                : TodoStatus.Active;
        this.updateListener();
    };
    TodoProvider.prototype.updateListener = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.listTodo.slice());
        }
    };
    return TodoProvider;
}(State));
var todoProvider = TodoProvider.getInstance();
var TodoComponent = /** @class */ (function () {
    function TodoComponent(templateId, hostId, isRenderAtStart) {
        this.templateElement = document.getElementById(templateId);
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
var TodoItem = /** @class */ (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem() {
        return _super.call(this, "list-todo-ul", "todo-container", false) || this;
    }
    TodoItem.prototype.eventListener = function () { };
    return TodoItem;
}(TodoComponent));
var TodoList = /** @class */ (function (_super) {
    __extends(TodoList, _super);
    function TodoList() {
        var _this = _super.call(this, "todo-list", "app", false) || this;
        _this.activeType = _this.element.querySelector("#active");
        _this.finishedType = _this.element.querySelector("#finished");
        _this.eventListener();
        _this.updateMount();
        return _this;
    }
    TodoList.prototype.mount = function () { };
    TodoList.prototype.resetPanel = function () {
        this.activeType.classList.remove("todo-type__active");
        this.finishedType.classList.remove("todo-type__active");
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
    TodoList.prototype.eventListener = function () {
        var _this = this;
        this.activeType.addEventListener("click", function (e) {
            e.preventDefault();
            tabPanelProvider.switchType();
            _this.updateMount();
        });
        this.finishedType.addEventListener("click", function (e) {
            e.preventDefault();
            tabPanelProvider.switchType();
            _this.updateMount();
        });
    };
    return TodoList;
}(TodoComponent));
var TodoInput = /** @class */ (function (_super) {
    __extends(TodoInput, _super);
    function TodoInput() {
        var _this = _super.call(this, "form-input", "app", true) || this;
        _this.todoInput = _this.element.querySelector(".todo-input");
        _this.typeInput = _this.element.querySelector(".form-select");
        _this.buttonInput = _this.element.querySelector(".form-button");
        return _this;
    }
    TodoInput.prototype.getInput = function () { };
    TodoInput.prototype.submitHandler = function (a) {
        console.log(a);
    };
    TodoInput.prototype.eventListener = function () { };
    return TodoInput;
}(TodoComponent));
var todoInput = new TodoInput();
var todoList = new TodoList();
var todoItem = new TodoItem();

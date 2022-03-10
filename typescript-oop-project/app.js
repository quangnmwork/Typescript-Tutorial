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
var TodoComponent = /** @class */ (function () {
    function TodoComponent(templateId, hostId, isRenderAtStart) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
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
        return _super.call(this, "todo-list", "app", false) || this;
    }
    return TodoList;
}(TodoComponent));
var TodoInput = /** @class */ (function (_super) {
    __extends(TodoInput, _super);
    function TodoInput() {
        var _this = _super.call(this, "form-input", "app", true) || this;
        _this.todoInput = _this.element.querySelector(".todo-input");
        _this.typeInput = _this.element.querySelector(".form-select");
        return _this;
    }
    TodoInput.prototype.getInput = function () { };
    TodoInput.prototype.render = function () {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    };
    return TodoInput;
}(TodoComponent));
var todoInput = new TodoInput();
var todoList = new TodoList();

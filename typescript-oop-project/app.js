"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var validation_decorators_1 = require("./validation.decorators");
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
        _this.buttonInput = _this.element.querySelector(".form-button");
        return _this;
    }
    TodoInput.prototype.getInput = function () { };
    TodoInput.prototype.submitHandler = function (a) {
        console.log(a);
    };
    __decorate([
        validation_decorators_1.validate,
        __param(0, validation_decorators_1.nameBeginWithCapital)
    ], TodoInput.prototype, "submitHandler");
    return TodoInput;
}(TodoComponent));
var todoInput = new TodoInput();
var todoList = new TodoList();

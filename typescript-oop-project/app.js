var UserInput = /** @class */ (function () {
    function UserInput() {
        this.templateElement = document.querySelector("#form-input");
        this.hostElement = document.getElementById("app");
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.todoInput = this.element.querySelector(".todo-input");
        this.typeInput = this.element.querySelector(".form-select");
        this.render();
    }
    UserInput.prototype.getInput = function () { };
    UserInput.prototype.render = function () {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    };
    return UserInput;
}());
var userInput = new UserInput();

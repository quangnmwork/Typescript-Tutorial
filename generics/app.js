var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//function generic
function printGeneric(variable) {
    console.log(variable);
}
printGeneric("Hello word");
function identity(arg) {
    return arg;
}
var myIdentity = identity;
var myIdentity1 = identity;
var myIdentity2 = identity;
var myIdentity4 = identity;
function mergeObject(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
var merged = mergeObject({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
function receiveMessage(message) {
    if (message.length) {
        console.log(message.length);
    }
    console.log("Hi this is message" + message);
}
// receiveMessage("123");
// class generics
var listItem = /** @class */ (function () {
    function listItem() {
        this.items = [];
    }
    listItem.prototype.addItem = function (item) {
        this.items.push(item);
    };
    listItem.prototype.removeItem = function (item) {
        if (this.items.indexOf(item) === -1) {
            return;
        }
        this.items.splice(this.items.indexOf(item), 1);
    };
    return listItem;
}());
var list = new listItem();
function createPerson(person, friend) {
    return __assign(__assign({}, person), friend);
}
var personObj = { name: "Ez", age: 12 };
console.log(createPerson(personObj, { name: "Pz" }));

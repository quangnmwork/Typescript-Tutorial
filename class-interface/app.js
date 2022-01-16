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
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.exp = 5;
        this.expp = 2;
        this.name = name;
    }
    Animal.prototype.instruction = function (height) {
        if (height === void 0) { height = 2; }
        console.log("This is " + this.name + ". Height " + height);
    };
    return Animal;
}());
// let fish = new Animal("fish");
// fish.instruction();
// inheritance
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        var _this = _super.call(this, "cat") || this;
        _this.special = true;
        _this.cantModify = 2;
        return _this;
    }
    Cat.prototype.sleep = function () {
        _super.prototype.instruction.call(this);
        console.log("meow" + this.special);
        // console.log(this.exp); // error here
        console.log(this.expp);
    };
    Cat.prototype.instruction = function (h) {
        if (h === void 0) { h = 3; }
        _super.prototype.instruction.call(this, h);
    };
    return Cat;
}(Animal));
var cat = new Cat();
// cat.sleep();
// console.log(cat.cantModify);
// cat.cantModify = 3; // error
// console.log(cat.special); //error here
var Example = /** @class */ (function () {
    function Example() {
        this._number = 2;
    }
    Object.defineProperty(Example.prototype, "number", {
        get: function () {
            return this._number;
        },
        set: function (newNumber) {
            this._number = newNumber;
        },
        enumerable: false,
        configurable: true
    });
    return Example;
}());
// let e = new Example();
// console.log(e.number);
// e.number = 3;
// console.log(e.number);
//static
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = point.x - Grid.origin.x;
        var yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1.0); // 1x scale
var grid2 = new Grid(5.0); // 5x scale
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
// abstract
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log("Department name: " + this.name);
    };
    return Department;
}());
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment() {
        return _super.call(this, "Accounting and Auditing") || this;
    }
    AccountingDepartment.prototype.printMeeting = function () {
        console.log("The Accounting Department meets each Monday at 10am.");
    };
    AccountingDepartment.prototype.generateReports = function () {
        console.log("Generating accounting reports...");
    };
    return AccountingDepartment;
}(Department));
var department = new AccountingDepartment();
department.printMeeting();
department.generateReports();
department.printName();
//   department = new Department(); // error: cannot create an instance of an abstract class
var Point = /** @class */ (function () {
    function Point(x1, y1) {
        if (x1 === void 0) { x1 = 1; }
        if (y1 === void 0) { y1 = 5; }
        this.x = x1;
        this.y = y1;
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };
console.log(point3d);
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
console.log(greeter(user));

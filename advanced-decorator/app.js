// target: Either the constructor function of the class for a static method, or the prototype of the class for an instance method.
// propertyKey: The name of the method.
// descriptor: The Property Descriptor for the method.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Enumerable(value) {
    return function (target, propertyKey, descriptor) {
        // console.log(typeof target)
        // console.log(propertyKey)
        descriptor.enumerable = value;
    };
}
var Car3 = /** @class */ (function () {
    function Car3() {
        this.speed = 2;
    }
    Car3.prototype.run = function () {
        console.log("inside run method...");
    };
    Car3.prototype.run1 = function () {
        console.log("inside run method...");
    };
    Car3.prototype.run2 = function () {
        console.log("inside run method...");
    };
    __decorate([
        Enumerable(true)
    ], Car3.prototype, "run");
    __decorate([
        Enumerable(true)
    ], Car3.prototype, "run1");
    __decorate([
        Enumerable(false) //this will disable enum the key of class
    ], Car3.prototype, "run2");
    return Car3;
}());
// console.log("-- creating instance --");
// let car3 = new Car3();
// console.log("-- looping --");
// for (let key in car3) {
//     console.log("key: " + key);
// }
function Enumerable2(target, propertyKey, descriptor) {
    console.log("-- target --");
    console.log(target);
    console.log("-- proertyKey --");
    console.log(propertyKey);
    console.log("-- descriptor --");
    console.log(descriptor);
}
var Car2 = /** @class */ (function () {
    function Car2() {
    }
    Car2.run = function () {
        console.log("inside run method...");
    };
    __decorate([
        Enumerable2
    ], Car2, "run");
    return Car2;
}());
////////////////////////////////////////// Wrapping method
function logger(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Before call:", propertyKey);
        var result = originalMethod.apply(this, args);
        console.log("Result", result);
        console.log("after call:" + propertyKey);
        return result;
    };
}
var Task = /** @class */ (function () {
    function Task() {
    }
    Task.prototype.runTask = function (arg) {
        console.log("runTask invoked, args: " + arg);
        return "First task";
    };
    __decorate([
        logger
    ], Task.prototype, "runTask");
    return Task;
}());
console.log("-- creating an instance --");
var task = new Task();
console.log("-- invoking Task#runTask --");
var result = task.runTask([1, 2, 3]);
console.log("result: " + result);
function Log(target, propertyName) {
    console.log("Property decorator!");
    console.log("Log1", target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor decorator!");
    console.log("Log2", target);
    console.log("Log2", name);
    console.log("Log2", descriptor);
    //   descriptor.configurable = false
}
function Log3(target, name, descriptor) {
    console.log("Method decorator!");
    console.log("Log3", target);
    console.log("Log3", name);
    console.log("Log3", descriptor);
}
function Log4(target, name, position) {
    console.log("Parameter decorator!");
    console.log("Log4", target);
    console.log("Log4", name);
    console.log("Log4", position);
}
var Product = /** @class */ (function () {
    function Product(t, p) {
        this.title = t;
        this._price = p;
    }
    Object.defineProperty(Product.prototype, "price", {
        set: function (val) {
            if (val > 0) {
                this._price = val;
            }
            else {
                throw new Error("Invalid price - should be positive!");
            }
        },
        enumerable: false,
        configurable: true
    });
    Product.prototype.getPriceWithTax = function (tax, saleOff) {
        return this._price * (1 + tax) * saleOff;
    };
    __decorate([
        Log
    ], Product.prototype, "title");
    __decorate([
        Log2
    ], Product.prototype, "price");
    __decorate([
        Log3,
        __param(0, Log4),
        __param(1, Log4)
    ], Product.prototype, "getPriceWithTax");
    return Product;
}());
var p1 = new Product("Book", 19);
var p2 = new Product("Book 2", 29);
console.log(p1.getPriceWithTax(2, 3));

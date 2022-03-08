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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function Logger(logString) {
    console.log("LOGGER FACTORY");
    return function (constructor) {
        console.log("Logger string", logString);
        console.log("Construct", constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log("TEMPLATE FACTORY");
    return function (originalConstructor) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                console.log.apply(console, __spreadArray(["Args"], args, false));
                console.log("Original Constructor", originalConstructor);
                console.log("Rendering template");
                var hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = _this.name;
                    //   alert(args);
                }
                return _this;
            }
            return class_1;
        }(originalConstructor));
    };
}
// @Logger('LOGGING - PERSON')
var Person = /** @class */ (function () {
    function Person(givenName, givenAge) {
        this.age = 123;
        this.name = givenName;
        this.age = givenAge;
        console.log("Creating person object...");
    }
    Person = __decorate([
        Logger("LOGGING"),
        WithTemplate("<h1>My Person Object</h1>", "app")
    ], Person);
    return Person;
}());
var pers = new Person("Quang", 15);
console.log(pers);
// Method Decorators
function Enumerable(target, propertyKey, descriptor) {
    console.log("-- target --");
    console.log(target);
    console.log("-- proertyKey --");
    console.log(propertyKey);
    console.log("-- descriptor --");
    console.log(descriptor);
    //make the method enumerable
    descriptor.enumerable = true;
}

// target: Either the constructor function of the class for a static method, or the prototype of the class for an instance method.
// propertyKey: The name of the method.
// descriptor: The Property Descriptor for the method.

function Enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // console.log(typeof target)
    // console.log(propertyKey)
    descriptor.enumerable = value;
  };
}

class Car3 {
  speed: number = 2;
  @Enumerable(true)
  run() {
    console.log("inside run method...");
  }
  @Enumerable(true)
  run1() {
    console.log("inside run method...");
  }
  @Enumerable(false) //this will disable enum the key of class
  run2() {
    console.log("inside run method...");
  }
}

// console.log("-- creating instance --");
// let car3 = new Car3();
// console.log("-- looping --");
// for (let key in car3) {
//     console.log("key: " + key);
// }
function Enumerable2(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("-- target --");
  console.log(target);
  console.log("-- proertyKey --");
  console.log(propertyKey);
  console.log("-- descriptor --");
  console.log(descriptor);
}

class Car2 {
  @Enumerable2
  static run() {
    console.log("inside run method...");
  }
}

////////////////////////////////////////// Wrapping method
function logger(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  let originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("Before call:", propertyKey);
    let result = originalMethod.apply(this, args);
    console.log("Result", result);
    console.log("after call:" + propertyKey);
    return result;
  };
}
class Task {
  @logger
  runTask(arg: any): any {
    console.log("runTask invoked, args: " + arg);
    return "First task";
  }
}

console.log("-- creating an instance --");
let task = new Task();
console.log("-- invoking Task#runTask --");
let result = task.runTask([1, 2, 3]);
console.log("result: " + result);

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log("Log1", target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log("Log2", target);
  console.log("Log2", name);
  console.log("Log2", descriptor);
  //   descriptor.configurable = false
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log("Log3", target);
  console.log("Log3", name);
  console.log("Log3", descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log("Log4", target);
  console.log("Log4", name);
  console.log("Log4", position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number, @Log4 saleOff: number) {
    return this._price * (1 + tax) * saleOff;
  }
}

const p1 = new Product("Book", 19);
const p2 = new Product("Book 2", 29);
console.log(p1.getPriceWithTax(2, 3));

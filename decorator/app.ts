function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log("Logger string", logString);
    console.log("Construct", constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <
    T extends { new (...args: any[]): { name: string; age?: number } }
  >(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super();
        console.log("Args", ...args);
        console.log("Original Constructor", originalConstructor);
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
          //   alert(args);
        }
      }
    };
  };
}

// @Logger('LOGGING - PERSON')
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name: string;
  age?: number = 123;
  constructor(givenName: string, givenAge?: number) {
    this.name = givenName;
    this.age = givenAge;
    console.log("Creating person object...");
  }
}

const pers = new Person("Quang", 15);

console.log(pers);
// Method Decorators
function Enumerable(
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
  //make the method enumerable
  descriptor.enumerable = true;
}

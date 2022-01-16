class Animal {
  name: string;
  private exp: number;
  protected expp: number;
  constructor(name: string) {
    this.exp = 5;
    this.expp = 2;
    this.name = name;
  }
  instruction(height: number = 2) {
    console.log(`This is ${this.name}. Height ${height}`);
  }
}
// let fish = new Animal("fish");
// fish.instruction();

// inheritance

class Cat extends Animal {
  private special: boolean;
  readonly cantModify: number;
  constructor() {
    super("cat");
    this.special = true;
    this.cantModify = 2;
  }
  sleep() {
    super.instruction();
    console.log("meow" + this.special);
    // console.log(this.exp); // error here
    console.log(this.expp);
  }
  instruction(h = 3) {
    super.instruction(h);
  }
}
let cat = new Cat();
// cat.sleep();
// console.log(cat.cantModify);
// cat.cantModify = 3; // error
// console.log(cat.special); //error here

class Example {
  private _number: number;
  constructor() {
    this._number = 2;
  }
  get number(): number {
    return this._number;
  }
  set number(newNumber: number) {
    this._number = newNumber;
  }
}
// let e = new Example();
// console.log(e.number);
// e.number = 3;
// console.log(e.number);

//static
class Grid {
  static origin = { x: 0, y: 0 };

  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

// abstract
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing"); // constructors in derived classes must call super()
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}
let department = new AccountingDepartment();
department.printMeeting();
department.generateReports();
department.printName();
//   department = new Department(); // error: cannot create an instance of an abstract class

class Point {
  x: number;
  y: number;
  constructor(x1: number = 1, y1: number = 5) {
    this.x = x1;
    this.y = y1;
  }
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
console.log(point3d);

class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

console.log(greeter(user));

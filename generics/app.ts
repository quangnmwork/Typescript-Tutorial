//function generic
function printGeneric<Type>(variable: Type) {
  console.log(variable);
}
printGeneric("Hello word");
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;
let myIdentity1: { <Type>(arg: Type): Type } = identity;

let myIdentity2: <Input>(arg: Input) => Input = identity;
// console.log(myIdentity(1));
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

let myIdentity4: GenericIdentityFn<number> = identity;

function mergeObject<T extends object, U extends object>(
  obj1: T,
  obj2: U
): object {
  return Object.assign(obj1, obj2);
}
const merged = mergeObject({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
// console.log(merged);

interface Lengthy {
  length: number;
}
function receiveMessage<T extends Lengthy>(message: T): void {
  if (message.length) {
    console.log(message.length);
  }
  console.log("Hi this is message" + message);
}

// receiveMessage("123");

// class generics

class listItem<T extends number | string> {
  private items: T[] = [];
  constructor() {}
  addItem(item: T) {
    this.items.push(item);
  }
  removeItem(item: T) {
    if (this.items.indexOf(item) === -1) {
      return;
    }
    this.items.splice(this.items.indexOf(item), 1);
  }
}
const list = new listItem<number>();

// list.addItem(1);
// list.addItem(2);
// list.removeItem(2);

interface Personal {
  name: string;
  age: number;
}

function createPerson(person: Personal, friend: Partial<Personal>) {
  return {
    ...person,
    ...friend,
  };
}
const personObj: Personal = { name: "Ez", age: 12 };
console.log(createPerson(personObj, { name: "Pz" }));

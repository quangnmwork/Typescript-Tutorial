type Admin = {
  name: string;
  privileges: string[];
};
type Employee = {
  name: string;
  startDate: Date;
};
type ElevatedEmployee = Admin | Employee;
const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};
function printEmployee(person: ElevatedEmployee) {
  if ("privileges" in person) {
    console.log(person.privileges);
  }
}
printEmployee(e1);

interface Bird {
  food: string;
}
interface Dog {
  food: string;
  name: string;
}

type Animall = Bird | Dog;
// type predict
function isDog(pet: Animall): pet is Dog {
  return (pet as Dog).name.length > 0;
}

function printAnimal(animal: Animall) {
  console.log(isDog(animal));
}
printAnimal({ food: "rice", name: "peter" });
let accountCode = "123";
let castedAccountCode = accountCode as unknown as number;
console.log(typeof castedAccountCode);

const inputElement = document.querySelector(".user-input") as HTMLInputElement;
console.log(inputElement);
interface ErrContainer {
  [props: string]: string;
  [num: number]: string;
}
const err: ErrContainer = {
  name: "quang",
  12: "qu",
};
console.log(err.name);

declare namespace myLib {
  function makeGreeting(s: string): string;
  let numberOfGreetings: number;
}

function add(a: string, b: string): string;

function add(a: number, b: number): number;

function add(a: any, b: any): any {
  return a + b;
}

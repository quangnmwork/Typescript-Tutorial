// basic type

// function addNumber(n1: number, n2: number) {
//   if (typeof n1 == "number" && typeof n2 == "number") {
//     return n1 + n2;
//   } else {
//     throw new Error("Wrong input");
//   }
// }

// console.log(addNumber(1, "2"));

//object type

const animals: { name: string; w: number } = {
  name: "lion",
  w: 123,
};

let myFav: string[];
myFav = ["1", "2"];

enum Gender {
  woman = 1,
  men = 0,
}

const person: { name: String; role: [string, number]; gender: number } = {
  name: "quang",
  role: ["1", 2],
  gender: Gender.men,
};
console.log(person.gender);

function combine(a: string | number, b: string | number, type: "1" | "2") {
  console.log(type);
  if (typeof a == "number" && typeof b == "number") return a + b;
  if (typeof a == "string" && typeof b == "string") return a + " and " + b;
}
console.log(combine(1, 2, "2"), combine("a", "b", "1"));
// console.log(combine(1,2,"3")) // error

//custom type
type myType = number | string;

function sum(a: number, b: number): void {
  console.log(a, b);
}

sum(1, 2);
let myFunc: Function;
// myFunc=2 // error
myFunc = sum;

function cbFunc(a: number, cb: (b: number) => void) {
  console.log(cb(a));
}
cbFunc(1, n => {
  console.log(`Hello ${n}`);
});

let dontKnow: unknown;
dontKnow = 1;

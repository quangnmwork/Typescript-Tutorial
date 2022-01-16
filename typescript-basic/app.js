"use strict";
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
var animals = {
    name: "lion",
    w: 123,
};
var myFav;
myFav = ["1", "2"];
var Gender;
(function (Gender) {
    Gender[Gender["woman"] = 1] = "woman";
    Gender[Gender["men"] = 0] = "men";
})(Gender || (Gender = {}));
var person = {
    name: "quang",
    role: ["1", 2],
    gender: Gender.men,
};
console.log(person.gender);
function combine(a, b, type) {
    console.log(type);
    if (typeof a == "number" && typeof b == "number")
        return a + b;
    if (typeof a == "string" && typeof b == "string")
        return a + " and " + b;
}
console.log(combine(1, 2, "2"), combine("a", "b", "1"));
function sum(a, b) {
    console.log(a, b);
}
sum(1, 2);
var myFunc;
// myFunc=2 // error
myFunc = sum;
function cbFunc(a, cb) {
    console.log(cb(a));
}
cbFunc(1, function (n) {
    console.log("Hello " + n);
});
var dontKnow;
dontKnow = 1;
console.log("hello");

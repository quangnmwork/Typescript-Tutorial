var e1 = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date()
};
function printEmployee(person) {
    if ("privileges" in person) {
        console.log(person.privileges);
    }
}
printEmployee(e1);
// type predict
function isDog(pet) {
    return pet.name.length > 0;
}
function printAnimal(animal) {
    console.log(isDog(animal));
}
printAnimal({ food: "rice", name: "peter" });
var accountCode = "123";
var castedAccountCode = accountCode;
console.log(typeof castedAccountCode);
var inputElement = document.querySelector(".user-input");
console.log(inputElement);
var err = {
    name: "quang",
    12: "qu"
};
console.log(err.name);
function add(a, b) {
    return a + b;
}

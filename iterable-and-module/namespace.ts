namespace validate {
  export function haveEnoughLength(inputString: string) {
    return inputString.length > 5 ? true : false;
  }
}
let validator = validate.haveEnoughLength("quanggg");
console.log(validator);

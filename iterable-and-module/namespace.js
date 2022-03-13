var validate;
(function (validate) {
    function haveEnoughLength(inputString) {
        return inputString.length > 5 ? true : false;
    }
    validate.haveEnoughLength = haveEnoughLength;
})(validate || (validate = {}));
let validator = validate.haveEnoughLength("quanggg");
console.log(validator);

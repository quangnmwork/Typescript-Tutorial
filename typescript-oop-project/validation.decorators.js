"use strict";
exports.__esModule = true;
exports.validate = exports.nameBeginWithCapital = void 0;
require("reflect-metadata");
var checkCapitalMetadataKey = Symbol("CheckCapital");
function nameBeginWithCapital(target, propertyKey, parameterIndex) {
    var existingCapitalParameters = Reflect.getOwnMetadata(checkCapitalMetadataKey, target, propertyKey) || [];
    existingCapitalParameters.push(parameterIndex);
    Reflect.defineMetadata(checkCapitalMetadataKey, existingCapitalParameters, target, propertyKey);
}
exports.nameBeginWithCapital = nameBeginWithCapital;
function validate(target, propertyName, descriptor) {
    console.log(target, propertyName, descriptor);
    // let method = descriptor.value;
    // descriptor.value = function () {
    //   let capitalParameters: number[] = Reflect.getOwnMetadata(
    //     checkCapitalMetadataKey,
    //     target,
    //     propertyName
    //   );
    //   if (capitalParameters) {
    //     for (let parameterIndex of capitalParameters) {
    //       if (!arguments[parameterIndex].match(/^[A-Z].*/)) {
    //         throw new Error("Does not start with an uppercase letter!");
    //       }
    //     }
    //   }
    //   return method!.apply(this, arguments);
}
exports.validate = validate;

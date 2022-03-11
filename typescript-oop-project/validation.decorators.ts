import "reflect-metadata";

const checkCapitalMetadataKey = "CheckCapital";

export function nameBeginWithCapital(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  let existingCapitalParameters: number[] =
    Reflect.getOwnMetadata(checkCapitalMetadataKey, target, propertyKey) || [];
  existingCapitalParameters.push(parameterIndex);
  Reflect.defineMetadata(
    checkCapitalMetadataKey,
    existingCapitalParameters,
    target,
    propertyKey
  );
  // console.log(existingCapitalParameters);
}

export const validate = (
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) => {
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
};

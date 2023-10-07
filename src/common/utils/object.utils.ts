import { clearString } from './string.utils';

/**
 * Check if any property by object is invalid
 * - PASS ONLY OBJECT
 * @param object
 */
export const validateObject = <TypeObject>(object: TypeObject) => {
  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      const propertyValue = object[property];
      const isOptional = property.endsWith('?');

      switch (typeof propertyValue) {
        case 'string':
          if (isOptional) break;

          const empty = propertyValue.trim().length === 0;

          if (empty) {
            throw new Error(`${property} is a required and cannot be empty`);
          }
          break;
        case 'object':
          if (isOptional) break;

          if (Array.isArray(propertyValue)) {
            /**
             * Check when array is not optional and is empty
             */
            if (!propertyValue.length) {
              throw new Error(`${property} is a required and cannot be empty`);
            }

            /**
             * check when has some element inside type string and empty
             */
            if (propertyValue.every((element) => typeof element === 'string')) {
              const someEmpty = propertyValue.some(
                (element) => element.trim().length === 0,
              );

              if (someEmpty) {
                throw new Error(`${property} has some value empty inside`);
              }
            }
          }
          break;
        case 'number':
          if (isOptional) break;

          if (isNaN(propertyValue)) {
            throw new Error(
              `${property} is required type of a number and cannot be empty`,
            );
          }
      }
    }
  }
};

/**
 * @description Remove undefined, null and empty values by object
 * - When value is string remove unnecessary white spaces
 * @param object
 */
export const dataProcessing = <TypeObject>(object: TypeObject): TypeObject => {
  return Object.keys(object)
    .filter((key) => {
      const valor = (object as any)[key];
      return valor !== undefined && valor !== null && valor !== '';
    })
    .map((key) => {
      if (typeof (object as any)[key] === 'string') {
        (object as any)[key] = clearString((object as any)[key]);
      }
      return key;
    })
    .reduce((newObj, key) => {
      (newObj as any)[key] = (object as any)[key];
      return newObj;
    }, {}) as TypeObject;
};

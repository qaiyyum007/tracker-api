import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class MinAgeConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: import('class-validator').ValidationArguments) {
    const ageLimit = validationArguments?.constraints[0];
    const dob = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= ageLimit;
  }
}

export function MinAge(age: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [age],
      validator: MinAgeConstraint,
    });
  };
}

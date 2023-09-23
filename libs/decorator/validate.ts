import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { IUnknowObject } from 'libs/utils';
import * as moment from 'moment';

export function IsDateMoreThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: IUnknowObject, propertyName: string) {
    registerDecorator({
      name: 'isDateMoreThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          const startDate = moment(relatedValue);
          const endDate = moment(value);
          return startDate < endDate;
        },
      },
    });
  };
}

export function IsValidDateInFuture(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: IUnknowObject, propertyName: string) {
    registerDecorator({
      name: 'isValidDateInFuture',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          const now = moment();
          const date = moment(value);
          if (relatedValue) {
            return date > now;
          }
          return date < now;
        },
      },
    });
  };
}

export function IsMoreThanOrEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: IUnknowObject, propertyName: string) {
    registerDecorator({
      name: 'isMoreThanOrEqual',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          const firstNumber = Number(relatedValue);
          const secondNumber = Number(value);
          return firstNumber < secondNumber;
        },
      },
    });
  };
}

export function IsPositiveNumber(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: IUnknowObject, propertyName: string) {
    registerDecorator({
      name: 'isPositiveNumber',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value >= 0;
        },
      },
    });
  };
}

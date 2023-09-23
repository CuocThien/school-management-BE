import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { values } from 'lodash';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  _validatiorOptions: ValidatorOptions;
  constructor(validatorOptions: Partial<ValidatorOptions>) {
    this._validatiorOptions = {
      ...validatorOptions,
    };
  }
  async transform(value: any, args: ArgumentMetadata) {
    const { metatype } = args;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, this._validatiorOptions);
    if (errors.length > 0) {
      const details = errors.map((err: ValidationError) => {
        const { value, constraints, property } = err || {};
        const issue = values(constraints)[0];
        return {
          field: property,
          value,
          issue,
        };
      });
      throw new BadRequestException({
        message: 'INVALID_VALIDATION',
        errors: true,
        details,
      });
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

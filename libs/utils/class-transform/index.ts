import { TransformFnParams } from 'class-transformer';
import { isNumber } from 'class-validator';
import { isArray, isEmpty } from 'lodash';

export const transformPage = (params: TransformFnParams) => {
  return Number(params.value || 1);
};

export const transformLimit = (params: TransformFnParams) => {
  return Number(params.value || 20);
};

export const transformStringToBoolean = (params: TransformFnParams) => {
  const stringValue = params.value;
  switch (stringValue?.toLowerCase()?.trim()) {
    case 'true': {
      return true;
    }
    case 'false':
    case '0':
    case null:
    case undefined: {
      return false;
    }
    default: {
      return JSON.parse(stringValue);
    }
  }
};

export const transformStringToNumber = (params: TransformFnParams) => {
  return Number(params.value);
};

export const transformToStandardPhoneNumber = (params: TransformFnParams) => {
  const cleanPhoneNumber = params.value.replace(/\s|\.|-/g, '');
  return cleanPhoneNumber.replace(/^[\+]?[(]?[\+]?84[)]?/g, '0');
};

export const isRecurring = (object: any): boolean => {
  return object.payFrequencyType == 'RECURRING';
};

export const transformAmount = (params: TransformFnParams) => {
  if (!params.value) {
    return undefined;
  }
  return String(params.value);
};

export const transformStringToArray = (params: TransformFnParams) => {
  const value = params.value;
  if (!value) return [];
  if (isArray(value)) return value;
  return [value];
};

export const transformArrayStringToUppercase = (params: TransformFnParams) => {
  return params.value.map((value) => String(value).toUpperCase());
};

export const transformStringToUppercase = (params: TransformFnParams) => {
  return String(params.value).toUpperCase();
};

export const defaultStringValue = (params: TransformFnParams) => {
  if (isEmpty(params.value)) return '';
  if (isEmpty(params.value.trim())) return '';
  return params.value;
};

export const defaultNumberValue = (params: TransformFnParams) => {
  if (!isNumber(params.value)) return 0;
  return params.value;
};

export const isCommodity = (object: any): boolean => {
  return object.isCommodity;
};

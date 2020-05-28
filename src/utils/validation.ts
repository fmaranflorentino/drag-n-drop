import Validatable from '../interfaces/validatable';

export function validate(validatableInput: Validatable): boolean {
  let isValid = true;
  const { value, required, minLength, maxLength, min, max } = validatableInput;

  if (required) {
    isValid = isValid && value.toString().trim().length !== 0;
  }

  if (minLength != null && typeof value === 'string') {
    isValid = isValid && value.length > minLength;
  }

  if (maxLength != null && typeof value === 'string') {
    isValid = isValid && value.length < maxLength;
  }

  if (min != null && typeof value === 'number') {
    isValid = isValid && value > min;
  }

  if (max != null && typeof value === 'number') {
    isValid = isValid && value < max;
  }

  return isValid;
}

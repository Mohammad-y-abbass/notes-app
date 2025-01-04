import { Result, ValidationError } from 'express-validator';

export class ValidationsError extends Error {
  status: number;
  errors: Result<ValidationError>;

  constructor(
    message : string,
    errors: Result<ValidationError>
  ) {
    super(message);
    this.name = 'Validation Error';
    this.status = 422;
    this.errors = errors;
  }
}

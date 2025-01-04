export class ValidationError extends Error {
  status: number;
  constructor(message = 'Schema Validation Error') {
    super(message);
    this.name = 'ValidationError';
    this.status = 422;
  }
}

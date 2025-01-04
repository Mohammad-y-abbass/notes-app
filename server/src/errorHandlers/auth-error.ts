export class UnauthorizedError extends Error {
  status: number;
  constructor(message = 'Unauthorized Access') {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}

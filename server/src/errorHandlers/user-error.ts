export class UserExistsError extends Error {
  status: number;
  constructor(message = 'User already exists') {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}

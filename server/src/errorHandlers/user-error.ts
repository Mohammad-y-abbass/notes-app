export class UserExistsError extends Error {
  status: number;
  constructor(message = 'User already exists') {
    super(message);
    this.name = 'user error';
    this.status = 401;
  }
}

export class PasswordDontMatchError extends Error {
  status: number;

  constructor(message = 'Paswword dont match') {
    super(message);
    this.name = 'user error';
    this.status = 400;
  }
}

export class FailedToCreateUserError extends Error {
  status: number;

  constructor(message = 'Failed to create user') {
    super(message);
    this.name = 'user error';
    this.status = 400;
  }
}

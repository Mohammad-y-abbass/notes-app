export class NoDataError extends Error {
  status: number;
  constructor(message = 'No Data Found') {
    super(message);
    this.name = 'NoDataError';
    this.status = 404;
  }
}

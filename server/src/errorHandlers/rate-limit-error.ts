export class RateLimitError extends Error {
  status: number;
  constructor(message = 'Rate Limit Exceeded') {
    super(message);
    this.name = 'RateLimitError';
    this.status = 429;
  }
}

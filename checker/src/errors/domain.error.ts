export class DomainError extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

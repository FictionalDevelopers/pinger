import { DomainError } from './domain.error';

export class NoConnectionError extends DomainError {
  constructor() {
    super();

    Object.setPrototypeOf(this, NoConnectionError.prototype);
  }
}

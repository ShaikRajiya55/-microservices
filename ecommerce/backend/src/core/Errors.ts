export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(entityName: string = 'Resource', id?: string) {
    super(id ? `${entityName} with id '${id}' not found` : `${entityName} not found`, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failure', details?: any) {
    super(message, 400, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized authentication access') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Insufficient permissions for this action') {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource state conflict') {
    super(message, 409);
  }
}

export class PaymentError extends AppError {
  constructor(message: string = 'Payment processing failed', details?: any) {
    super(message, 402, details);
  }
}

class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

class ForbiddenError extends CustomError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

class NotFoundError extends CustomError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

class InternalServerError extends CustomError {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}

export {
  CustomError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
};

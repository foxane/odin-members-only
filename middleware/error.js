export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log('Error catch by error middleware: ', err);

  // Prevent stack trace from being shown
  const errorMessage =
    statusCode === 404
      ? 'Page not found'
      : 'An unexpected error occurred. Please try again later. sorry :(';

  res.status(statusCode).render('pages/error', { error: errorMessage });
};

export class NotFoundError extends Error {
  constructor() {
    super('Resource not found');
    this.statusCode = 404;
  }
}

export class InternalServerError extends Error {
  constructor() {
    super('internal server error');
    this.statusCode = 500;
  }
}

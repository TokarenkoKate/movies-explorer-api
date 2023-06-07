const { ErrorMessages } = require('../constants/constants.js');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500
    ? `${ErrorMessages.server_error} ${err.message}`
    : err.message;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;

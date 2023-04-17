const NotFoundError = require('../errors/not-found-err');
const { ErrorMessages } = require('../constants/constants');

module.exports.handleInvalidRoute = (req, res, next) => {
  next(new NotFoundError(ErrorMessages.address_not_found));
};

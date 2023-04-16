const NotFoundError = require('../errors/not-found-err');

module.exports.handleInvalidRoute = (req, res, next) => {
  next(new NotFoundError('Такой адрес не существует.'));
};

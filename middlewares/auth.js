const jwt = require('jsonwebtoken');
const IncorrectAuthDataError = require('../errors/incorrect-auth-data-err');
const { NODE_ENV, JWT_SECRET } = require('../config');
const { ErrorMessages } = require('../constants/constants');

const extractBearerToken = (authorization) => authorization.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new IncorrectAuthDataError(ErrorMessages.require_auth));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (err) {
    return next(new IncorrectAuthDataError(ErrorMessages.require_auth));
  }

  req.user = payload;

  return next();
};

const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const requestsValidation = require('../requestsValidation/requestsValidation');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: requestsValidation.name,
    email: requestsValidation.email,
    password: requestsValidation.stringRequired,
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: requestsValidation.email,
    password: requestsValidation.stringRequired,
  }),
}), login);

module.exports = router;

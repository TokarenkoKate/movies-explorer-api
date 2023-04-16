const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const auth = require('../middlewares/auth');
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

router.use(auth);

router.use('/users', userRouter);

module.exports = router;

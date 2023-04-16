const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const requestsValidation = require('../requestsValidation/requestsValidation');

const { getCurrentUser, updateProfile } = require('../controllers/users');

// GET /users/me
router.get('/me', getCurrentUser);

// PATCH /users/me
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: requestsValidation.name,
    email: requestsValidation.email,
  }),
}), updateProfile);

module.exports = router;

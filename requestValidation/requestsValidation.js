const { Joi } = require('celebrate');

const requestsValidation = {
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
  stringRequired: Joi.string().required(),
  numberRequired: Joi.number().required(),
  year: Joi.string().required(),
  link: Joi.string().required().pattern(/^http(s)?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z]{2,4}([/\w])*(#)*/),
  id: Joi.string().length(24).hex().required(),
};

module.exports = requestsValidation;

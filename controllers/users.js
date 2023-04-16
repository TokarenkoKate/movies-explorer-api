const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const IncorrectDataError = require('../errors/incorrect-data-err');
const UserExistsError = require('../errors/user-exists-err');
const IncorrectAuthDataError = require('../errors/incorrect-auth-data-err');
const User = require('../models/user');
const { NODE_ENV, JWT_SECRET } = require('../config');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new UserExistsError('Пользователь с таким email уже существует.'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError('Некорректные данные для создания пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(() => {
      next(new IncorrectAuthDataError('Передан неверный логин или пароль'));
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      return next(new IncorrectAuthDataError('Передан неверный логин или пароль'));
    }))
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

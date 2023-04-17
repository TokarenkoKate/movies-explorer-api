const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const IncorrectDataError = require('../errors/incorrect-data-err');
const UserExistsError = require('../errors/user-exists-err');
const IncorrectAuthDataError = require('../errors/incorrect-auth-data-err');
const NotFoundError = require('../errors/not-found-err');
const User = require('../models/user');
const { NODE_ENV, JWT_SECRET } = require('../config');
const { ErrorMessages } = require('../constants/constants');

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
        next(new UserExistsError(ErrorMessages.duplicate_user));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError(ErrorMessages.invalid_create_user_data));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(() => {
      next(new IncorrectAuthDataError(ErrorMessages.invalid_email_or_password));
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      return next(new IncorrectAuthDataError(ErrorMessages.invalid_email_or_password));
    }))
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).exec()
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(ErrorMessages.user_with_id_not_found);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectDataError(ErrorMessages.invalid_user_id));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new UserExistsError(ErrorMessages.duplicate_user));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError(ErrorMessages.invalid_update_user_data));
      } else {
        next(err);
      }
    });
};

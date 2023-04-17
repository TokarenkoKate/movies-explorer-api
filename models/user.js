const mongoose = require('mongoose');
const validator = require('validator');
const { ValidationsErrors } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ValidationsErrors.name_required],
    minLength: [2, ValidationsErrors.min_length],
    maxLength: [30, ValidationsErrors.max_length],
  },
  email: {
    type: String,
    required: [true, ValidationsErrors.email_required],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: ValidationsErrors.invalid_email,
    },
  },
  password: {
    type: String,
    required: [true, ValidationsErrors.password_required],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);

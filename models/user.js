const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено.'],
    minLength: [2, 'Имя пользователя должно содержать минимум 2 символа.'],
    maxLength: [30, 'Имя пользователя должно содержать максимум 30 символов.'],
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено.'],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено.'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);

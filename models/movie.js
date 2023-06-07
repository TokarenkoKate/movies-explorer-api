const mongoose = require('mongoose');
const validator = require('validator');
const { ValidationsErrors } = require('../constants/constants.js');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: [true, ValidationsErrors.nameRU_required],
  },
  nameEN: {
    type: String,
    required: [true, ValidationsErrors.nameEN_required],
  },
  country: {
    type: String,
    required: [true, ValidationsErrors.country_required],
  },
  director: {
    type: String,
    required: [true, ValidationsErrors.director_required],
  },
  duration: {
    type: Number,
    required: [true, ValidationsErrors.duration_required],
  },
  year: {
    type: String,
    required: [true, ValidationsErrors.year_required],
  },
  description: {
    type: String,
    required: [true, ValidationsErrors.description_required],
  },
  image: {
    type: String,
    required: [true, ValidationsErrors.image_required],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: ValidationsErrors.invalid_url,
    },
  },
  trailerLink: {
    type: String,
    required: [true, ValidationsErrors.trailerLink_required],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: ValidationsErrors.invalid_url,
    },
  },
  thumbnail: {
    type: String,
    required: [true, ValidationsErrors.thumbnail_required],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: ValidationsErrors.invalid_url,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, ValidationsErrors.owner_required],
  },
  movieId: {
    type: Number,
    required: [true, ValidationsErrors.movieId_required],
  },
});

module.exports = mongoose.model('movie', movieSchema);

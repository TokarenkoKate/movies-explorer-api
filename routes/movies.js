const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const requestsValidation = require('../requestsValidation/requestsValidation');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// GET /movies
router.get('/', getMovies);

// POST /movies
router.post('/', celebrate({
  body: Joi.object().keys({
    nameRU: requestsValidation.stringRequired,
    nameEN: requestsValidation.stringRequired,
    country: requestsValidation.stringRequired,
    director: requestsValidation.stringRequired,
    duration: requestsValidation.numberRequired,
    year: requestsValidation.stringRequired,
    description: requestsValidation.stringRequired,
    image: requestsValidation.link,
    trailerLink: requestsValidation.link,
    thumbnail: requestsValidation.link,
    movieId: requestsValidation.numberRequired,
  }),
}), createMovie);

// DELETE /movies/_id
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: requestsValidation.id,
  }),
}), deleteMovie);

module.exports = router;

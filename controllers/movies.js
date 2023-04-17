const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenAccess = require('../errors/forbidden-access-err');
const IncorrectDataError = require('../errors/incorrect-data-err');
const { ErrorMessages, SuccessMessages } = require('../constants/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => {
      const currentUserMoviews = movies.filter((movie) => req.user._id === movie.owner.id);
      res.send(currentUserMoviews);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    nameRU, nameEN, country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId,
  } = req.body;
  Movie.create({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: req.user,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError(ErrorMessages.invalid_film_save_data));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .populate(['owner'])
    .then((movie) => {
      if (movie) {
        if (req.user._id === movie.owner.id) {
          movie.deleteOne()
            .then(() => res.send({ message: SuccessMessages.film_deleted }))
            .catch(next);
        } else {
          next(new ForbiddenAccess(ErrorMessages.cannot_delete_film));
        }
      } else {
        next(new NotFoundError(ErrorMessages.film_with_id_not_found));
      }
    })
    .catch(next);
};

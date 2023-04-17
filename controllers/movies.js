const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenAccess = require('../errors/forbidden-access-err');
const IncorrectDataError = require('../errors/incorrect-data-err');

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
        next(new IncorrectDataError('Некорректные данные при сохранения фильма.'));
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
            .then(() => res.send({ message: 'Фильм удален.' }));
        } else {
          next(new ForbiddenAccess('Вы не можете удалить чужой фильм'));
        }
      } else {
        next(new NotFoundError('Фильм по указанному _id не найден.'));
      }
    })
    .catch(next);
};

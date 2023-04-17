const ErrorMessages = {
  address_not_found: 'Такой адрес не существует.',
  invalid_film_save_data: 'Некорректные данные при сохранения фильма.',
  invalid_create_user_data: 'Некорректные данные для создания пользователя.',
  invalid_update_user_data: 'Некорректные данные для обновления профиля.',
  invalid_email_or_password: 'Передан неверный логин или пароль',
  film_with_id_not_found: 'Фильм по указанному _id не найден.',
  user_with_id_not_found: 'Пользователь по указанному _id не найден.',
  cannot_delete_film: 'Вы не можете удалить чужой фильм',
  duplicate_user: 'Пользователь с таким email уже существует.',
  invalid_user_id: 'Некорректный _id пользователя',
  require_auth: 'Необходима авторизация.',
  server_error: 'На сервере произошла ошибка:',
};

const SuccessMessages = {
  film_deleted: 'Фильм удален.',
};

const ValidationsErrors = {
  nameRU_required: 'Поле "nameRU" должно быть заполнено.',
  nameEN_required: 'Поле "nameEN" должно быть заполнено.',
  country_required: 'Поле "country" должно быть заполнено.',
  director_required: 'Поле "director" должно быть заполнено.',
  duration_required: 'Поле "duration" должно быть заполнено.',
  year_required: 'Поле "year" должно быть заполнено.',
  description_required: 'Поле "description" должно быть заполнено.',
  image_required: 'Поле "image" должно быть заполнено.',
  invalid_url: 'Некорректный URL изображения.',
  trailerLink_required: 'Поле "trailerLink" должно быть заполнено.',
  thumbnail_required: 'Поле "thumbnail" должно быть заполнено.',
  owner_required: 'Поле "owner" должно быть заполнено.',
  movieId_required: 'Поле "movieId" должно быть заполнено.',
  name_required: 'Поле "name" должно быть заполнено.',
  min_length: 'Имя пользователя должно содержать минимум 2 символа.',
  max_length: 'Имя пользователя должно содержать максимум 30 символов.',
  email_required: 'Поле "email" должно быть заполнено.',
  invalid_email: 'Некорректный email',
  password_required: 'Поле "password" должно быть заполнено.',
};

module.exports = { ErrorMessages, SuccessMessages, ValidationsErrors };

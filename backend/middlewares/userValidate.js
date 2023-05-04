const { celebrate, Joi } = require('celebrate');

const { passRegExp, urlRegExp } = require('../utils/regExp');

const userLoginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': 'Поле email должно быть заполнено',
      'string.email': 'Поле должно быть валидным email',
    }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Поле пароля должно быть заполнено',
      'string.min': 'Пароль должен быть не короче 8 симв.',
    }),
  }),
});

const userCreateValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Поле должно быть валидным email',
    }),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(passRegExp)
      .message('Пароль должен содержать a-z, A-Z, и 0-9')
      .messages({
        'string.min': 'Пароль должен быть не короче 8 симв.',
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Имя должно быть не короче 2 симв.',
      'string.max': 'Имя должно быть не длиннее 30 симв.',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Текст о себе должен быть не короче 2 симв.',
      'string.max': 'Текст о себе должен быть не длиннее 30 симв.',
    }),
    avatar: Joi.string().pattern(urlRegExp).message('Введите URL аватара'),
  }),
});

const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Имя должно быть не короче 2 симв.',
        'string.max': 'Имя должно быть не длиннее 30 симв.',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
    about: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Текст о себе должен быть не короче 2 симв.',
        'string.max': 'Текст о себе должен быть не длиннее 30 симв.',
        'string.empty': 'Поле "about" должно быть заполнено',
      }),
  }),
});

const userUpdateAvatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(urlRegExp)
      .message('Введите URL аватара')
      .messages({
        'string.empty': 'Поле "link" должно быть заполнено',
      }),
  }),
});

const userIdValidate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  userLoginValidate,
  userCreateValidate,
  userUpdateValidate,
  userUpdateAvatarValidate,
  userIdValidate,
};

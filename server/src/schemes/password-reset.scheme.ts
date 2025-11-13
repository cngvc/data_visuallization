import Joi, { ObjectSchema } from 'joi';

export const forgotPasswordSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.base': 'Email must be of type string',
      'string.email': 'Invalid email',
      'string.empty': 'Email is required'
    })
});

export const resetPasswordSchema: ObjectSchema = Joi.object().keys({
  token: Joi.string().required().messages({
    'string.base': 'Token must be of type string',
    'string.empty': 'Token is required',
    'any.required': 'Token is required'
  }),
  password: Joi.string().required().min(8).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Password must be at least 8 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'string.base': 'Confirm password must be of type string',
    'string.empty': 'Confirm password is required',
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm password is required'
  })
});

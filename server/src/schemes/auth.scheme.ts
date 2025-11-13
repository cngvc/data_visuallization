import { UserRoleEnum } from '@/entities/auth.entity';
import Joi, { ObjectSchema } from 'joi';

export const createUserSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().required().min(8).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.empty': 'Password is required'
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.base': 'Email must be of type string',
      'string.email': 'Invalid email',
      'string.empty': 'Email is required'
    }),
  role: Joi.string().required().valid(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.USER, UserRoleEnum.ORG_ADMIN).messages({
    'string.base': 'Role must be of type string',
    'string.empty': 'Role is required',
    'any.only': 'Invalid role'
  })
});

export const updateUserSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.base': 'Email must be of type string',
      'string.email': 'Invalid email'
    }),
  password: Joi.string().optional().allow(null).allow('').min(8).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password'
  }),
  role: Joi.string().valid(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.USER, UserRoleEnum.ORG_ADMIN).messages({
    'string.base': 'Role must be of type string',
    'any.only': 'Invalid role'
  }),
  isActive: Joi.boolean().messages({
    'boolean.base': 'isActive must be a boolean'
  })
});

export const signupSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().required().min(8).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.empty': 'Password is required'
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.base': 'Email must be of type string',
      'string.email': 'Invalid email',
      'string.empty': 'Email is required'
    })
});

export const signinSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      'string.base': 'Email must be of type string',
      'string.email': 'Invalid email',
      'string.empty': 'Email is required'
    }),
  password: Joi.string().required().min(8).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.empty': 'Password is required'
  })
});

export const signoutSchema: ObjectSchema = Joi.object().keys({
  refreshToken: Joi.string().required().messages({
    'string.base': 'Refresh token must be of type string',
    'string.empty': 'Refresh token is required',
    'any.required': 'Refresh token is required'
  })
});

export const refreshTokenSchema: ObjectSchema = Joi.object().keys({
  refreshToken: Joi.string().required().messages({
    'string.base': 'Refresh token must be of type string',
    'string.empty': 'Refresh token is required',
    'any.required': 'Refresh token is required'
  })
});

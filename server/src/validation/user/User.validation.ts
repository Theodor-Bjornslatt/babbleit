import Joi from 'joi'

import { BadRequest } from '../../errors'

export const ValidUser = {
  email: Joi.string()
    .email()
    .lowercase()
    .error(() => {
      return new BadRequest('Invalid email format')
    }),
  password: Joi.string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?\-_&])[A-Za-z\d@$!%*?\-_&]{10,30}$/
    )
    .error(() => {
      return new BadRequest(
        'Password must be 10 - 30 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: @ $ ! % * ? - _ &'
      )
    }),
  username: Joi.string()
    .min(5)
    .max(20)
    .regex(/^[a-zA-Z0-9_.-]*$/)
    .error(() => {
      return new BadRequest(
        'Username must be 5 - 20 characters long and may only contain letters, numbers and the following special characters: _ . -'
      )
    }),
  isBlocked: Joi.number()
    .required()
    .min(0)
    .max(1)
    .error(() => {
      return new BadRequest('isBlocked is required and the only allowed value')
    })
}

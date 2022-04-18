import Joi from 'joi'

import { BadRequest } from '../errors/BadRequest'

export const newCommunitySchema = {
  title: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_.-]*$/)
    .error(() => {
      return new BadRequest(
        'Title must be 3-20 characters long and only contain alphanumeric characters'
      )
    }),
  description: Joi.string()
    .alphanum()
    .min(5)
    .max(50)
    .regex(/^[a-zA-Z0-9_.-]*$/)
    .error(() => {
      return new BadRequest(
        'Description must be 5-30 characters long and may only contain letters, numbers and the following special characters: _ . -'
      )
    }),
  userId: Joi.string()
    .alphanum()
    .min(10)
    .max(30)
    .error(() => {
      return new BadRequest('User ID must be provided')
    })
}
export default newCommunitySchema

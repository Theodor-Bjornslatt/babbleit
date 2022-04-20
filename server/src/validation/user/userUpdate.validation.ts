import Joi from 'joi'

import { ValidUser } from './User.validation'

const userUpdateSchema = Joi.object({
  email: ValidUser.email.optional(),
  password: ValidUser.password.optional(),
  username: ValidUser.username.optional()
})

export default userUpdateSchema

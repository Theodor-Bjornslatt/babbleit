import Joi from 'joi'

import { ValidUser } from './User.validation'

const newUserSchema = Joi.object({
  email: ValidUser.email.required(),
  password: ValidUser.password.required(),
  username: ValidUser.username.required()
})

export default newUserSchema

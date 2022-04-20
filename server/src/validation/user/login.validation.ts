import Joi from 'joi'

import { ValidUser } from './User.validation'

const loginSchema = Joi.object({
  email: ValidUser.email.required(),
  password: ValidUser.password.required()
})

export default loginSchema

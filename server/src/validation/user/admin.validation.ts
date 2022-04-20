import Joi from 'joi'

import { ValidUser } from './User.validation'

const blockUserSchema = Joi.object({
  isBlocked: ValidUser.isBlocked
})

export default blockUserSchema

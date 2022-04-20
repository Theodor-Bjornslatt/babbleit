import Joi from 'joi'

import { communitySchema } from './Community.validation'

const createCommunitySchema = Joi.object({
  title: communitySchema.title.required(),
  description: communitySchema.description.required()
})

export default createCommunitySchema

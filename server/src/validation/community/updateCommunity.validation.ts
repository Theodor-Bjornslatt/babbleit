import Joi from 'joi'

import { communitySchema } from './Community.validation'

const updateCommunitySchema = Joi.object({
  title: communitySchema.title.optional(),
  description: communitySchema.description.optional()
})

export default updateCommunitySchema

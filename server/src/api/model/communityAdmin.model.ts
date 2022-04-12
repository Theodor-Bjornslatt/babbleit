import { Schema, model } from 'mongoose'

import { CommunityAdminDocument } from '../../types'

//Used as a sub doc.
const roleSchema = new Schema({
  communityId: {
    type: Schema.Types.ObjectId,
    ref: 'community',
<<<<<<< HEAD
    required: [true, 'Community id must be provided']
=======
    required: [true, 'community id must be provided']
>>>>>>> 39add3c (added admin and member schemas)
  },
  role: {
    type: String,
    required: [true, 'Role must be provided']
  }
})

const communityAdminSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User id must be provided']
  },
  roles: {
    type: [roleSchema]
  }
})

const CommunityAdminModel = model<CommunityAdminDocument>(
  'communityAdmin',
  communityAdminSchema
)

export default CommunityAdminModel

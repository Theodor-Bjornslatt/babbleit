import { Schema, model } from 'mongoose'

import { UserCommunityDocument } from '../../types'

const userCommunitySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User id must be provided']
  },
  communities: [
    {
      communityId: {
        type: Schema.Types.ObjectId,
        ref: 'community',
        required: [true, 'CommunityId must be provided']
      },
      communityTitle: {
        type: String,
        required: [true, 'CommunityTitle must be provided']
      }
    }
  ]
})

const UserCommunityModel = model<UserCommunityDocument>(
  'userCommunity',
  userCommunitySchema
)

export default UserCommunityModel

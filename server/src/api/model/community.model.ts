import { Schema, model } from 'mongoose'

import { CommunityDocument } from '../../types'

const communitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title must be provided'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Description must be provided']
    },
    isBlocked: {
      type: Number,
      default: 0
    },
    members: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'user',
          required: [true, 'User id must be provided'],
          unique: true
        },
        username: {
          type: String,
          required: [true, 'Username must be provided'],
          unique: true
        }
      }
    ]
  },
  { timestamps: true }
)

const CommunityModel = model<CommunityDocument>('community', communitySchema)

export default CommunityModel

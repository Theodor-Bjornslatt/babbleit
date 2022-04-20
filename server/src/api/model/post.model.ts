import { Schema, model } from 'mongoose'

import { PostDocument } from '../../types'

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User id must be provided']
  },
  username: {
    type: String,
    required: [true, 'Username must be provided']
  },
  communityId: {
    type: Schema.Types.ObjectId,
    ref: 'community',
    required: [true, 'Community id must be provided']
  },
  title: {
    type: String,
    required: [true, 'Title must be provided']
  },
  content: {
    type: String
  },
  isBlocked: {
    type: Number,
    default: 0
  }
})

const PostModel = model<PostDocument>('post', postSchema)

export default PostModel

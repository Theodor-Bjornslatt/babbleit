import { Document } from 'mongoose'

import { Community, User } from '.'

export type UserCommunity = {
  userId: User['_id']
  communities: {
    communityId: Community['_id']
    communityTitle: string
  }[]
}

export type UserCommunityDocument = {
  _doc: UserCommunity
} & Document

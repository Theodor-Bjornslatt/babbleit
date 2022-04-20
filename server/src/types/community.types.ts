import { Document } from 'mongoose'

import { Id, IsBlocked, MongoId, User } from '.'

export type CommunityRegistration = {
  title: string
  description: string
}

export type CommunityMember = {
  userId: User['_id']
  username: User['username']
}

export type Community = {
  __v: number
  members: CommunityMember[]
} & CommunityRegistration &
  IsBlocked &
  MongoId

export type CommunityDocument = {
  _doc: Community
} & Document

export type CommunityData = Id & CommunityRegistration

export type CommunitySelect = MongoId & CommunityRegistration

export type JoinedMember = {
  userId: User['_id']
  username: User['username']
} & IsBlocked &
  MongoId

export type MemberResponse = {
  isBlocked: boolean
} & Id &
  Pick<User, 'username'>

export type CommunityAggregate = {
  members: MemberResponse[]
} & CommunityRegistration &
  Id

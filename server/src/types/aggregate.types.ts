import { Types } from 'mongoose'

export type IsBlocked = { isBlocked: number }

export type MongoId = { _id: Types.ObjectId }

export type Id = { id: string }

export type AdminRoles = {
  admin: 'admin'
  moderator: 'moderator'
}

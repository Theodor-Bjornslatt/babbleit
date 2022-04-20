import { MongoId, User } from '.'

export type Admin = {
  userId: User['_id']
  __v: number
} & MongoId

export type AdminDocument = {
  _doc: Admin
} & Document

import { MongoId, IsBlocked, Id } from '.'

export type UserLogin = {
  email: string
  password: string
}

export type UserRegistration = {
  username: string
} & UserLogin

export type User = {
  __v: number
  createdAt: string
  updatedAt: string
} & UserRegistration &
  MongoId &
  IsBlocked

export type UserDocument = {
  _doc: User
  comparePassword: (password: string) => boolean
} & Document

export type UserData = {
  email: User['email']
  username: User['username']
  isAdmin: boolean
} & Id

export type UserResponse = {
  user: UserData
}

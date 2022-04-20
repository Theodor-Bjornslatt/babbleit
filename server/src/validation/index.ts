import { registration, login, userUpdate, blockUser } from './user'
import { communityUpdate, createCommunity } from './community'

export const JoiValidators = {
  registration,
  login,
  communityUpdate,
  createCommunity,
  userUpdate,
  blockUser
}

export type JoiValidation = keyof typeof JoiValidators

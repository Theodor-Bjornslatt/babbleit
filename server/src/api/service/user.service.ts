import { Types } from 'mongoose'

import { NotFound } from '../../errors'
import { UpdateableUserFields, UserData, PublicUserFields } from '../../types'
import { hashPassword } from '../../utility'
import { AdminModel, UserModel } from '../model'

const findUserById = async (
  userId: string
): Promise<UserData & { isBlocked: boolean }> => {
  const user = await UserModel.findById(new Types.ObjectId(userId))

  if (!user) {
    throw new NotFound('User not found')
  }

  const { _id, email, username, isBlocked } = user._doc

  const admin = await AdminModel.exists({
    userId: _id
  })

  return {
    id: _id.toString(),
    email,
    username,
    isAdmin: !!admin,
    isBlocked: !!isBlocked
  }
}

const updateFields = async (
  _id: string,
  fieldsToUpdate: UpdateableUserFields
): Promise<boolean> => {
  const { password } = fieldsToUpdate
  let update = { ...fieldsToUpdate }

  if (password) {
    const hashedPassword = await hashPassword(password)
    update = { ...fieldsToUpdate, password: hashedPassword }
  }

  const user = await UserModel.findOneAndUpdate({ _id, isBlocked: 0 }, update, {
    new: true
  })

  if (!user) {
    throw new Error('Something went wrong')
  }

  return true
}

/* 
TODO  - when all services has a delete funtion: 
When we remove the user, we should also remove the communities they are admin of, and remove them from the collection (userCommunities) that should save their memberships, as well as remove their memberships from the community itself
*/
const deleteUserById = async (userId: string): Promise<string> => {
  const user = await UserModel.findByIdAndRemove(userId)

  if (!user) {
    throw new NotFound('User does not exist')
  }

  return user._doc.email
}

const findUsers = async (
  showBlockedUsers = false
): Promise<PublicUserFields[]> => {
  const users = await UserModel.find(showBlockedUsers ? {} : { isBlocked: 0 })
    .select('_id isBlocked username')
    .limit(10)
    .skip(0)

  return users.map((user) => {
    const { _id, username, isBlocked } = user._doc
    return {
      id: _id.toString(),
      username,
      isBlocked
    }
  })
}

const UserService = {
  findUserById,
  updateFields,
  deleteUserById,
  findUsers
}

export default UserService

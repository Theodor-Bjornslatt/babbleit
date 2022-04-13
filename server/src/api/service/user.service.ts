import { Types } from 'mongoose'

import { NotFound } from '../../errors'
import { UpdateableUserFields, UserData } from '../../types'
import { hashPassword } from '../../utility'
import { AdminModel, UserModel } from '../model'

const findUserById = async (
  userId: string
): Promise<UserData & { isBlocked: boolean }> => {
  const user = await UserModel.findById(new Types.ObjectId(userId))

  if (!user) {
    throw new NotFound('User not found')
  }

  const { _id: id, email, username, isBlocked } = user._doc

  const admin = await AdminModel.exists({
    userId: new Types.ObjectId(id)
  })

  return { id, email, username, isAdmin: !!admin, isBlocked: !!isBlocked }
}

const updateFields = async (
  _id: string,
  fieldsToUpdate: UpdateableUserFields
) => {
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

const deleteUserById = async (userId: string): Promise<string> => {
  const user = await UserModel.findByIdAndRemove(userId)

  if (!user) {
    throw new NotFound('User does not exist')
  }

  return `Deleted account: ${user._doc.email}`
}

const UserService = {
  findUserById,
  updateFields,
  deleteUserById
}

export default UserService

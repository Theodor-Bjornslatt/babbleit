import { UserModel } from '../model'

const blockUserById = async (_id: string, isBlocked: number) => {
  const user = await UserModel.updateOne({ _id }, { isBlocked }, { new: true })

  return !!user
}

const AdminService = {
  blockUserById
}

export default AdminService

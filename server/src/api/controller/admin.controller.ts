import { Request, Response } from 'express'

import { createResponseMessage } from '../../utility'
import { BadRequest } from '../../errors'
import { AdminService } from '../service'

const blockUser = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    throw new Error('Something went terribly wrong')
  }

  const isUserBlocked = await AdminService.blockUserById(
    req.params.userId,
    req.body.isBlocked
  )

  if (!isUserBlocked) {
    throw new BadRequest('User has already been blocked by an admin')
  }

  res.json(createResponseMessage('Action successfully completed'))
}

const AdminController = {
  blockUser
}

export default AdminController

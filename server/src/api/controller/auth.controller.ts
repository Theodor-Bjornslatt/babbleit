import { Request, Response } from 'express'

import { AuthService } from '../service'
import destroySession from '../../utility/destroySession'
import { createResponseMessage } from '../../utility/responseMessage'

const apiLoginUser = async (req: Request, res: Response) => {
  const user = await AuthService.loginUser(req.body)
  req.session.userId = user.id
  req.session.isAdmin = user.isAdmin
  res.json({ user })
}

const apiRegisterUser = async (req: Request, res: Response) => {
  const user = await AuthService.registerNewUser(req.body)
  req.session.userId = user.id
  req.session.isAdmin = user.isAdmin
  res.json({ user })
}

const apiLogoutUser = async (req: Request, res: Response) => {
  if (!req.session) return
  await destroySession(req, res)
  res.json(createResponseMessage('Successfully logged out'))
}

const authController = {
  apiRegisterUser,
  apiLoginUser,
  apiLogoutUser
}

export default authController

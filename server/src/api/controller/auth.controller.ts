import { Request, Response } from 'express'

import { AuthService } from '../service'

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

const authController = {
  apiRegisterUser,
  apiLoginUser
}

export default authController

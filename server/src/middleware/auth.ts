import { NextFunction, Request, Response } from 'express'

import { UserModel } from '../api/model'
import { Unauthorized } from '../errors'

export function allowOnlyGuests(req: Request, _: Response, next: NextFunction) {
  if (req.session.userId) {
    next(new Unauthorized('Only guests allowed'))
  }

  next()
}

export async function allowOnlyRegisteredUsers(
  req: Request,
  _: Response,
  next: NextFunction
) {
  if (!req.session.userId) {
    next(new Unauthorized('You need to be a registered user'))
  }

  const user = await UserModel.findById(req.session.userId)

  if (!user || user._doc.isBlocked) {
    next(
      new Unauthorized('You have been blocked from this page. Shame on you.')
    )
  }

  next()
}

export function allowOnlyAdmin(req: Request, _: Response, next: NextFunction) {
  if (!req.session.isAdmin) {
    next(new Unauthorized('You need to be admin'))
  }
  next()
}

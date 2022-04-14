import { Request, Response } from 'express'

import { SESSION_NAME } from '../configuration'

export default async function destroySession(
  req: Request,
  res: Response
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    req.session.destroy((error) => {
      if (error) reject(error)
      res.clearCookie(SESSION_NAME)
      resolve()
    })
  })
}

import express, { Request, Response, Express, NextFunction } from 'express'
import session, { Store } from 'express-session'

import {
  authRoutes,
  communityRoutes,
  userRoutes,
  adminRoutes
} from './api/routes'
import { SESSION_OPTIONS } from './configuration'

export function createApp(store: Store): Express {
  const app = express()
  app.disable('x-powered-by')

  app.use(express.json())
  app.use(session({ ...SESSION_OPTIONS, store }))

  app.use('/api', authRoutes)
  app.use('api/admins', adminRoutes)
  app.use('/communities', communityRoutes)
  app.use('/users', userRoutes)

  app.use((_: Request, res: Response) => {
    res.status(404).json({ error: 'Not found' })
  })

  app.use(
    (
      error: Error & { status: number },
      _: Request,
      res: Response,
      next: NextFunction
    ) => {
      console.error(error)
      res
        .status(error.status || 500)
        .json({ error: error.status ? error.message : 'Something went wrong' })
    }
  )

  return app
}

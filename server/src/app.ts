import express, { Request, Response, Express, NextFunction } from 'express'
import session, { Store } from 'express-session'

import { authRoutes, communityRoutes } from './api/routes'
import { SESSION_OPTIONS } from './configuration'

export function createApp(store: Store): Express {
  const app = express()

  app.use(express.json())
  app.use(session({ ...SESSION_OPTIONS, store }))

  app.use('/api', authRoutes)
  app.use('/communities', communityRoutes)

  app.use((_: Request, res: Response) => {
    res.status(404).json({ error: 'not found' })
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

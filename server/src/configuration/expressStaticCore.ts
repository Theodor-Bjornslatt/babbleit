import { Role } from '../types'

declare module 'express-serve-static-core' {
  interface Request {
    communityAdminRole?: Role['role']
  }
}

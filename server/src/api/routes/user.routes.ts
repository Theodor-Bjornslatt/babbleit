import { Router } from 'express'

import {
  catchAsync,
  validateRequest,
  allowOnlyRegisteredUsers
} from '../../middleware'
import { UserController } from '../controller'

const router = Router()

router
  .route('/me')
  .get(allowOnlyRegisteredUsers, catchAsync(UserController.getWhoAmI))
  .put(
    allowOnlyRegisteredUsers,
    validateRequest('userUpdate'),
    catchAsync(UserController.updateFields)
  )

export default router

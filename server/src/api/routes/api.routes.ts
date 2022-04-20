import { Router } from 'express'

import {
  allowOnlyGuests,
  allowOnlyRegisteredUsers,
  catchAsync,
  validateRequest
} from '../../middleware'
import { AuthController } from '../controller'

const router = Router()

router
  .route('/register')
  .post(
    allowOnlyGuests,
    validateRequest('registration'),
    catchAsync(AuthController.apiRegisterUser)
  )

router
  .route('/login')
  .post(
    allowOnlyGuests,
    validateRequest('login'),
    catchAsync(AuthController.apiLoginUser)
  )

router
  .route('/logout')
  .delete(allowOnlyRegisteredUsers, catchAsync(AuthController.apiLogoutUser))

export default router

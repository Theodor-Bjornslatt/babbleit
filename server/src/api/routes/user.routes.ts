import { Router } from 'express'

import {
  catchAsync,
  validateRequest,
  allowOnlyRegisteredUsers,
  allowOnlyAdmin,
  validateParamsId
} from '../../middleware'
import { UserController } from '../controller'

const router = Router()

router.route('/').get(catchAsync(UserController.getUsers))

router
  .route('/me')
  .get(catchAsync(UserController.getWhoAmI))
  .put(
    allowOnlyRegisteredUsers,
    validateRequest('userUpdate'),
    catchAsync(UserController.updateFields)
  )
  .delete(
    allowOnlyRegisteredUsers,
    catchAsync(UserController.deleteMyAccountAndAllMyCommunities)
  )

router
  .route('/:userId')
  .all(validateParamsId)
  .put(
    allowOnlyAdmin,
    validateRequest('updateBlocked'),
    catchAsync(UserController.updateBlockedStatus)
  )
  .delete(
    allowOnlyAdmin,
    catchAsync(UserController.deleteUserAccountWithCommunities)
  )

export default router

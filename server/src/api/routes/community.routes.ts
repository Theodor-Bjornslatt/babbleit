import { Router } from 'express'

import { CommunityController } from '../controller'
import {
  validateRequest,
  catchAsync,
  addCommunityAdminRole,
  allowOnlyRegisteredUsers,
  allowOnlyCommunityAdminsAndAdmins
} from '../../middleware'

const router = Router()

router
  .route('/')
  .get(catchAsync(CommunityController.getCommunities))
  .post(
    allowOnlyRegisteredUsers,
    validateRequest('createCommunity'),
    catchAsync(CommunityController.createCommunity)
  )

router
  .route('/:id')
  .get(addCommunityAdminRole, catchAsync(CommunityController.getCommunity))
  .delete(
    addCommunityAdminRole,
    allowOnlyCommunityAdminsAndAdmins,
    catchAsync(CommunityController.deleteCommunity)
  )

export default router

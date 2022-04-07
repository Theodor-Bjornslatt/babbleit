import { Router } from 'express'

import { catchAsync } from '../../middleware'
import { ExampleController } from '../controller'

const router = Router()

router.route('/hello').get(catchAsync(ExampleController.apiGetHello))

export default router

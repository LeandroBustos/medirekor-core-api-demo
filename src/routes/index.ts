import { checkUserAccess, getUserDataFromAccessToken } from './../middlewares/user';
import { Router } from 'express';

import signupRoutes from './signup'
import loginRoutes from './login'
import adminRoutes from './admin'
import encountersRoutes from './encounters'
import patientsRoutes from './patients'

import { UserTypes } from '../constants/user';

const router = Router()

router.use('/signup', signupRoutes)
router.use('/login', loginRoutes)
router.use('/encounters' ,encountersRoutes)
router.use('/patient', patientsRoutes)

router.use(getUserDataFromAccessToken)
router.use(checkUserAccess(UserTypes.SYSADMIN), adminRoutes)

export default router
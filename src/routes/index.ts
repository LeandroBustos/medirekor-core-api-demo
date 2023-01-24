import { Router } from 'express';

import signupRoutes from './signup/index'

const router = Router()

router.use('/signup', signupRoutes)

export default router
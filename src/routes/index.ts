import { Router } from 'express';

import signupRoutes from './signup'
import loginRoutes from './login'

const router = Router()

router.use('/signup', signupRoutes)
router.use('/login', loginRoutes)

export default router
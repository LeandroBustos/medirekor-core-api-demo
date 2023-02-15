import { Router } from 'express';

import userRoutes from './user'
import settingsRoutes from './settings'

const router: Router = Router();

router.use('/admin/user', userRoutes)
router.use('/admin/settings', settingsRoutes)

export default router
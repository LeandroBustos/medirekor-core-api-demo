import { Router, Request, Response } from 'express';

import userRoutes from './user'

const router: Router = Router();

router.use('/admin/user', userRoutes)

export default router
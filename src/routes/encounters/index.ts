import { Router, Request, Response } from "express";
import encountersDummy from '../../dummies/encounters'

const router: Router = Router();

router.get('/:id', async (req: Request, res: Response) => {
    return res.status(200).send(encountersDummy[req.params.id])
})

export default router
import { Router, Request, Response } from "express";
import patientsDummy from "../../dummies/patients"

const router: Router = Router();

router.get('/:id', async (req: Request, res: Response) => {
    console.log(req.params.id, patientsDummy[req.params.id])
    return res.status(200).send(patientsDummy[req.params.id])
})

export default router
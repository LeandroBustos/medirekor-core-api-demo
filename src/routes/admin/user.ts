import { serializeUserProvisionalCreation } from './../../serializers/user';
import { Router, Request, Response } from 'express';

import { createUser, deleteUser, modifyUser } from './../../interactors/user';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    const userProvisional = serializeUserProvisionalCreation(req.body)

    try {
        await createUser(userProvisional)
        return res.status(201).send()
    } catch(err){
        return res.status(500).send({
            message: 'An error occurred when creating user',
            code: 'CREATE_USER_ERROR'
        })
        //TODO ESTABLECER ARQUITECTURA DE ERRORES PARA INTERACTORS, LOS REPOSITORIES SIEMPRE PASAN EL ERROR DE UNA
        // return parseResponseError(res, <ErrorStatusCode>err)
    }
})
router.put('/:id', async (req: Request, res: Response) => {
    try {
        await modifyUser(req.params.id, req.body)
        return res.status(200).send()
    } catch(err) {
        console.log(err)
        return res.status(500).send({
            message: 'An error occurred when updating user',
            code: 'UPDATE_USER_ERROR'
        })
    }
})
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await deleteUser(req.params.id)
        return res.status(200).send()
    } catch(err) {
        return res.status(500).send({
            message: 'An error occurred when creating user',
            code: 'DELETE_USER_ERROR'
        }) 
    }
})

export default router
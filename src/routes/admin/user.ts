import { serializeUserProvisionalCreation } from './../../serializers/user';
import { Router, Request, Response } from 'express';

import { createUser, deleteUser, modifyUser } from './../../interactors/user';
import { parseResponseError } from '../../parsers/response';
import { RoutesErrors } from '../../constants/codes';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    const userProvisional = serializeUserProvisionalCreation(req.body)

    try {
        await createUser(userProvisional)
        return res.status(201).send()
    } catch(err){
        return parseResponseError(res, err, RoutesErrors.CREATE_USER_ERROR, {msg: 'An error occurred when creating user'})
    }
})
router.put('/:id', async (req: Request, res: Response) => {
    try {
        await modifyUser(req.params.id, req.body)
        return res.status(200).send()
    } catch(err) {
        return parseResponseError(res, err, RoutesErrors.UPDATE_USER_ERROR, {msg: 'An error occurred when updating user'})
    }
})
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await deleteUser(req.params.id)
        return res.status(200).send()
    } catch(err) {
        return parseResponseError(res, err, RoutesErrors.DELETE_USER_ERROR, {msg: 'An error occurred when deleting user'})
    }
})

export default router
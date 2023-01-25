import { Router, Request, Response } from 'express';

//INTERFACES
import { PasswordSignup } from '../../interfaces/password';
import { User } from '../../interfaces/user';

//INTERACTORS
import { getUserProvisional, activateUserProvisional } from '../../interactors/user';

const router: Router = Router();

router.post('/password', async (req: Request, res: Response) => {
    const password: PasswordSignup = {
        provisional: req.body.provisional_password,
        new: req.body.new_password,
        newRepeated: req.body.new_password_repeated
    }

    let userProvisional:User | null = null 
    try{
        userProvisional = await getUserProvisional(password.provisional)
    } catch(err){
        return res.status(404).send({
            message: 'An error occured when retrieving the user',
            code: 'USER_NOT_FOUND'
        })
    }


    try {
        await activateUserProvisional(userProvisional.id, password)
    } catch(err){
        return res.status(500).send({
            message: 'An error occurred when activating user',
            code: 'ACTIVATE_USER_ERROR'
        })
    }

    //TODO DEFINIR QUE ENVIAR COMO RESPUESTA, ALGO NADA?
    return res.status(200).send('User activated');
})

export default router
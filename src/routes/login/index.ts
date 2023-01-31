import { mapUserAccessToken } from './../../mappers/user';
import { createAccessToken } from './../../utils/accessToken';
import { parseResponseError } from './../../parsers/response';
import { getUserByEmail } from './../../interactors/user';
import { Router, Request, Response } from 'express';

//INTERFACES
import { User, UserLogin } from '../../interfaces/user';
import { preventComparedPasswordsNotEquals } from '../../guards/password';
import { ErrorStatusCode } from '../../interfaces/error';

const router: Router = Router();
router.post('/', async (req: Request, res: Response) => {
    const userLogin: UserLogin = {
        user: req.body.user,
        password: req.body.password
    }

    //TODO
    //CUANDO HAYA THROW DE ERRORES, DEVOLVERLOS EN UN RES.SEND, SINO LA APP ROMPE
    let user: User | null = null
    try {
        user = await getUserByEmail(userLogin.user)
    } catch(err){
        return parseResponseError(res, <ErrorStatusCode>err)
    }

    try {
        await preventComparedPasswordsNotEquals(user.password, userLogin.password)
    } catch(err){
        return parseResponseError(res, <ErrorStatusCode>err)
    }
    
    const accessToken = await createAccessToken(mapUserAccessToken(user))
    return res.status(200).send({access_token: accessToken});
})

export default router
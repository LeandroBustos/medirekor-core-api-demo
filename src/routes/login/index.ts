import { mapUserAccessToken } from './../../mappers/user';
import { createAccessToken } from './../../utils/accessToken';
import { parseResponseError } from './../../parsers/response';
import { getUserByEmail } from './../../interactors/user';
import { Router, Request, Response } from 'express';

//INTERFACES
import { User, UserLogin } from '../../interfaces/user';
import { preventComparedPasswordsNotEquals } from '../../guards/password';
import { RoutesErrors } from '../../constants/codes';

const router: Router = Router();
router.post('/', async (req: Request, res: Response) => {
    const userLogin: UserLogin = {
        user: req.body.user,
        password: req.body.password
    }

    let user: User | null = null
    try {
        user = await getUserByEmail(userLogin.user)
    } catch(err){
        return parseResponseError(res, err, RoutesErrors.LOGIN_ERROR, {msg: 'An error occurred when getting user'})
    }

    try {
        await preventComparedPasswordsNotEquals(user.password, userLogin.password)
    } catch(err){
        return parseResponseError(res, err, RoutesErrors.LOGIN_ERROR, {msg: 'An error occurred with email and/or password'})
    }
    
    const accessToken = await createAccessToken(mapUserAccessToken(user))
    return res.status(200).send({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        access_token: accessToken
    });
})

export default router
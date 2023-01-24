import { Router, Request, Response, NextFunction } from 'express';

//INTERFACES
import { UserLogin } from '../../interfaces/user';

const router: Router = Router();

router.use('/login', (req: Request, res: Response, next: NextFunction) => {
    next();
});

router.post('/', (req: Request, res: Response) => {
    const userLogin: UserLogin = {
        user: req.body.user,
        password: req.body.password
    }

    //TODO
    //CHECKEAR QUE EXISTA EL USUARIO CON EL DATO USUARIO EN EL CAMPO MAIL Y QUE ESTE ACTIVO
    //CHECKEAR QUE EL PASSWORD SEA EL MISMO QUE EL PASSWORD CODIFICADO
    //PERMITIR LOGIN
    //DEVOLVER ALGUN JWT CON EXPIRACION? COOKIES?

    return res.status(200).send(userLogin);
})

export default router
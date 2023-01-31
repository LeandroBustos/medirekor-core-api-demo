import { config } from './../core/config';
import { UserAccesToken } from './../interfaces/user';
import { sign } from 'jsonwebtoken'


//TODO DEFINIR UNA SECRETPASSWORD QUE NO ESTE HARDCODED PARA JWT QUE 
export const createAccessToken = async (user: UserAccesToken):Promise<string> => {
    return sign(user, config.jwt.secret, {algorithm: 'HS256'});
}
import { config } from './../core/config';
import { UserAccesToken } from './../interfaces/user';
import { JwtPayload, sign, verify } from 'jsonwebtoken'

export const createAccessToken = async (user: UserAccesToken):Promise<string> => {
    return sign(user, config.jwt.secret, {algorithm: 'HS256'});
}

export const decodeAccessToken = async (accessToken: string):Promise<UserAccesToken> => {
    const decoded = await verify(accessToken, config.jwt.secret) as JwtPayload
    delete decoded.iat
    return decoded as UserAccesToken
}
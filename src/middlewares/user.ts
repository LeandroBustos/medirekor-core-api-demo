import { Request, Response, NextFunction } from "express";
import { UsertTypes } from "../constants/user";
import { isUserSameType } from "../interactors/user";
import { RequestAccessToken } from '../interfaces/express/request';

import { decodeAccessToken } from '../utils/accessToken';

export const getUserDataFromAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken: string = <string>req.headers.access_token
    if(!accessToken) {
        console.log('No accessToken provided')
        return res.status(401).send()
    }
    try {
        const decoded = await decodeAccessToken(accessToken);
        (req as RequestAccessToken).current_user = decoded;
        next()
    } catch(err){
        console.log('An error ocurred trying to decode the accessToken', err)
        return res.status(500).send()
    }
}

export const checkUserAccess = (userType: UsertTypes) => async (req: Request, res: Response, next: NextFunction) => {
    const current_user = (req as RequestAccessToken).current_user;
    try{
        if(await isUserSameType(current_user.id, userType)){
            next()
        } else {
            console.log('This user doesnt have access to this feature')
            return res.status(403).send()
        }
    } catch(err){
        return res.status(500).send()
    }
}
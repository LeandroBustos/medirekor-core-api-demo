import { logMessages } from './../constants/strings';
import { passwordsNotEquals } from '../constants/errors';
import { comparePasswords } from '../utils/password';
import { PasswordSignup } from './../interfaces/password';
import logger from '../core/logger';
export const preventPasswordsNotEquals = (password: PasswordSignup): void => {
    if(password.new !== password.newRepeated){
        logger.info(logMessages.PASSWORD_ARE_DIFFERENT_MSG)
        throw passwordsNotEquals
    }
}

export const preventComparedPasswordsNotEquals = async (password:string, passwordLogin: string):Promise<void> => {
    try{
        const isSamePassword = await comparePasswords(passwordLogin, password)
        if(!isSamePassword){
            logger.error(logMessages.PASSWORD_ARE_DIFFERENT_MSG)
            throw passwordsNotEquals
        }
    } catch(err){
        logger.error(logMessages.ERROR_COMPARING_PASSWORDS_MSG)
        throw err
    }
}

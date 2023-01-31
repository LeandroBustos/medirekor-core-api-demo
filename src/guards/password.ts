import { passwordsNotEquals } from '../constants/errors';
import { comparePasswords } from '../utils/password';
import { PasswordSignup } from './../interfaces/password';
export const preventPasswordsNotEquals = (password: PasswordSignup): void => {
    if(password.new !== password.newRepeated){
        console.log('Passwords are different')
        throw passwordsNotEquals
    }
}

export const preventComparedPasswordsNotEquals = async (password:string, passwordLogin: string):Promise<void> => {
    try{
        const isSamePassword = await comparePasswords(passwordLogin, password)
        if(!isSamePassword){
            console.log('Passwords are different')
            throw passwordsNotEquals
        }
    } catch(err){
        console.log('An error ocurred when comparing passwords')
        throw err
    }
}

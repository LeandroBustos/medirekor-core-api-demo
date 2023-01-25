import { PasswordSignup } from './../interfaces/password';
export const preventPasswordsNotEquals = (password: PasswordSignup): void => {
    if(password.new !== password.newRepeated){
        console.log('Passwords are different')
        throw new Error('Passwords are different')
    }
}


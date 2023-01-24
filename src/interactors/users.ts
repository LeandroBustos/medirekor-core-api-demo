import { hashPassword } from './../utils/hashPassword';
import { PasswordSignup } from './../interfaces/password';
import { getUserByPaswordProvisional, updateUserProvisional } from './../repositories/users';
import { User } from '../interfaces/user'
import { UserState } from '../constants/user';

export const getUserProvisional = async (passwordProvisional: string):Promise<User> => {
    let usersProvisional: User[] = []
    try{
        usersProvisional = await getUserByPaswordProvisional(passwordProvisional)
        console.log(usersProvisional)
    } catch(err){
        console.log("An error ocurred retrieving the user with provisional password", err)
    }

    if(!usersProvisional.length){
        throw new Error("User not found")
    }
    if(usersProvisional.length > 1) {
        throw new Error("User is duplicate")
    }

    const userProvisional = usersProvisional[0]

    if(userProvisional.state !== UserState.PENDING){
        throw new Error("User is already activated")
    }

    return userProvisional
}

export const activateUserProvisional = async (userId: number, passwordSignup: PasswordSignup):Promise<void> => {
    if(passwordSignup.new !== passwordSignup.newRepeated){
        console.log('Passwords are different')
        throw new Error('Passwords are different')
    }

    let passwordHashed: string = ''
    try{
        passwordHashed = await hashPassword(passwordSignup.new)
    } catch(err){
        console.log('An error ocurred when hasing the password')
        throw err
    }

    try {
        await updateUserProvisional(userId, passwordHashed, UserState.ACTIVATED)
    } catch(err){
        console.log('An error ocurred when updating user provisional', err)
        throw err
    }
}
import { preventPasswordsNotEquals } from './../guards/password';
import { preventUserNotFound, preventUserDuplicated, preventUserIsNotPending, preventUserIsNotActivated } from './../guards/user';
import { hashPassword } from '../utils/password';
import { PasswordSignup } from '../interfaces/password';
import { getUserByPaswordProvisional, getUsersByEmail, updateUserProvisional } from '../repositories/user';
import { User } from '../interfaces/user'
import { UserState } from '../constants/user';

export const getUserProvisional = async (passwordProvisional: string):Promise<User> => {
    let usersProvisional: User[] = []
    try{
        usersProvisional = await getUserByPaswordProvisional(passwordProvisional)
    } catch(err){
        console.log("An error ocurred retrieving the user with provisional password", err)
        throw new Error("An error ocurred retrieving the user with provisional password")
    }

    preventUserNotFound(usersProvisional)
    preventUserDuplicated(usersProvisional)

    const userProvisional = usersProvisional[0]
    preventUserIsNotPending(userProvisional)

    return userProvisional
}

export const getUserByEmail = async (email: string):Promise<User> => {
    let users: User[] = [] 
    try {
        users = await getUsersByEmail(email)
    } catch(err){
        console.log('An error ocurred when getting users by email', err)
        throw err
    }


    preventUserNotFound(users)
    preventUserDuplicated(users)
    
    let user: User = users[0]
    preventUserIsNotActivated(user)

    return user
}

export const activateUserProvisional = async (userId: number, passwordSignup: PasswordSignup):Promise<void> => {
    preventPasswordsNotEquals(passwordSignup)

    let passwordHashed: string = ''
    try{
        passwordHashed = await hashPassword(passwordSignup.new)
    } catch(err){
        console.log('An error ocurred when hashing the password')
        throw err
    }

    try {
        await updateUserProvisional(userId, passwordHashed, UserState.ACTIVATED)
    } catch(err){
        console.log('An error ocurred when updating user provisional', err)
        throw err
    }
}
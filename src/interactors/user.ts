import { UserCreationSerialize, UserUpdate } from './../interfaces/user';
import { preventPasswordsNotEquals } from './../guards/password';
import { preventUsersNotFound, preventUserDuplicated, preventUserIsNotPending, preventUserIsNotActivated, preventUserNotFound } from './../guards/user';
import { hashPassword } from '../utils/password';
import { PasswordSignup } from '../interfaces/password';
import { getUserById, getUserByIdAndType, getUserByPaswordProvisional, getUsersByEmail, insertUser, softDeleteUser, updateUser, updateUserProvisional } from '../repositories/user';
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

    preventUsersNotFound(usersProvisional)
    preventUserDuplicated(usersProvisional)

    const userProvisional = usersProvisional[0]
    preventUserIsNotPending(userProvisional)

    return userProvisional
}

export const getUserByEmail = async (email: User['email']):Promise<User> => {
    let users: User[] = [] 
    try {
        users = await getUsersByEmail(email)
    } catch(err){
        console.log('An error ocurred when getting users by email', err)
        throw err
    }


    preventUsersNotFound(users)
    preventUserDuplicated(users)
    
    let user: User = users[0]
    preventUserIsNotActivated(user)

    return user
}

export const isUserSameType = async (userId: User['id'], userType: User['type']): Promise<boolean> => {
    try {
        const user = await getUserByIdAndType(userId, userType)
        return !!user
    } catch (err) {
        console.log('An error ocurred when getting user by id and type', err)
        throw err
    }
}

export const activateUserProvisional = async (userId: User['id'], passwordSignup: PasswordSignup):Promise<void> => {
    preventPasswordsNotEquals(passwordSignup)

    let passwordHashed: string = ''
    try{
        passwordHashed = await hashPassword(passwordSignup.new)
    } catch(err){
        console.log('An error ocurred when hashing the password', err)
        throw err
    }

    try {
        await updateUserProvisional(userId, passwordHashed, UserState.ACTIVATED)
    } catch(err){
        console.log('An error ocurred when updating user provisional', err)
        throw err
    }
}

export const modifyUser = async (userId: User['id'], user: UserUpdate):Promise<void> => {
    let users: User[] = []
    try {
        users = await getUserById(userId)
    } catch(err) {
        console.log('An error ocurred when getting users by id', err)
        throw err
    }

    preventUsersNotFound(users)

    try {
        await updateUser(userId, user)
    } catch(err) {
        console.log("An error ocurred when updating user", err)
        throw err
    }
}

export const createUser = async (user: UserCreationSerialize):Promise<void> => {
    let users: User[] = []
    try {
        users = await getUsersByEmail(user.email)
    } catch(err) {
        console.log('An error ocurred when getting users by email', err)
        throw err
    }

    preventUserDuplicated(users)

    try {
        await insertUser(user)
    } catch(err) {
        console.log('An error ocurred when inserting user', err)
        throw err
    }
}

export const deleteUser = async (userId: User['id']):Promise<void> => {
    let users: User[] = []
    try {
        users = await getUserById(userId)
    } catch(err) {
        console.log('An error ocurred when getting users by id', err)
        throw err
    }

    preventUsersNotFound(users)

    try {
        await softDeleteUser(userId)
    } catch(err) {
        console.log('An error ocurred when deleting user', err)
        throw err
    }
}
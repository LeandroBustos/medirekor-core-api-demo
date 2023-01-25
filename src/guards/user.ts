import { UserState } from "../constants/user";
import { User } from "../interfaces/user";

export const preventUserNotFound = (users: User[]): void => {
    if(!users.length) {
        throw new Error("User not found")
    } 
}

export const preventUserDuplicated = (users: User[]): void => {
    if(users.length > 1) {
        throw new Error("User is duplicate")
    }
}

export const preventUserIsNotPending = (user: User): void => {
    if(user.state !== UserState.PENDING){
        throw new Error(`User is not ${UserState.PENDING}`)
    }
}
import { userNotFoundError, userDuplicatedError, userIsNotPendingError, userIsNotActivated } from './../constants/errors';
import { UserState } from "../constants/user";
import { User } from "../interfaces/user";

const isSameState = (userState: UserState, stateToCompare: UserState) => userState === stateToCompare

export const preventUsersNotFound = (users: User[]): void => {
    if(!users.length) {
        throw userNotFoundError
    } 
}

export const preventUserNotFound = (user: User | null): void => {
    if(!user){
        throw userNotFoundError
    }
}

export const preventUserDuplicated = (users: User[]): void => {
    if(users.length > 1) {
        throw userDuplicatedError
    }
}

export const preventUserIsNotPending = (user: User): void => {
    if(!isSameState(user.state, UserState.PENDING)){
        throw userIsNotPendingError
    }
}

export const preventUserIsNotActivated = (user: User): void => {
    if(!isSameState(user.state, UserState.ACTIVATED)){
        throw userIsNotActivated
    }
}
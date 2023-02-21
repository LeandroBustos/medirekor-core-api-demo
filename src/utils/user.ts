import { User } from './../interfaces/user';
import { preventUserNotFound } from './../guards/user';
import { getUserById } from './../repositories/user';

export const getUserByIdOrFail = async (userId: User['id']):Promise<User> => {
    try {
        const user = await getUserById(userId)
        preventUserNotFound(user)
        return <User>user
    } catch(err) {
        console.log('An error ocurred when getting users by id', err)
        throw err
    }
}
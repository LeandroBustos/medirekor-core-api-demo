import logger from './../core/logger';
import { Setting, SettingExtended } from './../interfaces/setting';
import { OrganizationToSetting } from './../interfaces/organization_to_setting';
import { UserCreationSerialize, UserUpdate, UserWithSettingsExtended } from './../interfaces/user';
import { preventPasswordsNotEquals } from './../guards/password';
import { preventUsersNotFound, preventUserDuplicated, preventUserIsNotPending, preventUserIsNotActivated, preventUserNotFound } from './../guards/user';
import { hashPassword } from '../utils/password';
import { PasswordSignup } from '../interfaces/password';
import { getUsersById, getUserByIdAndType, getUserByPaswordProvisional, getUsersByEmail, insertUser, softDeleteUser, updateUser, updateUserProvisional, getUserById, getUsersByOrganizationId } from '../repositories/user';
import { User } from '../interfaces/user'
import { UserState } from '../constants/user';
import { getOrganizationsToSettingsByOrganizationOrUserId, getOrganizationsToSettingsByOrganizationId } from '../repositories/organization_to_setting';
import { preventOrganizationToSettingsNotFound } from '../guards/organization_to_setting';
import { SettingStates } from '../constants/setting';

const getUserSettingsHashMap = (organizationToSettings: OrganizationToSetting[]):Record<User['id'], SettingExtended[]> => {
    let userSettings: Record<User['id'], SettingExtended[]> = {}
    organizationToSettings.forEach((orgToSetting: OrganizationToSetting) => {
        const userSettingId = orgToSetting.user_id || orgToSetting.organization_id
        if(userSettingId){
            const currentUserSettings: SettingExtended[] = userSettings[userSettingId] || []
            const setting = <Setting>orgToSetting.setting
            setting.modified_at = orgToSetting.modified_at
            const settingExtended: SettingExtended = { 
                ...setting, 
                group_type: orgToSetting.type, 
                state: orgToSetting.state
            }
            
            const mapedUserSetting = currentUserSettings.find(currUserSetting => currUserSetting.id === settingExtended.id)
            if(!mapedUserSetting){
                currentUserSettings.push(settingExtended)
            } 
            userSettings[userSettingId] = currentUserSettings
        }
    })

    return userSettings
}

const mapSettingsToUser = (user: User, userSettings: Record<User['id'], SettingExtended[]>):UserWithSettingsExtended => {
    const settingsByUser = userSettings[user.id] || []
    const settingsByOrganization = userSettings[user.organization_id] || []

    const settings = [...settingsByUser, ...settingsByOrganization]
    
    let filteredSettings: SettingExtended[] = []
    settings.forEach(setting => {
        const settingFilteredIndex = filteredSettings.findIndex(filteredSetting => filteredSetting.id === setting.id)
        if(settingFilteredIndex < 0){
            filteredSettings.push(setting)
        } else {
            const settingFiltered = filteredSettings[settingFilteredIndex]
            let settingToReplace = settingFiltered
            if(setting.modified_at || settingFiltered.modified_at){
                settingToReplace = <Date>settingFiltered.modified_at > <Date>setting.modified_at ? settingFiltered : setting
            } else if(setting.state === SettingStates.ACTIVE) {
                settingToReplace = setting
            }
            filteredSettings[settingFilteredIndex] = settingToReplace
        }
    })

    return {
        ...user,
        settings: filteredSettings
    }
}

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

export const getUser = async (userId: User['id']):Promise<User> => {
    try {
        const user = await getUserById(userId)
        preventUserNotFound(user)
        return user as User
    } catch(err) {
        logger.error('An error ocurred when getting user by id', err)
        throw err
    }
}

export const getUsersSettings = async (organizationId: string):Promise<UserWithSettingsExtended[]> => {
    let users: User[] = []
    try {
        users = await getUsersByOrganizationId(organizationId)
    } catch(err) {
        console.log('An error ocurred when getting users by organization id', err)
        throw err
    }

    preventUsersNotFound(users)

    let organizationToSettings: OrganizationToSetting[] = []
    try {
        organizationToSettings = await getOrganizationsToSettingsByOrganizationId(organizationId)
    } catch(err) {
        console.log('An error ocurred when gettin settings by organization id', err)
        throw err
    }

    preventOrganizationToSettingsNotFound(organizationToSettings)
    const userSettings = getUserSettingsHashMap(organizationToSettings)
    const usersWithSettings: UserWithSettingsExtended[] = users.map((user: User) => mapSettingsToUser(user, userSettings))

    return usersWithSettings
}

export const getUserSettings = async (organizationId: string, userId: User['id']):Promise<UserWithSettingsExtended> => {
    let user: User | null = null
    try {
        user = await getUserById(userId)
    } catch(err) {
        console.log('An error ocurred when gettin user by id', err)
        throw err
    }

    preventUserNotFound(user)
    user = <User>user
    
    let organizationToSettings: OrganizationToSetting[] = []
    try {
        organizationToSettings = await getOrganizationsToSettingsByOrganizationOrUserId(organizationId, userId)
    } catch(err) {
        console.log('An error ocurred when getting settings by organization and user id', err)
        throw err
    }

    preventOrganizationToSettingsNotFound(organizationToSettings)
    const userSettings = getUserSettingsHashMap(organizationToSettings)
    return mapSettingsToUser(user, userSettings)

}

export const isUserSameType = async (userId: User['id'], userType: User['type']): Promise<boolean> => {
    try {
        const user = await getUserByIdAndType(userId, userType)
        return !!user
    } catch(err) {
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
        users = await getUsersById(userId)
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
        users = await getUsersById(userId)
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
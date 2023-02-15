import { InsertResult, UpdateResult } from 'typeorm';
import { UserState } from '../constants/user';
import * as userEntities from '../entities/user';
import { User, UserCreationSerialize, UserUpdate } from '../interfaces/user'
import { postgresqlDb } from '../core/database/postgresql';

const userRepository = postgresqlDb.getRepository(userEntities.User)

//TODO EXCLUIR PASSWORD DE TODAS LAS FUNCIONES QUE NO LA UTILICEN
export const getUsersById = async (userId: User['id']):Promise<User[]> => 
    userRepository.find({
        where: {
            id: userId,
        }
    }).catch(err => {
        console.log('database err', err)
        throw err
    })

export const getUserById = async (userId: User['id']):Promise<User | null> => 
    userRepository.findOne({
        where: {
            id: userId,
        }
    }).catch(err => {
        console.log('database err', err)
        throw err
    })

export const getUserByIdAndType = (userId: User['id'], userType: User['type']):Promise<User | null> =>
    userRepository.findOneBy({id: userId, type: userType})

export const getUsersByOrganizationId = (organizationId: User['organization_id']):Promise<User[]> =>
    userRepository.findBy({ organization_id: organizationId })
    .catch(err => {
        console.log('database err', err)
        throw err
    })

export const getUserByPaswordProvisional = async (passwordProvisional: string):Promise<User[]> =>
    userRepository.find({
        where: {
            password: passwordProvisional
        }
    })

export const getUsersByEmail = async (email: User['email']):Promise<User[]> => 
    userRepository.find({
        where: {
            email: email
        }
    }).catch(err => {
        console.log('database err', err)
        throw err
    })

const updateUserBase = async (userId: User['id'], updateParams: Partial<User>) => 
    userRepository.update({ id: userId }, updateParams)

export const updateUserProvisional = async (userId: User['id'], password: User['password'], state: UserState):Promise<UpdateResult> => 
    updateUserBase(userId, { password, state, modified_at: new Date() })

export const updateUser = async (userId: User['id'], userUpdateParams: UserUpdate) => 
    updateUserBase(userId, userUpdateParams)

export const updateUserState = async (userId: User['id'], state: UserState):Promise<UpdateResult> => 
    userRepository.update({ id: userId }, { state })

export const insertUser = async (user: UserCreationSerialize): Promise<InsertResult> =>
    userRepository.insert({ ...user, created_at: new Date() })

export const softDeleteUser = async (userId: User['id']): Promise<UpdateResult> =>
    userRepository.update({id: userId}, { state: UserState.DELETED, deleted_at: new Date() })

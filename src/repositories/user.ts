import { UpdateResult } from 'typeorm';
import { UserState } from '../constants/user';
import * as userEntities from '../entities/user';
import { User } from '../interfaces/user'
import { postgresqlDb } from '../core/database/postgresql';

const userRepository = postgresqlDb.getRepository(userEntities.User)

//TODO
//REEMPLAZAR number POR string YA QUE SERA UN UUID
export const getUserById = async (userId: number) => 
    userRepository.find({
        where: {
            id: userId
        }
    })

export const getUserByPaswordProvisional = async (passwordProvisional: string):Promise<User[]> =>
    userRepository.find({
        where: {
            password: passwordProvisional
        }
    })

    //TODO MODULARIZAR PARA REUTILIZAR FUNCION
export const updateUserProvisional = async (userId: number, password: string, state: UserState):Promise<UpdateResult> => 
    userRepository.update({ id: userId }, { password, state, modified_at: new Date() })

export const updateUserState = async (userId: number, state: UserState):Promise<UpdateResult> => 
    userRepository.update({ id: userId }, { state })


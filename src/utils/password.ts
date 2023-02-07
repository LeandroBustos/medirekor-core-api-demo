import { config } from '../core/config';

import bcrypt from 'bcrypt';
import * as nanoid from 'nanoid'

import { upperCaseAlphanumericEnglish } from './../constants/stringPatterns';

const nanoidCustom = nanoid.customAlphabet(upperCaseAlphanumericEnglish, 6)

export const hashPassword = async (password: string):Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(config.bcrypt.salt_rounds)
        const hash = await bcrypt.hash(password, salt)
        return hash
    } catch(err){
        throw err
    }
}

export const comparePasswords = async (password: string, hashedPassword: string):Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashedPassword) 
    } catch(err){
        throw err
    }
}

export const createPasswordProvisional = ():string => nanoidCustom()
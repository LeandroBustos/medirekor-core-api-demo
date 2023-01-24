import { config } from './../core/config';
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string):Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(config.bcrypt.salt_rounds)
        const hash = await bcrypt.hash(password, salt)
        return hash
    } catch(err){
        throw err
    }
}
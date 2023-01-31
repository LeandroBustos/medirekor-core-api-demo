import { Config } from './config.interface';

export const config: Config = {
    postgres: {
        host: process.env.POSTGRES_NAME || 'localhost',
        port: parseInt(process.env.POSTGRESS_PORT as string) || 32768,
        username: process.env.POSTGRES_USERNAME || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgrespw',
        database: process.env.POSTGRES_DB || 'medsight'
    },
    bcrypt: {
        salt_rounds: parseInt(process.env.SALT_ROUNDS as string) || 12 
    },
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET || 'asdasdsad'
    }
}
interface Postgres {
    host: string,
    port: number,
    username: string,
    password: string,
    database: string
}

interface Bcrypt {
    salt_rounds: number
}

interface Jwt {
    secret: string
}

export interface Config {
    postgres: Postgres
    bcrypt: Bcrypt
    jwt: Jwt
}
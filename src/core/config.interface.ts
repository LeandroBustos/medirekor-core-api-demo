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

export interface Config {
    postgres: Postgres
    bcrypt: Bcrypt
}
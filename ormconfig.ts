import { DataSourceOptions } from 'typeorm/data-source'
import {config} from './src/core/config'

const ormconfig: DataSourceOptions = {
    "type": "postgres",
    "host": config.postgres.host,
    "port": config.postgres.port,
    "username": config.postgres.username,
    "password": config.postgres.password,
    "database": config.postgres.database,
    "synchronize": false,
    // "cache": false,
    "logging": true,
    "entities": [__dirname + "/src/entities/*.{js,ts}"],
    "migrations": ["src/migration/*.ts"],
    "subscribers": ["src/subscriber/*.ts"],
    "extra": {
        "pool":{
            "max": 100,
            "min": 0,
            "evictionRunIntervalMillis": 10000,
            "testOnBorrow": true,
            "testOnReturn": true,
            "testWhileIdle": true
        }
    }
}

export default ormconfig
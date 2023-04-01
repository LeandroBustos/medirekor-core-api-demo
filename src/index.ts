import express, { Express } from 'express';
import "reflect-metadata"
import cors from 'cors'

import {postgresqlDb} from './core/database/postgresql'

import appV1Routes from './routes'

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use('/app/v1', appV1Routes);

postgresqlDb
    .initialize()
    .then(() => {
        console.log('Postgresql Databsae connected succesfuly');
        app.listen(3001, () => {
            console.log('Server running on http://localhost:3000');
        });
    })
    .catch(err => console.log('An error ocurred when connecting to database', err));

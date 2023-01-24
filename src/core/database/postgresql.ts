import { DataSource } from 'typeorm';
import ormconfig from '../../../ormconfig'; 

export const postgresqlDb = new DataSource(ormconfig)

import { postgresqlDb } from '../core/database/postgresql';
import { Setting } from './../interfaces/setting';

import * as settingEntities from '../entities/setting';

const settingRepository = postgresqlDb.getRepository(settingEntities.Setting)

export const getSettingById = async (settingId: Setting['id']):Promise<Setting | null> =>
    settingRepository.findOneBy({ id: settingId })
    .catch(err => {
        console.log('database err', err)
        throw err
    })
import { logMessages } from './../constants/strings';
import { Organization } from './../entities/organization';
import { v4 as uuidv4 } from 'uuid'
import { SettingGroupTypes, SettingStates } from '../constants/setting';
import { User } from '../interfaces/user';
import { Setting } from './../interfaces/setting';
import { insertOrganizationToSettings, getOrganizationToSettingsByAll, updateOrganizationToSetting, softDeleteOrganizationToSetting } from './../repositories/organization_to_setting';
import logger from '../core/logger';

export const addOrganizationToSetting = async (settingId: Setting['id'], organizationId: string, userId: User['id'], type: SettingGroupTypes):Promise<void> => {
    const id: string = uuidv4()
    try {
        await insertOrganizationToSettings({id, setting_id: settingId, organization_id: organizationId, user_id: userId, type})
    } catch(err) {
        logger.error(logMessages.USER_ERROR_WHEN_INSERTING_MSG, err)
        throw err
    }
}

export const isOrganizationToSettingExists = async (settingId: Setting['id'], organizationId: string, userId: User['id'] | null, type: SettingGroupTypes):Promise<boolean> => {
    try {
        const organizationToSettings = await getOrganizationToSettingsByAll(settingId, organizationId, userId, type)
        return !!organizationToSettings
    } catch(err) {
        logger.error(logMessages.ORGANIZATION_TO_SETTINGS_ERROR_WHEN_GETTING_ALL_MSG, err)
        throw err
    }
}

export const updateOrganizationToSettingState = async (settingId: Setting['id'] | null, relation_id: User['id'] | Organization['id'], type: SettingGroupTypes, state: SettingStates):Promise<void> => {
    try {
        await updateOrganizationToSetting(settingId, relation_id, type, state)
    } catch(err) {
        console.log(logMessages.ORGANIZATION_TO_SETTINGS_ERROR_WHEN_UPDATING_MSG, err)
        throw err
    }
}

export const deleteOrganizationToSetting = async (settingId: Setting['id'] | null, relation_id: User['id'] | Organization['id'], type: SettingGroupTypes):Promise<void> => {
    try {
        await softDeleteOrganizationToSetting(settingId, relation_id, type)
    } catch(err) {
        console.log('An error ocurred when deleting organization to setting', err)
        throw err
    }
} 
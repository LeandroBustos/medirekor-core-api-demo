import { Organization } from './../interfaces/organization';
import { SettingGroupTypes, SettingStates } from './../constants/setting';
import { Setting } from './../interfaces/setting';
import { FindOptionsWhere, InsertResult, IsNull, UpdateResult } from 'typeorm';

import { User } from './../interfaces/user';
import { postgresqlDb } from '../core/database/postgresql';
import { OrganizationToSetting } from './../interfaces/organization_to_setting';

import * as organizationToSettingEntities from '../entities/organization_to_setting';

const organizationToSettingRepository = postgresqlDb.getRepository(organizationToSettingEntities.OrganizationsToSettings)

export const getOrganizationsToSettingsByOrganizationId = async (organizationId: string):Promise<OrganizationToSetting[]> => 
    organizationToSettingRepository.find({
        where: {
            organization_id: organizationId,
        },
        relations: ['setting']
    }).catch(err => {
        console.log('database err', err)
        throw err
    })

export const getOrganizationsToSettingsByOrganizationOrUserId = async (organizationId: string, userId: User['id'], ):Promise<OrganizationToSetting[]> => 
    organizationToSettingRepository.find({
        where: [
            { organization_id: organizationId },
            { user_id: userId }
        ],
        relations: ['setting']
    }).catch(err => {
        console.log('database err', err)
        throw err
    })

export const getOrganizationToSettingsByAll = async (settingId: Setting['id'], organizationId: string, userId: User['id'] | null, type: SettingGroupTypes):Promise<OrganizationToSetting | null> => {
    let findOptions: FindOptionsWhere<OrganizationToSetting> = {
        setting_id: settingId, 
        organization_id: organizationId, 
        type
    }
    if(userId){
        findOptions.user_id = userId
    } else {
        findOptions.user_id = IsNull()
    }

    return  organizationToSettingRepository.findOne({
        where: findOptions
    }).catch(err => {
        console.log('database err', err)
        throw err
    })
}

export const getOrganizationToSettingsOnlyOrganizations = async (organizationId: Organization['id']): Promise<OrganizationToSetting[]> =>
    organizationToSettingRepository.find({
        where: {
            organization_id: organizationId,
            user_id: IsNull(),
            type: SettingGroupTypes.ORGANIZATION,
        },
        relations: ['setting']
    }).catch(err => {
        console.log('database err', err)
        throw err
    })

export const insertOrganizationToSettings = async (organizationToSetting: any):Promise<InsertResult> => 
    organizationToSettingRepository.insert({...organizationToSetting, state: SettingStates.ACTIVE})
    .catch(err => {
        console.log('database err', err)
        throw err
    })

export const updateOrganizationToSetting = async (settingId: Setting['id'] | null, relationId: User['id'] | Organization['id'], type: SettingGroupTypes, state: SettingStates):Promise<UpdateResult> => {
    const searchOptions: FindOptionsWhere<OrganizationToSetting> = {
        type
    }

    if(settingId){
        searchOptions.setting_id = settingId
    }
    if(type === SettingGroupTypes.USER){
        searchOptions.user_id = relationId
    } else if(type === SettingGroupTypes.ORGANIZATION){
        searchOptions.organization_id = relationId
    }

    return organizationToSettingRepository.update(searchOptions, { state })
    .catch(err => {
        console.log('database err', err)
        throw err
    })
}

export const softDeleteOrganizationToSetting = async (settingId: Setting['id'] | null, relationId: User['id'] | Organization['id'], type: SettingGroupTypes):Promise<UpdateResult> => {
    const searchOptions: FindOptionsWhere<OrganizationToSetting> = {
        type
    }

    if(settingId){
        searchOptions.setting_id = settingId
    }
    if(type === SettingGroupTypes.USER){
        searchOptions.user_id = relationId
    } else if(type === SettingGroupTypes.ORGANIZATION){
        searchOptions.organization_id = relationId
    }

    return organizationToSettingRepository.update(searchOptions, { deleted_at: new Date() })
    .catch(err => {
        console.log('database err', err)
        throw err
    })
}
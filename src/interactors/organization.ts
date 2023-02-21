import { Setting } from './../entities/setting';
import { OrganizationToSetting } from './../interfaces/organization_to_setting';
import { preventOrganizationNotFound } from '../guards/organization';
import { getOrganizationById } from '../repositories/organization';
import { getOrganizationToSettingsOnlyOrganizations } from '../repositories/organization_to_setting';
import { Organization, OrganizationWithSettings } from './../interfaces/organization';
import { preventOrganizationToSettingsNotFound } from '../guards/organization_to_setting';

export const getOrganizationSettings = async (organizationId: Organization['id']):Promise<OrganizationWithSettings> => {
    let organization: Organization | null = null
    try {
        organization = await getOrganizationById(organizationId)
    } catch(err) {
        console.log("An error ocurred when getting organization by id", err)
        throw err
    }
    preventOrganizationNotFound(organization)

    let organizationToSettings: OrganizationToSetting[] = []
    try {
        organizationToSettings = await getOrganizationToSettingsOnlyOrganizations(organizationId)
    } catch(err) {
        console.log("An error ocurred when getting organization settings by id", err)
        throw err
    }
    preventOrganizationToSettingsNotFound(organizationToSettings)

    const settings: Setting[] = organizationToSettings.map((orgToSetting: OrganizationToSetting) => {
        const setting = <Setting>orgToSetting.setting
        setting.modified_at = orgToSetting.modified_at
        return setting
    })

    return {
        ...organization,
        settings
    }
}
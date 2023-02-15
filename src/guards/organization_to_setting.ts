import { OrganizationToSetting } from './../interfaces/organization_to_setting';
import { organizationToSettingsWrongTypeUser, organizationToSettingsWrongTypeOrganization, organizationSettingsNotFoundError} from '../constants/errors';
import { SettingGroupTypes } from './../constants/setting';
import { User } from './../interfaces/user';
export const preventOrganizationToSettingWrongType = (userId: User['id'] | null, type: SettingGroupTypes):void =>{
    if(!userId && type === SettingGroupTypes.USER){
        throw organizationToSettingsWrongTypeUser
    } else if(userId && type === SettingGroupTypes.ORGANIZATION){
        throw organizationToSettingsWrongTypeOrganization
    }
}

export const preventOrganizationToSettingsNotFound = (orgToSetting: OrganizationToSetting[]):void => {
    if(!orgToSetting.length){
        throw organizationSettingsNotFoundError
    }
}
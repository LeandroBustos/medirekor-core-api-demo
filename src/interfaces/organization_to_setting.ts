import { SettingGroupTypes, SettingStates } from './../constants/setting';
import { User } from './user';
import { Setting } from "../entities/setting";

export interface OrganizationToSetting {
    id: string;
    setting_id: Setting['id'];
    organization_id: string;
    user_id: User['id'] | null;
    type: SettingGroupTypes;
    state: SettingStates;
    created_at: Date;
    modified_at: Date | null;
    deleted_at: Date | null;
    setting?: Setting
}
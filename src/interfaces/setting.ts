import { SettingGroupTypes, SettingStates } from "../constants/setting";
import { UserTypes } from "../constants/user";

export interface Setting {
    id: string;
    name: string;
    description: string;
    type: UserTypes
    created_at: Date;
    modified_at: Date | null;
    deleted_at: Date | null;
}

export interface SettingExtended extends Setting {
    group_type: SettingGroupTypes;
    state: SettingStates;
}
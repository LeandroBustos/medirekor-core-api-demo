import { settingNotFoundError } from './../constants/errors';
import { Setting } from './../interfaces/setting';
export const preventSettingNotFound = (setting: Setting | null):void => {
    if(!setting){
        throw settingNotFoundError
    }
}
import { preventSettingNotFound } from "../guards/setting"
import { Setting } from "../interfaces/setting"
import { getSettingById } from "../repositories/setting"

export const getSettingByIdOrFail = async (settingId: Setting['id']):Promise<Setting> => {
    try {
        const setting = await getSettingById(settingId)
        preventSettingNotFound(setting)
        return <Setting>setting
    } catch(err) {
        throw err
    }
}
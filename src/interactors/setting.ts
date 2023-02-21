import { getUserByIdOrFail } from './../utils/user';
import { getSettingByIdOrFail } from './../utils/setting';

import { Setting } from '../interfaces/setting';
import { UserRankMap } from '../constants/user';
import { User } from '../interfaces/user';

export const isSettingCandidateToUser = async (settingId: Setting['id'], userId: User['id']): Promise<boolean> => {
    const user = await getUserByIdOrFail(userId)
    const setting = await getSettingByIdOrFail(settingId)
    const userRank = UserRankMap[user.type]

    return !!userRank.includes(setting.type)
}
import { Error } from '../interfaces/error';
import { InternalCodes } from './codes';
import { SettingGroupTypes } from './setting';
import { UserState } from './user';

const buildError = (msg: string, internalCode: InternalCodes): Error => {
    return {
        msg,
        internalCode,
    }
}

export const userNotFoundError: Error = buildError('User not found.', InternalCodes.USER_NOT_FOUND)
export const userDuplicatedError: Error = buildError('User is duplicate.', InternalCodes.USER_DUPLICATED)
export const userIsNotPendingError: Error = buildError(`User is not ${UserState.PENDING}`, InternalCodes.USER_IS_NOT_PENDING)
export const userIsNotActivated: Error = buildError(`User is not ${UserState.ACTIVATED}`, InternalCodes.USER_IS_NOT_ACTIVATED)
export const passwordsNotEquals: Error = buildError('Passwords are different.', InternalCodes.PASSWORDS_NOT_EQUALS)
export const settingNotFoundError: Error = buildError('Setting not found', InternalCodes.SETTING_NOT_FOUND)
export const organizationToSettingsWrongTypeUser: Error = buildError(`Type cannot be ${SettingGroupTypes.USER} when user id is null`, InternalCodes.ORGANIZATION_TO_SETTING_WRONG_TYPE)
export const organizationToSettingsWrongTypeOrganization: Error = buildError(`Type cannot be ${SettingGroupTypes.ORGANIZATION} when user id is not null`, InternalCodes.ORGANIZATION_TO_SETTING_WRONG_TYPE)
export const organizationNotFoundError: Error = buildError('Organization not found', InternalCodes.ORGANIZATION_NOT_FOUND)
export const organizationSettingsNotFoundError: Error = buildError('Organization settings not found', InternalCodes.ORGANIZATION_TO_SETTING_NOT_FOUND)
import { ErrorStatusCode } from '../interfaces/error';
import { InternalCodes, StatusCodes } from './codes';
import { UserState } from './user';

const buildError = (msg: string, internalCode: InternalCodes, statusCode: StatusCodes): ErrorStatusCode => {
    return {
        msg,
        internalCode,
        statusCode
    }
}

export const userNotFoundError: ErrorStatusCode = buildError('User not found.', InternalCodes.USER_NOT_FOUND, StatusCodes.NOT_FOUND)
export const userDuplicatedError: ErrorStatusCode = buildError('User is duplicate.', InternalCodes.USER_DUPLICATED, StatusCodes.UNPROCESSABLE_ENTITY)
export const userIsNotPendingError: ErrorStatusCode = buildError(`User is not ${UserState.PENDING}`, InternalCodes.USER_IS_NOT_PENDING, StatusCodes.INTERNAL_SERVER_ERROR)
export const userIsNotActivated: ErrorStatusCode = buildError(`User is not ${UserState.ACTIVATED}`, InternalCodes.USER_IS_NOT_ACTIVATED, StatusCodes.INTERNAL_SERVER_ERROR)
export const passwordsNotEquals: ErrorStatusCode = buildError('Passwords are different.', InternalCodes.PASSWORDS_NOT_EQUALS, StatusCodes.UNAUTHORIZED)

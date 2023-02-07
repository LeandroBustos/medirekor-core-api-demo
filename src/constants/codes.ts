export enum InternalCodes {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_DUPLICATED = 'USER_DUPLICATED',
    USER_IS_NOT_PENDING = 'USER_IS_NOT_PENDING',
    USER_IS_NOT_ACTIVATED = 'USER_IS_NOT_ACTIVATED',
    PASSWORDS_NOT_EQUALS = 'PASSWORDS_NOT_EQUALS'
}

export enum StatusCodes {
    OK = 200,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
}
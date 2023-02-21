//TODO CAMBIAR ACTIVATED -> ACTIVE
export enum UserState {
    ACTIVATED = 'ACTIVATED',
    DELETED = 'DELETED',
    DISABLED = 'DISABLED',
    PENDING = 'PENDING'
}

export enum UserTypes {
    CLINICIAN = 'CLINICIAN',
    SYSADMIN = 'SYSADMIN',
    MANAGER = 'MANAGER'
}

export const UserRankMap = {
    SYSADMIN: [UserTypes.SYSADMIN, UserTypes.MANAGER, UserTypes.CLINICIAN],
    MANAGER: [UserTypes.MANAGER, UserTypes.CLINICIAN],
    CLINICIAN: [UserTypes.CLINICIAN]
}
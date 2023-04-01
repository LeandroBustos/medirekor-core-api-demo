import { InternalCodes } from "../constants/codes"

export interface Error {
    msg: string,
    internalCode: InternalCodes,
}
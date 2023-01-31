import { InternalCodes, StatusCodes } from "../constants/codes"

export interface Error {
    msg: string,
    internalCode: InternalCodes
}

export interface ErrorStatusCode extends Error {
    statusCode: StatusCodes
}
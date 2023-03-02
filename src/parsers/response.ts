import { Response } from 'express';
import { InternalStatusCodesMap, RoutesErrors, InternalCodes } from '../constants/codes';
import logger from '../core/logger';
import { Error } from './../interfaces/error';

export const parseResponseError = (res: Response, error: unknown, externalCode: RoutesErrors, errorProperties?: Partial<Error>):Response => {
    const customError = <Error>error
    customError.msg = errorProperties?.msg || customError.msg
    customError.internalCode = errorProperties?.internalCode || customError.internalCode
    const statusCode = InternalStatusCodesMap[customError.internalCode || InternalCodes.INTERNAL_SERVER_ERROR]
    
    logger.info('RESPONSE ERROR', {
        ...customError,
        externalCode
    })

    return res.status(statusCode).send({
        message: customError.msg,
        internal_code: customError.internalCode,
        external_code: externalCode
    })
}
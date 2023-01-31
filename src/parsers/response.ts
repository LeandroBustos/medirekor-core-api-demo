import { Response } from 'express';
import { ErrorStatusCode } from './../interfaces/error';

export const parseResponseError = (res: Response, error: ErrorStatusCode):Response => 
    res.status(error.statusCode).send({
        message: error.msg,
        internal_code: error.internalCode
    })
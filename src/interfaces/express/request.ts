import { UserAccesToken } from './../user';
import { Request } from "express";

export interface RequestAccessToken extends Request {
    current_user: UserAccesToken
}
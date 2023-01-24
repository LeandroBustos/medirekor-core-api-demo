import { UserState, UsertTypes } from './../constants/user';

export interface UserLogin {
    user: string,
    password: string
};

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at: Date;
    modified_at: Date | null;
    deleted_at: Date | null;
    state: UserState;
    type: UsertTypes;
}
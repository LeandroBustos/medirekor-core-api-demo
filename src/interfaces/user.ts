import { UserState, UserTypes } from './../constants/user';

import { Setting, SettingExtended } from './setting';

export interface User {
    id: string;
    organization_id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at: Date;
    modified_at: Date | null;
    deleted_at: Date | null;
    state: UserState;
    type: UserTypes;
}

export interface UserWithSettings extends User {
    settings: Setting[]
}

export interface UserWithSettingsExtended extends User {
    settings: SettingExtended[]
}

export interface UserLogin {
    user: User['email'],
    password: User['password']
};

export interface UserAccesToken {
    id: User['id'];
    first_name: User['first_name'];
    last_name: User['last_name'];
}

export interface UserCreation {
    organization_id: User['organization_id'];
    first_name: User['first_name'];
    last_name: User['last_name'];
    email: User['email'];
    type: UserTypes;
}

export interface UserCreationSerialize extends UserCreation {
    id: User['id'];
    password: User['password']
    state: UserState;
}

export type UserUpdate = Pick<User, 'first_name' | 'last_name' | 'email' | 'state'>
import { Setting } from './setting';
export interface Organization {
    id: string;
    name: string;
    country: string;
    state: string;
    city: string;
    address: string;
    email: string;
    phone_number: string;
    created_at: Date;
    modified_at: Date | null;
    deleted_at: Date | null;
}

export interface OrganizationWithSettings {
    settings?: Setting[]
}
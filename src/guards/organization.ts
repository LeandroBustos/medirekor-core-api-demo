import { organizationNotFoundError } from './../constants/errors';
import { Organization, OrganizationWithSettings } from './../interfaces/organization';
export const preventOrganizationNotFound = (organization: Organization | OrganizationWithSettings | null) => {
    if(!organization){
        throw organizationNotFoundError
    }
}
import { postgresqlDb } from '../core/database/postgresql';

import * as organizationEntities from '../entities/organization';
import { Organization } from '../interfaces/organization';

const organizationRepository = postgresqlDb.getRepository(organizationEntities.Organization)


export const getOrganizationById = async (organizationId: Organization['id']):Promise<Organization | null> => 
    organizationRepository.findOneBy({ id: organizationId })
    .catch(err => {
        console.log('database err', err)
        throw err
    })

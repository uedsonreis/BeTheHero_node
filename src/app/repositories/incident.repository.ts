import connect from '../database/connection'
import { QueryInterface } from 'knex'

import { Incident } from '../entities'
import { Repository } from './repository'

export class IncidentRepository extends Repository<Incident> {

    constructor() {
        super('incidents')
    }

    public async paging(page: number): Promise<Incident[]> {
        const session = this.openSession()
        const result = await session
            .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
            .limit(5).offset((page -1) * 5).select([
                'incidents.*', 'ngos.name', 'ngos.whatsapp', 'ngos.email', 'ngos.city', 'ngos.uf'
            ])
        return result as Incident[]
    }
}
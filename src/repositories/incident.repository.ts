import connect from '../database/connection'
import { QueryInterface } from 'knex'

import { Incident } from '../entities'
import { Repository } from './repository'

export class IncidentRepository extends Repository<Incident> {

    constructor() {
        super('incidents')
    }
    
    public async delete(id: number): Promise<void> {
        const session = this.openSession()
        await session.where('id', id).delete()
    }
}
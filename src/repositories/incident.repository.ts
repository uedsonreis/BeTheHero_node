import connect from '../database/connection'
import { QueryInterface } from 'knex'

import { Incident } from '../entities'
import { Repository } from './repository'

export class IncidentRepository extends Repository<Incident> {

    constructor() {
        super('incidents')
    }
}
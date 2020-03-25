import { Repository } from './repository'
import { NGO } from '../entities'

export class NGORepository extends Repository<NGO> {

    constructor() {
        super('ngos')
    }

}
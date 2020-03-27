import { generateUniqueId } from '../utils'

import { NGO } from '../entities'
import { NGORepository } from '../repositories'

class NGOService {

    private ngoRepository = new NGORepository()

    public async list(): Promise<NGO[] | Error> {
        try {
            return await this.ngoRepository.getAll()
        } catch (error) {
            console.error(error)
            return error
        }
    }

    public async create(record: NGO): Promise<string | Error> {
        try {
            record.id = generateUniqueId()
            await this.ngoRepository.save(record)
            return record.id
            
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export default new NGOService()
import { NGO } from '../entities'
import { NGORepository } from '../repositories/ngo.repository'

class SessionService {

    private ngoRepository = new NGORepository()

    public async login(id: string): Promise<NGO | Error> {
        try {
            return await this.ngoRepository.get(id)
        } catch (error) {
            console.error(error)
            return error
        }
    }

}

export default new SessionService()
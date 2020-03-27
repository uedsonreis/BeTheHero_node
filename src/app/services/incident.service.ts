import { IncidentRepository } from '../repositories'
import { Incident } from '../entities'

class IncidentService {

    private incidentRepository = new IncidentRepository()

    public async list(page: number): Promise<Incident[] | Error> {
        try {
            return await this.incidentRepository.paging(page)

        } catch (error) {
            console.error(error)
            return error
        }
    }

    public async filter(ngo_id?: string): Promise<Incident[] | Error> {
        try {
            if (ngo_id) {
                return await this.incidentRepository.filter('ngo_id', ngo_id)
            } else {
                return await this.incidentRepository.filter()
            }

        } catch (error) {
            console.error(error)
            return error
        }
    }

    public async count(): Promise<number> {
        return await this.incidentRepository.count()
    }

    public async create(record: Incident): Promise<number | Error> {
        try {
            const result = await this.incidentRepository.save(record)
            return result[0]
            
        } catch (error) {
            console.error(error)
            return error
        }
    }

    public async delete(incident: Incident): Promise<boolean | Error> {
        try {
            const incidentDB = await this.incidentRepository.get(incident.id)
    
            if (!incidentDB || incidentDB.ngo_id !== incident.ngo_id) {
                return new Error('Operação não permitida.')
            }
    
            await this.incidentRepository.delete(incidentDB.id)
            return true
            
        } catch (error) {
            console.error(error)
            return error
        }
    }
}

export default new IncidentService()
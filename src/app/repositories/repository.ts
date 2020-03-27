import connect from '../database/connection'
import { QueryInterface } from 'knex'

export abstract class Repository<R> {

    constructor(private tableName: string) {}

    protected openSession(): QueryInterface {
        return connect(this.tableName)
    }

    public async get(id: any): Promise<R> {
        const session = this.openSession()
        const result = await session.where('id', id).select('*').first()
        return result as R
    }

    public async save(record: R): Promise<any[]> {
        const session = this.openSession()
        return await session.insert(record)
    }

    public async getAll(): Promise<R[]> {
        const session = this.openSession()
        return await session.select('*')
    }

    public async filter(key?: string, value?: any): Promise<R[]> {
        const session = this.openSession()
        return await session.where(key!, value).select('*')
    }

    public async delete(id: any): Promise<void> {
        const session = this.openSession()
        await session.where('id', id).delete()
    }

    public async count(): Promise<number> {
        const session = this.openSession()
        const [count] = await session.count()
        return count['count(*)'] as number
    }
}
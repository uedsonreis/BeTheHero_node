import request from 'supertest'
import app from '../../app'
import connection from '../../app/database/connection'

describe('Controllers', () => {

    beforeAll(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })
    
    let id: string

    it('should be able to create a new NGO', async () => {
        const response = await request(app).post('/ngos').send({
            name: 'APAD', email: 'contato@qualquer.com', whatsapp: '71996663333', city: 'Rio do Sul', uf: 'SC'
        })

        id = response.body
        
        expect(response.status).toEqual(201)
        expect(response.body).toHaveLength(8)
    })

    it('should be able to list all NGOs', async () => {
        const response = await request(app).get('/ngos')
        expect(response.status).toEqual(200)
    })

    it('should be able to list all Incidents', async () => {
        const response = await request(app).get('/incidents').set('page', '2')
        expect(response.status).toEqual(200)
    })

    it('should be able to create a new Incident', async () => {
        const response = await request(app).post('/incidents')
            .set('Authorization', id)
            .send({
                title: 'Caso 1', description: 'Descrevendo', value: 120
            })

        expect(response.status).toEqual(201)
    })
})
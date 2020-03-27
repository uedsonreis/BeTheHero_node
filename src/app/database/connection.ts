import knex, { QueryInterface } from 'knex'

const configuration = require('../../../knexfile')

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

export default knex(config)
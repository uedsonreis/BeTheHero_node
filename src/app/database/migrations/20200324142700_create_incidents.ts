import { CreateTableBuilder, Transaction } from 'knex'

export const up = (transaction: Transaction) => {
    return transaction.schema.createTable('incidents', (table: CreateTableBuilder) => {
        table.increments()
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()
        
        table.string('ngo_id').notNullable()
        table.foreign('ngo_id').references('id').inTable('ngos')
    })
}

export const down = (transaction: Transaction) => {
    return transaction.schema.dropTable('incidents')
}
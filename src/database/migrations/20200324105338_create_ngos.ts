import { CreateTableBuilder, Transaction } from 'knex'

export const up = (transaction: Transaction) => {
    return transaction.schema.createTable('ngos', (table: CreateTableBuilder) => {
        table.string('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
    })
}

export const down = (transaction: Transaction) => {
    return transaction.schema.dropTable('ngos')
}
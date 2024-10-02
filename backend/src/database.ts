import { knex as setupKnex } from 'knex'

export const knex = setupKnex({
    client: 'mysql',
    connection:{
        host: 'localhost',
        database: 'PassMinders',
        port: 3306,
        user: 'root',
        password: '12345'
    }
})

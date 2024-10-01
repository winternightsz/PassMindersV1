import { knex as setupKnex } from 'knex'

export const knex = setupKnex({
    client: 'mysql',
    connection:{
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'passMinders'
    }
})
import { knex as setupKnex } from 'knex'

const knex = setupKnex({
    client: 'mysql',
    connection:{
        
    }
})
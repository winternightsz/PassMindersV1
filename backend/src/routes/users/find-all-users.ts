import { FastifyInstance} from "fastify";
import { knex } from '../../database'

export const FindAllUsers = async (app: FastifyInstance) =>{
    app.get('/findAllUsers', async() =>{
        const tables = await knex('Usuario').select('*')
        return tables
    })
}
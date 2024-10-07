import { FastifyInstance} from "fastify";
import { knex } from '../../database'

export const FindAllFolders = async (app: FastifyInstance) =>{
    app.get('/findAllFolders', async() =>{
        const tables = await knex('Pasta').select('*')
        return tables
    })
}
import { FastifyInstance} from "fastify";
import { knex } from '../../database'
import { Folder } from "../../models/Folder";

export const FindAllFolders = async (app: FastifyInstance) =>{
    app.get('/findAllFolders', async() =>{
        const tables = await knex<Folder>('Pasta').select('*')
        return tables
    })
}
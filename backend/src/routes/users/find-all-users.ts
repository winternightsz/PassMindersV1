import { FastifyInstance} from "fastify";
import { knex } from '../../database'
import { User } from "../../models/User";

export const FindAllUsers = async (app: FastifyInstance) =>{
    app.get('/findAllUsers', async() =>{
        const tables = await knex<User>('Usuario').select('*')
        return tables
    })
}
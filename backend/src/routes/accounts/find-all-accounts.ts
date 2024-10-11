import { FastifyInstance} from "fastify";
import { knex } from '../../database'
import { Account } from "../../models/Account";

export const FindAllAccounts = async (app: FastifyInstance) =>{
    app.get('/findAllAccounts', async() =>{
        const tables = await knex<Account>('Contas').select('*')
        return tables
    })
}
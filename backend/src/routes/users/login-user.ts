import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from '../../database'

export const LoginUser = async (app: FastifyInstance) =>{
    const nomeUsuario = "Gregori"
    const senha = "12345"
    app.get('/loginUser', async() =>{
        const tables = await knex('Usuario').select("*").where({nomeUsuario}).where({senha})
        return tables
    })
}
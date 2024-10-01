import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from '../../database'
import { z } from 'zod'

export const CreateUser = async (app: FastifyInstance) =>{
    app.post('/createUser', async (request, reply) =>{
        
        const Usuario = z.object({
            email: z.string(),
            nomeUsuario: z.string(),
            senha: z.string()
        })

        const user = Usuario.parse(request.body)

        return reply.status(201).send()
    })
}
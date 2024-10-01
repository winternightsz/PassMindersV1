import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from '../../database'
import { z } from 'zod'

export const CreateUser = async (app: FastifyInstance) =>{
    app.post('/createUser', async (request, reply) => {
        try {
            const Usuario = z.object({
                email: z.string().email(),
                nomeUsuario: z.string(),
                senha: z.string()
            });
    
            const user = Usuario.parse(request.body);

            await knex('Usuario').insert(user);
    
            return reply.status(201).send({ message: 'Usuário criado com sucesso!' });
        } catch (error) {
            return reply.status(400).send({ error: error.errors || 'Erro ao criar usuário' });
        }
    });
    
}
import { FastifyInstance, FastifyRequest } from 'fastify';
import { knex } from '../../database';
import { z } from 'zod';
import { User } from '../../models/User';

export const DeleteUser = async (app: FastifyInstance) => {
    app.delete('/deleteUser/:id', async (request: FastifyRequest, reply) => {
        try {
            const paramsSchema = z.object({
                id: z.string(), 
            });

            const { id: idString } = paramsSchema.parse(request.params);
            const id = parseInt(idString, 10); 

            const result = await knex<User>('Usuario').where({ id }).del();

            if (result === 0) {
                return reply.status(404).send({ error: 'Usuário não encontrado' });
            }

            return reply.status(200).send({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            return reply.status(400).send({ error: error.errors || 'Erro ao deletar usuário' });
        }
    });
};
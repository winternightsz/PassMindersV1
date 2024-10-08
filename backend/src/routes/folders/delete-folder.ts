import { FastifyInstance, FastifyRequest } from 'fastify';
import { knex } from '../../database';
import { z } from 'zod';
import { Folder } from '../../models/Folder';

export const DeleteFolder = async (app: FastifyInstance) => {
    app.delete('/deleteFolder/:id', async (request: FastifyRequest, reply) => {
        try {
            const paramsSchema = z.object({
                id: z.string(),
            });

            const { id: idString } = paramsSchema.parse(request.params);
            const id = parseInt(idString, 10);

            const result = await knex<Folder>('Pasta').where({ id }).del();

            if (result === 0) {
                return reply.status(404).send({ error: 'Pasta não encontrada' });
            }

            return reply.status(200).send({ message: 'Pasta deletada com sucesso!' });
        } catch (error) {
            return reply.status(400).send({ error: error.errors || 'Erro ao deletar pasta' });
        }
    });
};
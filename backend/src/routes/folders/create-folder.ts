import { FastifyInstance, FastifyRequest } from 'fastify';
import { knex } from '../../database';
import { z } from 'zod';

export const CreateFolder = async (app: FastifyInstance) => {
    app.post('/createFolder', async (request: FastifyRequest, reply) => {
        try {
            const FolderSchema = z.object({
                nome: z.string().min(1, "O nome da pasta é obrigatório.")
            });

            const folder = FolderSchema.parse(request.body);

            const existingFolder = await knex('Pasta').where({ nome: folder.nome }).first();
            if (existingFolder) {
                return reply.status(400).send({ error: 'Uma pasta com este nome já existe' });
            }

            const [id] = await knex('Pasta').insert({ nome: folder.nome });

            const pastaCriada = await knex('Pasta').where({ id }).first();
            return reply.status(201).send(pastaCriada);

        } catch (error) {
            console.error("Erro ao criar pasta:", error);
            if (error instanceof z.ZodError) {
                return reply.status(400).send({ error: error.errors });
            }
        }
    });
};

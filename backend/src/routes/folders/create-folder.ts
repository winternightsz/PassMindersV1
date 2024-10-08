import { FastifyInstance, FastifyRequest } from 'fastify';
import { knex } from '../../database';
import { z } from 'zod';
import { Folder } from '../../models/Folder';

export const CreateFolder = async (app: FastifyInstance) => {
    app.post('/createFolder', async (request: FastifyRequest, reply) => {
        try {
            const FolderSchema = z.object({
                nome: z.string().min(1, "O nome da pasta é obrigatório."),
            });

            const folder = FolderSchema.parse(request.body);
            const existingFolder = await knex<Folder>('Pasta').where({ nome: folder.nome }).first();
            if (existingFolder) {
                return reply.status(400).send({ error: 'Uma pasta com este nome já existe' });
            }

            const [id] = await knex<Folder>('Pasta').insert({
                nome: folder.nome,
            }).returning("id");

            const pastaCriada = await knex<Folder>('Pasta').where(id).first()

            return reply.status(201).send(pastaCriada);

        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply.status(400).send({ error: error.errors });
            }
            console.log(error)
            return reply.status(400).send({ error: 'Erro ao criar pasta' });
        }
    });
};

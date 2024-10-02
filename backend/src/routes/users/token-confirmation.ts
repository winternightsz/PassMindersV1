import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { knex } from '../../database';
import { z } from 'zod';

export const TokenConfirmation = async (app: FastifyInstance) => {
    app.get('/confirmationToken/:token', async (request: FastifyRequest, reply: FastifyReply) => {
        const paramsSchema = z.object({
            token: z.string(),
        });

        try {
            const { token } = paramsSchema.parse(request.params);

            const user = await knex('Usuarios').where({ confirmationToken: token }).first();

            if (!user) {
                return reply.status(404).send({ error: 'Token de confirmação inválido' });
            }

            // Atualiza o status de confirmação e remove o token
            await knex('Usuarios').where({ id: user.id }).update({
                emailVerified: true, // Atualiza para indicar que o e-mail foi verificado
                confirmationToken: null // Remove o token de confirmação
            });

            return reply.status(200).send({ message: 'E-mail confirmado com sucesso!' });
        } catch (error) {
            return reply.status(400).send({ error: error.errors || 'Erro ao confirmar e-mail' });
        }
    });
};

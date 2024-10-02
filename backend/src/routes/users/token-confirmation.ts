import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../database'
import { z } from 'zod'

export const TokenConfirmation = async (app: FastifyInstance) => {
    app.get('/confirmationToken/:token', async (request: FastifyRequest, reply: FastifyReply) => {
        const paramsSchema = z.object({
            token: z.string(),
        });

        try {
            const { token } = paramsSchema.parse(request.params);

            // Verifique se o token está correto
            const user = await knex('Usuario').where({ token }).first();

            if (!user) {
                return reply.status(404).send({ error: 'Token de confirmação inválido' });
            }

            // Atualize o status do usuário
            await knex('Usuario').where({ id: user.id }).update({ contaAtiva: true });

            return reply.status(200).send({ message: 'E-mail confirmado com sucesso!' });
        } catch (error) {
            console.error(error); // Adicione um log para depuração
            return reply.status(400).send({ error: 'Erro ao confirmar e-mail' });
        }
    });
};


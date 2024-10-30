import { FastifyInstance, FastifyRequest } from 'fastify';
import { knex } from '../../database';
import { z } from 'zod';
import { Account } from '../../models/Account';

export const EditAccount = async (app: FastifyInstance) => {
    app.put('/editAccount/:id', async (request: FastifyRequest, reply) => {
        try {
            const AccountSchema = z.object({
                titulo: z.string().optional(),
                foto_referencia: z.string().optional(),
                id_pasta: z.number().optional()
            });

            const accountId = request.params.id;
            const updatedData = AccountSchema.parse(request.body);

            const result = await knex<Account>('Conta')
                .where({ id: accountId })
                .update(updatedData);

            if (result === 0) {
                return reply.status(404).send({ error: 'Conta não encontrada.' });
            }

            return reply.status(200).send({ message: 'Conta editada com sucesso!' });
        } catch (error) {
            console.error("Erro ao editar a conta", error);
            return reply.status(400).send({ error: error.errors || 'Erro ao editar a conta' });
        }
    });
};

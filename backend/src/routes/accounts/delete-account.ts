import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '../../database';
import { Account } from '../../models/Account';
import { ItemConta } from '../../models/ItemConta';

export const DeleteAccount = async (app: FastifyInstance) => {
    app.delete('/deleteAccount/:id', async (request: FastifyRequest, reply) => {
        try {
            const { id } = request.params as { id: number };

            // Deleta os itens associados à conta 
            await knex<ItemConta>('ItemConta').where({ id_conta: id }).del();

            // deleta a conta
            const result = await knex<Account>('Conta').where({ id }).del();

            if (result === 0) {
                return reply.status(404).send({ error: 'Conta não encontrada' });
            }

            return reply.status(200).send({ message: 'Conta excluída com sucesso!' });
        } catch (error) {
            console.error("Erro ao excluir a conta", error);
            return reply.status(400).send({ error: 'Erro ao excluir a conta' });
        }
    });
};

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '../../database';
import { ItemConta } from '../../models/ItemConta';

export const FindAllItemConta = async (app: FastifyInstance) => {
    app.get('/findItemConta/:accountId', async (request: FastifyRequest, reply) => {
        const { accountId } = request.params as { accountId: number };

        try {
            // busca todos os itens relacionados a uma conta especifica
            const items = await knex<ItemConta>('ItemConta').where({ id_conta: accountId });

            if (!items || items.length === 0) {
                return reply.status(404).send({ error: 'Nenhum item encontrado para esta conta.' });
            }

            return reply.status(200).send(items);
        } catch (error) {
            console.error('Erro ao buscar itens da conta:', error);
            return reply.status(500).send({ error: 'Erro ao buscar itens da conta.' });
        }
    });
};
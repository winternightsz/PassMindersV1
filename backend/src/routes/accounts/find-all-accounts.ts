import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '../../database';
import { Account } from '../../models/Account';
import { ItemConta } from '../../models/ItemConta';

export const FindAllAccounts = async (app: FastifyInstance) => {
    app.get('/findAllAccounts', async (request: FastifyRequest, reply) => {
        try {
            const accounts = await knex<Account>('Conta').select('*');
            if (!accounts || accounts.length === 0) {
                return reply.status(404).send({ error: 'Nenhuma conta encontrada.' });
            }

            const accountsWithItems = await Promise.all(
                accounts.map(async (account) => {
                    const items = await knex<ItemConta>('ItemConta').where({ id_conta: account.id });
                    console.log("Itens da conta:", account.id, items);
                    return { ...account, dados: items };
                })
            );

            return reply.status(200).send(accountsWithItems);
        } catch (error) {
            console.error('Erro ao buscar contas:', error);
            return reply.status(500).send({ error: 'Erro ao buscar contas.' });
        }
    });
};

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '../../database';
import { Account } from '../../models/Account';
import { ItemConta } from '../../models/ItemConta';
//Esse aqui usa no folderDetails 
export const FindAllAccounts = async (app: FastifyInstance) => {
    app.get('/findAccounts/:folderId', async (request: FastifyRequest, reply) => {
        const { folderId } = request.params as { folderId: number };

        try {
            //busca todas as contas relacionadas a uma pasta especifica
            const accounts = await knex<Account>('Conta').where({ id_pasta: folderId });

            if (!accounts || accounts.length === 0) {
                return reply.status(404).send({ error: 'Nenhuma conta encontrada para esta pasta.' });
            }

            // pra cada conta vai buscar os itens relacionados
            const accountsWithItems = await Promise.all(
                accounts.map(async (account) => {
                    const items = await knex<ItemConta>('ItemConta').where({ id_conta: account.id });
                    return { ...account, dados: items }; // vai inclui os itens no campo 'dados'
                })
            );

            return reply.status(200).send(accountsWithItems);
        } catch (error) {
            console.error('Erro ao buscar contas:', error);
            return reply.status(500).send({ error: 'Erro ao buscar contas.' });
        }
    });
};
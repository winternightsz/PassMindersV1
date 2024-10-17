import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '../../database';
import { Folder } from '../../models/Folder';
import { Account } from '../../models/Account';
import { ItemConta } from '../../models/ItemConta';

export const FindFolderById = async (app: FastifyInstance) => {
    app.get('/findFolder/:id', async (request: FastifyRequest, reply) => {
        const { id } = request.params as { id: number };
        try {
            // Busca a pasta pelo ID
            const folder = await knex<Folder>('Pasta').where({ id }).first();
            if (!folder) {
                return reply.status(404).send({ error: 'Pasta não encontrada.' });
            }

            // Busca as contas relacionadas à pasta
            const accounts = await knex<Account>('Conta').where({ id_pasta: id });

            // Busca os itens de cada conta
            const accountsWithItems = await Promise.all(
                accounts.map(async (account) => {
                    const items = await knex<ItemConta>('ItemConta').where({ id_conta: account.id });
                    return { ...account, dados: items };
                })
            );

            // Retorna a pasta com as contas e itens
            const folderWithAccountsAndItems = { ...folder, contas: accountsWithItems };
            return reply.status(200).send(folderWithAccountsAndItems);
        } catch (error) {
            console.error('Erro ao buscar a pasta:', error);
            return reply.status(500).send({ error: 'Erro ao buscar a pasta.' });
        }
    });
};

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '../../database';
import { Folder } from '../../models/Folder';
import { Account } from '../../models/Account';
import { ItemConta } from '../../models/ItemConta';

export const FindAllFolders = async (app: FastifyInstance) => {
    app.get('/findFolders', async (request: FastifyRequest, reply) => {
        try {
            // busca no banco as pastas
            const folders = await knex<Folder>('Pasta').select('*');

            if (!folders || folders.length === 0) {
                return reply.status(404).send({ error: 'Nenhuma pasta encontrada.' });
            }

            // vai buscar as contas para cada pasta
            const foldersWithAccountsAndItems = await Promise.all(
                folders.map(async (folder) => {
                    // busca no banco as contas relacionadas a pasta
                    const accounts = await knex<Account>('Conta').where({ id_pasta: folder.id });

                    // vai buscar cada itemConta relacionado a cada conta
                    const accountsWithItems = await Promise.all(
                        accounts.map(async (account) => {
                            const items = await knex<ItemConta>('ItemConta').where({ id_conta: account.id });
                            return { ...account, dados: items }; // add os itemConta na conta
                        })
                    );

                    return { ...folder, contas: accountsWithItems }; // add as contas ja com o itemConta na pasta
                })
            );

            return reply.status(200).send(foldersWithAccountsAndItems);
        } catch (error) {
            console.error('Erro ao buscar pastas:', error);
            return reply.status(500).send({ error: 'Erro ao buscar pastas.' });
        }
    });
};
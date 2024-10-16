import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '../../database';
import { Folder } from '../../models/Folder';
import { Account } from '../../models/Account';
import { ItemConta } from '../../models/ItemConta';

export const DeleteFolder = async (app: FastifyInstance) => {
  app.delete('/deleteFolder/:id', async (request: FastifyRequest, reply) => {
    const { id } = request.params as { id: number }; // ID do folder a ser deletado

    try {
      // Iniciar uma transação
      await knex.transaction(async (trx) => {
        // Passo 1: Deletar os itens (ItemConta) relacionados a cada conta do folder
        await trx<ItemConta>('ItemConta')
          .whereIn('id_conta', function () {
            this.select('id').from('Conta').where('id_pasta', id);
          })
          .del();

        // Passo 2: Deletar as contas (Account) associadas ao folder
        await trx<Account>('Conta').where('id_pasta', id).del();

        // Passo 3: Deletar o folder
        const deletedFolder = await trx<Folder>('Pasta').where('id', id).del();

        if (deletedFolder) {
          return reply.status(200).send({ message: 'Pasta e conteúdos associados deletados com sucesso.' });
        } else {
          return reply.status(404).send({ error: 'Pasta não encontrada.' });
        }
      });
    } catch (error) {
      console.error('Erro ao deletar pasta e conteúdo associado:', error);
      return reply.status(500).send({ error: 'Erro ao deletar pasta.' });
    }
  });
};
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from "zod";
import { z } from "zod";
import { knex } from '../../database';
import { Account } from '../../models/Account';
import { ItemConta } from '../../models/ItemConta';

export const DeleteAccount = async (app: FastifyInstance) => {
  app.delete('/deleteAccount', async (request: FastifyRequest, reply) => {
    const AccountSchema = z.object({
      id_pasta: z.number().int().nonnegative(),
      id_conta: z.number().int().nonnegative(),
    });

    try {
      const accountData = AccountSchema.parse(request.body);

      await knex.transaction(async (trx) => {
        // Deleta os itens (ItemConta) relacionados à conta específica
        await trx<ItemConta>('ItemConta')
          .where('id_conta', accountData.id_conta)
          .del();

        // Deleta a conta (Account) específica
        const deletedConta = await trx<Account>('Conta')
          .where('id', accountData.id_conta)
          .andWhere('id_pasta', accountData.id_pasta)
          .del();

        if (deletedConta) {
          return reply.status(200).send({ message: 'Conta e itens associados deletados com sucesso.' });
        } else {
          return reply.status(404).send({ error: 'Conta não encontrada.' });
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({ error: 'Dados de entrada inválidos', details: error.errors });
      } else {
        console.error('Erro ao deletar conta e itens associados:', error);
        return reply.status(500).send({ error: 'Erro ao deletar conta.' });
      }
    }
  });
};

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from "zod";
import { knex } from '../../database';
import { ItemConta } from '../../models/ItemConta';

export const UpdateAccount = async (app: FastifyInstance) => {
  app.put('/updateAccount', async (request: FastifyRequest, reply) => {
    console.log("Dados recebidos no backend:", request.body); // Log para verificação

    const AccountSchema = z.object({
      id_pasta: z.number().int().nonnegative(),
      id_conta: z.number().int().nonnegative(),
      dados: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })),
    });

    try {
      const accountData = AccountSchema.parse(request.body);

      await knex.transaction(async (trx) => {
        // Remove todos os itens antigos da conta para garantir atualização completa
        await trx<ItemConta>('ItemConta').where('id_conta', accountData.id_conta).del();

        // Insere todos os novos itens enviados
        for (const item of accountData.dados) {
          await trx<ItemConta>('ItemConta').insert({
            id_conta: accountData.id_conta,
            rotulo: item.label,
            dado: item.value,
          });
        }

        reply.status(200).send({ message: 'Conta atualizada com sucesso.' });
      });
    } catch (error) {
      console.error('Erro ao atualizar conta no backend:', error);
      reply.status(500).send({ error: 'Erro ao atualizar conta.' });
    }
  });
};

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '../../database';
import { z } from 'zod';
import { ZodError } from 'zod';
import { Account } from '../../models/Account';
import { ItemConta } from '../../models/ItemConta';

export const CreateAccount = async (app: FastifyInstance) => {
    app.post('/createAccount', async (request: FastifyRequest, reply) => {
        try {
            // valida pro schema de criacao de Conta e ItemConta
            const AccountSchema = z.object({
                id_pasta: z.number().int().nonnegative(),
                titulo: z.string().min(1, "O nome da conta é obrigatório."),
                foto_referencia: z.string().optional(),
                dados: z.array(
                    z.object({
                        label: z.string(),
                        value: z.string()
                    })
                )
            });

            // faz parse e validacao dos dados da requisicao
            const accountData = AccountSchema.parse(request.body);

            // verifica se o ID da pasta e valido
            console.log("Valor de id_pasta:", accountData.id_pasta);

            // cria a conta e insere na tabela Conta pegando o id da conta
            const [accountId] = await knex<Account>('Conta').insert({
                titulo: accountData.titulo,
                foto_referencia: accountData.foto_referencia, // deixa que a foto seja opcional
                id_pasta: accountData.id_pasta
            });

            // itera pelos dados e insere cada item na tabela ItemConta
            for (const item of accountData.dados) {
                await knex<ItemConta>('ItemConta').insert({
                    rotulo: item.label,
                    dado: item.value,
                    id_conta: accountId // relaciona cada item a conta criada
                });
            }
            
            // retorna a resposta de sucesso
            return reply.status(201).send({ message: 'Conta criada com sucesso!' });

        }catch (error: unknown) {
            if (error instanceof ZodError) {
              console.error('Erro ao criar a conta:', error);
              return reply.status(400).send({ error: error.errors || 'Erro ao criar conta' });
            } else {
              console.error('Erro ao criar a conta:', error);
              return reply.status(500).send({ error: 'Erro interno' });
            }
          }
    });
};
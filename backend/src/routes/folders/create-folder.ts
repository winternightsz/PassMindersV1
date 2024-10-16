import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { knex } from '../../database';
import { z } from 'zod';
import { Folder } from '../../models/Folder';
import { Account } from '../../models/Account';
import { ItemConta } from '../../models/ItemConta';

export const CreateFolder = async (app: FastifyInstance) => {
  app.post('/createFolder', async (request: FastifyRequest, reply) => {
      try {
          // Valida os dados do schema
          const FolderSchema = z.object({
              nome: z.string().min(1, "O nome da pasta é obrigatório."),
              accounts: z.array(
                  z.object({
                      titulo: z.string().min(1, "O título da conta é obrigatório."),
                      foto_referencia: z.string().optional(),
                      dados: z.array(
                          z.object({
                              label: z.string(),
                              value: z.string(),
                          })
                      ),
                  })
              ).optional(),
          });

          // Faz parse e validação dos dados da requisição
          const folderData = FolderSchema.parse(request.body);

          // Verifica se uma pasta com o mesmo nome já existe
          const existingFolder = await knex<Folder>('Pasta').where({ nome: folderData.nome }).first();
          if (existingFolder) {
              return reply.status(400).send({ error: 'Uma pasta com este nome já existe' });
          }

          // Cria a pasta e retorna o ID da pasta criada
          const [createdFolderId] = await knex<Folder>('Pasta')
              .insert({
                  nome: folderData.nome,
              })
              .returning('id'); // MSSQL precisa desse retorno explícito

          // Insere as contas associadas se houver
          if (folderData.accounts && folderData.accounts.length > 0) {
              for (const account of folderData.accounts) {
                  // Cria cada conta associada à pasta
                  const [createdAccountId] = await knex<Account>('Conta')
                      .insert({
                          titulo: account.titulo,
                          foto_referencia: account.foto_referencia,
                          id_pasta: createdFolderId.id, // Relaciona a conta com a pasta criada
                      })
                      .returning('id'); // MSSQL precisa desse retorno explícito

                  // Insere os itens na tabela ItemConta
                  for (const item of account.dados) {
                      await knex<ItemConta>('ItemConta').insert({
                          rotulo: item.label,
                          dado: item.value,
                          id_conta: createdAccountId.id, // Relaciona com a conta
                      });
                  }
              }
          }

          // Retorna a pasta criada com seus detalhes e o ID
          const pastaCriada = await knex<Folder>('Pasta').where({ id: createdFolderId.id }).first();
          return reply.status(201).send(pastaCriada);

      } catch (error) {
          if (error instanceof z.ZodError) {
              return reply.status(400).send({ error: error.errors });
          }
          console.error('Erro ao criar pasta:', error);
          return reply.status(500).send({ error: 'Erro ao criar pasta' });
      }
  });
};

import { FastifyInstance, FastifyRequest } from 'fastify'
import { knex } from '../../database'
import { z } from 'zod'
import { Account } from '../../models/Account'

export const CreateAccount = async (app: FastifyInstance) => {
    app.post('/createAccount', async (request: FastifyRequest, reply) => {
        try {
            const AccountSchema = z.object({
                id_pasta: z.number().int().nonnegative().optional(),
                email: z.string().email("Email inválido.").optional(),
                nome: z.string().min(1, "O nome é obrigatório.").optional(),
                senha: z.string().min(1, "A senha é obrigatória.").optional(),
                outro: z.string().optional()
            })

            const account = AccountSchema.parse(request.body)
            
            await knex<Account>('Contas').insert(account)

            return reply.status(201).send({ message: 'Conta criada com sucesso!' });
        } catch (error) {
            console.error("Erro ao criar sua conta", error)
            return reply.status(400).send({ error: error.errors || 'Erro ao criar conta' })
        }
    })
}

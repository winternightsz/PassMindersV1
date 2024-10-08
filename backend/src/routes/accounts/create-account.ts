import { FastifyInstance, FastifyRequest } from 'fastify'
import { knex } from '../../database'
import { z } from 'zod'
import { Account } from '../../models/Account'

export const CreateAccount = async(app: FastifyInstance) =>{
    app.post('/createAccount', async (request: FastifyRequest, reply)=>{
        try{
            const AccountSchema = z.object({
                titulo: z.string().min(1,"O titulo da conta é obrigatório."),
                usuario: z.string(),
                senha: z.string()
            })

            const account = AccountSchema.parse(request.body)
            
            await knex<Account>('Conta').insert(account)

            return reply.status(201).send({ message: 'Conta criada com sucesso!' });
        } catch (error) {
            console.error("Erro ao criar sua conta", error)
            return reply.status(400).send({ error: error.errors || 'Erro ao criar conta'})
        }

    })

}
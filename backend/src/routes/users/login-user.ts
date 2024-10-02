import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { knex } from '../../database'
import { z } from 'zod'

export const LoginUser = async (app: FastifyInstance) => {
    app.post('/loginUser', async (request: FastifyRequest, reply: FastifyReply) => {
        const schema = z.object({
            email: z.string().email(),
            senha: z.string()
        })

        try {
            const { email, senha } = schema.parse(request.body)

            const user = await knex('Usuario').where({ email, senha }).first()

            if (!user) {
                return reply.status(401).send({ error: 'Credenciais inválidas' })
            }

            if (!user.contaAtiva) {
                return reply.status(403).send({ error: 'E-mail não verificado. Por favor, verifique seu e-mail.' })
            }

            return reply.status(200).send({ message: 'Login efetuado com sucesso', user })
        } catch (error) {
            return reply.status(400).send({ error: error.errors || 'Erro ao fazer login' })
        }
    })
}


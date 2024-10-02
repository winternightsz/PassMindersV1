import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from '../../database'
import { z } from 'zod'

export const LoginUser = async (app: FastifyInstance) =>{
    app.post('/loginUser', async(request, reply) =>{
        const schema = z.object({
            nomeUsuario: z.string(),
            email: z.string().email(),
            senha: z.string()
        })

        try{
            const {nomeUsuario,email,senha} = schema.parse(request.body)

            const user = await knex('Usuario')
                .where({nomeUsuario,email,senha})
                .first()

            if(!user){
                return reply.status(401).send({error: 'Credenciais inválidas'})
            }
            
            return reply.status(200).send({messege: 'Login efetuado com sucesso',user})
        }catch(error){
            return reply.status(400).send({ error: error.errors || 'Erro ao fazer login' })
        }
    })
}

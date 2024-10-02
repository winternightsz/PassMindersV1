import fastify from 'fastify'
import cors from '@fastify/cors'
import { routes } from './routes/routes'

export const app = fastify()
app.register(routes)
app.register(cors,{})

app.listen({port: 3000}, (err,address) =>{
    if (err){
        console.log(err)
    }

    console.log('Servidor rodando em http://localhost:3000')
})
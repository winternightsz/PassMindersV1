import fastify from 'fastify'
import cors from '@fastify/cors'
import { routes } from './routes/routes'

export const app = fastify()

app.register(cors,{})
app.register(routes)

app.listen({port: 5000}, (err,address) =>{
    if (err){
        console.log(err)
    }

    console.log('Servidor rodando em http://localhost:5000')
})

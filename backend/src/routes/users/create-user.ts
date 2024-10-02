import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from '../../database';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const smtp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Mude para 'false' se usar o port 587
    auth: {
        user: "gremabr007@gmail.com",
        pass: "tubt uzng vpha iuie"
    }
});

export const CreateUser = async (app: FastifyInstance) => {
    app.post('/createUser', async (request, reply) => {
        try {
            const Usuario = z.object({
                email: z.string().email(),
                nomeUsuario: z.string(),
                senha: z.string()
            });
            const user = Usuario.parse(request.body);

            const userMail = {
                from: "gremabr007@gmail.com",
                to: user.email,
                subject: "Confirmação do Cadastro - PassMinders",
                html: '<a href="http://localhost:3000/login"> Clique aqui para confirmar seu cadastro! </a>'
            };

            // Aguarde a resolução da Promise de envio do email
            await smtp.sendMail(userMail);

            await knex('Usuario').insert(user);

            return reply.status(201).send({ message: 'Usuário criado com sucesso!' });
        } catch (error) {
            console.error("Erro ao criar usuário ou enviar email:", error);
            return reply.status(400).send({ error: error.errors || 'Erro ao criar usuário' });
        } finally {
            smtp.close(); // Feche o transporte após a operação
        }
    });
};

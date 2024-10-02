import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from '../../database';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

// Configurando o transporte SMTP
const smtp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "gremabr007@gmail.com",
        pass: "tubt uzng vpha iuie" // **Lembre-se de usar senhas específicas para aplicativos**
    }
});

export const CreateUser = async (app: FastifyInstance) => {
    app.post('/createUser', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            // Definindo o esquema de validação do usuário
            const Usuario = z.object({
                nomeUsuario: z.string(),
                email: z.string().email(),
                senha: z.string()
            });

            // Validação dos dados do usuário
            const user = Usuario.parse(request.body);

            // Gerando o token
            const token = randomBytes(16).toString('hex');
            const confirmationLink = `http://localhost:5000/confirmationToken/${token}`;

            // Dados do usuário a serem inseridos no banco de dados
            const userData = {
                nomeUsuario: user.nomeUsuario,
                email: user.email,
                senha: user.senha,
                token 
            };

            // Inserindo o usuário no banco de dados
            await knex('Usuario').insert(userData);

            // Configurando o e-mail
            const userMail = {
                from: "gremabr007@gmail.com",
                to: user.email,
                subject: "Confirmação do Cadastro - PassMinders",
                html: `
                    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                        <h1 style="color: #5673D5;">Bem-vindo ao PassMinders!</h1>
                        <p>Estamos empolgados em tê-lo conosco. Para completar seu cadastro, clique no botão abaixo:</p>
                        <a href="${confirmationLink}" style="display: inline-block; padding: 10px 20px; background-color: #5673D5; color: white; text-decoration: none; border-radius: 5px;">Confirmar Cadastro</a>
                        <p style="margin-top: 20px;">Se você não se inscreveu, ignore este e-mail.</p>
                        <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                            &copy; 2024 PassMinders.
                        </footer>
                    </div>`
            };

            // Enviando o e-mail
            await smtp.sendMail(userMail);

            // Retornando resposta de sucesso
            return reply.status(201).send({ message: 'Usuário criado com sucesso!' });
        } catch (error) {
            console.error("Erro ao criar usuário ou enviar email:", error); // Log detalhado
            return reply.status(400).send({ error: error.errors || 'Erro ao criar usuário' });
        }
    });
};

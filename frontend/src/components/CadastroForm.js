"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

const CadastroForm = () => {
  const [email, setEmail] = useState("");
  const [nomeUsuario, setNome] = useState("");
  const [senha, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  // funcao que valida a senha
   const isPasswordValid = (password) => {
     // Tem que ter pelo menos 8 caracteres, um numero e uma letra maiuscula
     return password.length >= 8;
   };

  // funcao que faz a requisicao para o backend e manipula a submissao do formulario
  // pra criar um novo usuario no banco de dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de senha e confirmação
    if (senha !== confirmPassword) {
        alert("As senhas não são iguais.");
        return;
    }

    // Verifica se a senha atende os requisitos
    if (!isPasswordValid(senha)) {
        alert("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um número.");
        return;
    }

    // Dados para serem enviados para o backend
    const formData = { email, nomeUsuario, senha };

    try {
        const response = await axios.post("http://localhost:5000/createUser", formData);

        if (response.status === 201) {
            alert("Cadastro bem-sucedido! Verifique seu e-mail para confirmar o cadastro.");
            // router.push('/login');
        } else {
            console.error('Erro ao cadastrar:', response.data);
        }
    } catch (err) {
        // Verifica se o erro é relacionado ao e-mail já existente
        if (err.response && err.response.status === 409) {
            alert(err.response.data.error); // Exibe a mensagem de erro do backend
        } else {
            console.error('Erro na requisição:', err);
            alert('Este e-mail já está cadastrado.');
        }
    }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-azul60">
      <div className="w-full max-w-2xl bg-branco30 rounded-3xl shadow-lg p-8 md:p-16">
        <div className="space-y-6">
          <h1 className="text-4xl xl:text-6xl font-bold text-azul10 border-b-4 border-azul10 pb-2">
            Criar uma conta
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-base font-medium text-azul10">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                className="!bg-azul60 border border-gray-300 text-azul10 text-base rounded-lg !focus:ring-azul10 !focus:border-azul10 block w-full p-2.5"
                placeholder="email@exemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="nome" className="block mb-2 text-base font-medium text-azul10">
                Nome de Usuário
              </label>
              <input
                type="text"
                name="nome"
                className="!bg-azul60 border border-gray-300 text-azul10 text-base rounded-lg focus:ring-azul10 focus:border-azul10 block w-full p-2.5"
                placeholder="@username"
                required
                value={nomeUsuario}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-base font-medium text-azul10">
                Senha
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="!bg-azul60 border border-gray-300 text-azul10 text-base rounded-lg focus:ring-azul10 focus:border-azul10 block w-full p-2.5"
                required
                value={senha}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-base font-medium text-azul10">
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirm-password"
                placeholder="********"
                className="!bg-azul60 border border-gray-300 text-azul10 text-base rounded-lg focus:ring-azul10 focus:border-azul10 block w-full p-2.5"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 !focus:ring-azul10"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                  Aceito os{" "}
                  <a className="font-medium text-primary-600 hover:underline" href="#">
                    Termos e Condições
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="text-branco30 !bg-azul10 hover:bg-azul60 rounded-3xl px-16 py-3 text-center font-medium text-xl mx-auto block"
            >
              INSCREVA-SE
            </button>
            <p className="text-center text-base text-azul60">
              ou{" "}
              <a href="/login" className="text-azul10 hover:underline">
                Fazer login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroForm;

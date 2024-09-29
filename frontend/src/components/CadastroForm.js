"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const CadastroForm = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  // funcao que valida a senha
  const isPasswordValid = (password) => {
    // Tem que ter pelo menos 8 caracteres, um numero e uma letra maiuscula
    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };

  // funcao para verificar se tem email e nome de usuario duplicados
  const checkDuplicateUser = async (email, nome) => {
    try {
      const response = await fetch(`http://localhost:5000/api/check-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, nome }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.exists; // retorna `true` se existe e `false` se nao tem
      } else {
        console.error('Erro ao verificar usuario:', response.status);
        return true; // quando da erro nao faz o cadastro
      }
    } catch (err) {
      console.error('Erro na requisicao de verificacao:', err);
      return true; 
    }
  };

  // funcao que faz a requisicao para o backend e manipula a submissao do formulario
  // pra criar um novo usuario no banco de dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validacao de senha e confirmacao
    if (password !== confirmPassword) {
      alert("As senhas nao sao iguais.");
      return;
    }

    // verifica se a senha atende os requisitos
    if (!isPasswordValid(password)) {
      alert("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiuscula e um numero.");
      return;
    }

    // verifica se email ou nome de usuario ja estao cadastrados
    const isDuplicate = await checkDuplicateUser(email, nome);
    if (isDuplicate) {
      alert("Email ou nome de usuario ja estao cadastrados.");
      return; // impede o cadastro se ja existe
    }

    // dados para serem enviados para o backend
    const formData = { email, nome, password };

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Cadastro bem-sucedido:', data);
        router.push('/login');
      } else {
        const error = await response.json();
        console.error('Erro ao cadastrar:', error);
      }
    } catch (err) {
      console.error('Erro na requisicao:', err);
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
                value={nome}
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
                value={password}
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

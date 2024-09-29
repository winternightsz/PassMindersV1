"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';


//uma ideia pra como poder fazer uma pagina segura usando token


const MainPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      // Verifica se o token existe no localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        // Redireciona para a página de login se não houver token
        router.push('/login');
        return;
      }

      try {
        // Faz uma requisição ao backend para pegar os dados do usuário
        const response = await fetch('http://localhost:5000/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Adiciona o token ao header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Armazena os dados do usuário no estado
        } else {
          // Redireciona para login se o token estiver inválido ou expirado
          router.push('/login');
        }
      } catch (err) {
        setError('Erro ao buscar dados do usuário');
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-azul60">
      <h1 className="text-4xl font-bold text-azul10">Bem-vindo, {userData?.nome}!</h1>
      <p className="text-azul10 mt-4">Aqui estão seus dados personalizados:</p>
      
      {/* Renderiza as informações privadas do usuário */}
      <div className="bg-branco30 p-4 rounded-3xl shadow-lg w-full max-w-xl mt-6">
        <p><strong>Email:</strong> {userData?.email}</p>
        {/* Adicione outros dados que você queira mostrar */}
      </div>
    </div>
  );
};

export default MainPage;

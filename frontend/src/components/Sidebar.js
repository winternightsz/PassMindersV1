"use client";
import { useEffect, useState } from "react";
import { getFolders } from "@/app/services/api"; // Função que alterna entre MockAPI e backend real

const Sidebar = ({ onSelectFolder, onCreateFolder }) => {
  const [folders, setFolders] = useState([]);

  // Buscar pastas no backend ou MockAPI
  useEffect(() => {
    getFolders()
      .then((response) => {
        setFolders(response.data);
      })
      .catch((error) => console.error("Erro ao buscar pastas:", error));
  }, []);

  return (
    <div className="w-64 h-full bg-gray-50 flex flex-col justify-between p-6">
      {/* Logo e Nome do Projeto */}
      <div className="flex flex-col items-center mb-8">
        <img src="/imagensHome/logoEscudo.png" alt="Logo" className="w-20 h-20 mb-2" />
        <h1 className="text-3xl font-bold text-azul10">Pass<span className="text-azul60">Minders</span></h1>
      
      </div>

      {/* Informações do usuário */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-azul10 rounded-full mb-2"></div>{" "}
        {/* Imagem do usuário */}
        <p className="text-lg font-bold text-azul10">pessoa9username</p>{" "}
        {/* Username */}
      </div>

      {/* Lista de pastas */}
      <div className="flex-grow  mb-8 flex flex-col">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="text-azul10 cursor-pointer mb-4"
            onClick={() => onSelectFolder(folder)}
          >
            &gt; {folder.nome}
          </div>
        ))}
        <button
          onClick={onCreateFolder}
          className="text-azul10 text-4xl "
        >
          +
        </button>{" "}
      </div>
      

      {/* Botão de adicionar pastas */}
      <div className="flex flex-col items-center">
        
        {/* Botão "+" para adicionar pastas */}
        <a href="/logout" className="text-azul10 font-bold text-sm">
          Sair
        </a>{" "}
        {/* Botão de logout */}
      </div>
    </div>
  );
};

export default Sidebar;

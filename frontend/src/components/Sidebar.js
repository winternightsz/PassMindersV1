"use client";
import { useEffect, useState } from "react";
import { getFolders } from "@/app/services/api"; // Função que busca pastas no backend

const Sidebar = ({ folders, onSelectFolder, onCreateFolder, onBack }) => {
  



  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-50 flex flex-col justify-between p-6 shadow-md z-50">
      {/* Logo e Nome do Projeto */}
      <div className="flex flex-col items-center mb-8">
        <img onClick={onBack} src="/imagensHome/logoEscudo.png" alt="Logo" className="w-20 h-20 mb-2 cursor-pointer" />
        <h1 className="text-3xl font-bold text-azul10">
          Pass<span className="text-azul60">Minders</span>
        </h1>
      </div>

      {/* Informações do usuário */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-azul10 rounded-full mb-2"></div>
        <p className="text-lg font-bold text-azul10">pessoa9username</p>
      </div>

      {/* Lista de pastas */}
      <div className="flex-grow mb-8 flex flex-col">
        {folders.length > 0 ? (
          folders.map((folder) => (
            <div
              key={folder.id}
              className="text-azul10 cursor-pointer mb-4"
              onClick={() => onSelectFolder(folder)}
            >
              &gt; {folder.nome}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma pasta encontrada.</p>
        )}
        <button
          onClick={onCreateFolder}
          className="text-azul10 text-4xl mt-4"
        >
          +
        </button>
      </div>

      {/* Botão de logout */}
      <div className="flex flex-col items-center">
        <a href="/login" className="text-azul10 font-bold text-sm">
          Sair
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
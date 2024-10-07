"use client";
import { useState } from 'react';
import { suggestions } from '@/app/data/sugestoesDados'; // Vamos assumir que existe uma lista de sugestões.

const CreateFolder = ({ onCreate }) => {
  const [folderName, setFolderName] = useState('');
  const [customAccounts, setCustomAccounts] = useState([]);
  const [accountName, setAccountName] = useState('');
  const [accountDetails, setAccountDetails] = useState({ email: '', senha: '' });

  // Adiciona uma conta personalizada à lista
  const handleAddCustomAccount = () => {
    if (accountName) {
      setCustomAccounts([...customAccounts, { name: accountName, details: accountDetails }]);
      setAccountName('');
      setAccountDetails({ email: '', senha: '' });
    }
  };

  // Cria a pasta com todas as contas (sugeridas + personalizadas)
  const handleSubmit = () => {
    if (folderName.trim()) {
      const data = {
        folderName,
        accounts: customAccounts,
        // Aqui também seriam adicionadas as sugestões selecionadas.
      };
      onCreate(data);
      setFolderName('');
      setCustomAccounts([]);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <h2 className="text-3xl text-gray-700 mb-4">Criar Nova Pasta</h2>
      <input
        type="text"
        placeholder="Nome da pasta"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      
      {/* Formulário para adicionar conta personalizada */}
      <div className="mb-8">
        <h3 className="text-xl mb-4">Adicionar Conta Personalizada</h3>
        <input
          type="text"
          placeholder="Nome da conta"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Email"
          value={accountDetails.email}
          onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={accountDetails.senha}
          onChange={(e) => setAccountDetails({ ...accountDetails, senha: e.target.value })}
          className="border p-2 w-full mb-4"
        />
        <button onClick={handleAddCustomAccount} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Adicionar
        </button>
      </div>
      
      {/* Sugestões de contas */}
      <div className="mb-8">
        <h3 className="text-xl mb-4">Sugestões</h3>
        <div className="grid grid-cols-3 gap-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.name} className="bg-gray-100 p-4 rounded-lg text-center">
              <img src={suggestion.logo} alt={suggestion.name} className="w-12 h-12 mx-auto mb-2" />
              <p>{suggestion.name}</p>
              <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mt-2">Adicionar</button>
            </div>
          ))}
        </div>
      </div>
      
      <button onClick={handleSubmit} className="bg-green-500 text-white px-6 py-3 rounded-lg w-full mt-4">
        Criar
      </button>
    </div>
  );
};

export default CreateFolder;

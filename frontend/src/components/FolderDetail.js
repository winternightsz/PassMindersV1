"use client";
import { useEffect, useState } from 'react';
import api from '@/app/services/api';
import { getAccounts, createAccount } from '@/app/services/api'; // Certifique-se de incluir getAccounts


const FolderDetail = ({ folder }) => {
  const [accounts, setAccounts] = useState([]);
  const [addingAccount, setAddingAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({ name: '', email: '', senha: '', telefone: '' });

  useEffect(() => {
    // Buscar contas do "backend"
    getAccounts(folder.id)
      .then(response => setAccounts(response.data))
      .catch(error => console.error('Erro ao buscar contas:', error));
  }, [folder.id]);

  const handleAddAccount = () => {
    // Adicionar nova conta no "backend"
    createAccount(folder.id, newAccount)
      .then(response => {
        setAccounts([...accounts, response.data]);
        setAddingAccount(false);
        setNewAccount({ name: '', email: '', senha: '', telefone: '' });
      })
      .catch(error => console.error('Erro ao adicionar conta:', error));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <h2 className="text-3xl text-gray-700 mb-4">{folder.name}</h2>
      
      {accounts.length > 0 ? (
        <div className="mb-8">
          <h3 className="text-xl mb-4">Contas</h3>
          <div>
            {accounts.map(account => (
              <div key={account.id} className="bg-gray-100 p-4 rounded-lg mb-2">
                <p className="text-lg"><strong>Nome:</strong> {account.name}</p>
                <p><strong>Email:</strong> {account.email}</p>
                <p><strong>Telefone:</strong> {account.telefone}</p>
                <p><strong>Senha:</strong> {account.senha}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button onClick={() => setAddingAccount(true)} className="text-blue-500 text-4xl">+</button>
        </div>
      )}

      {addingAccount && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Adicionar Nova Conta</h3>
          <input
            type="text"
            placeholder="Nome"
            value={newAccount.name}
            onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Email"
            value={newAccount.email}
            onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Telefone"
            value={newAccount.telefone}
            onChange={(e) => setNewAccount({ ...newAccount, telefone: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="password"
            placeholder="Senha"
            value={newAccount.senha}
            onChange={(e) => setNewAccount({ ...newAccount, senha: e.target.value })}
            className="border p-2 w-full mb-4"
          />
          <button onClick={handleAddAccount} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
            Adicionar Conta
            </button>
          <button onClick={() => setAddingAccount(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default FolderDetail;

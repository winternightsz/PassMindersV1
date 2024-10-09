"use client";
import { useEffect, useState } from 'react';
import { getAccounts, createAccount } from '@/app/services/api';

const FolderDetail = ({ folder, onBack }) => {
  const [accounts, setAccounts] = useState([]);
  const [addingAccount, setAddingAccount] = useState(false);
  const [newAccountFields, setNewAccountFields] = useState([]); // Campos dinâmicos
  const [customFieldModalOpen, setCustomFieldModalOpen] = useState(false);
  const [customFieldName, setCustomFieldName] = useState('');

  useEffect(() => {
    getAccounts(folder.id)
      .then(response => setAccounts(response.data))
      .catch(error => console.error('Erro ao buscar contas:', error));
  }, [folder.id]);

  const addNewField = (fieldType) => {
    if (fieldType === 'outro') {
      setCustomFieldModalOpen(true);
    } else {
      setNewAccountFields([...newAccountFields, { label: fieldType, value: '' }]);
    }
  };

  const handleCustomFieldSubmit = () => {
    setNewAccountFields([...newAccountFields, { label: customFieldName, value: '' }]);
    setCustomFieldName('');
    setCustomFieldModalOpen(false);
  };

  const handleInputChange = (index, value) => {
    const updatedFields = [...newAccountFields];
    updatedFields[index].value = value;
    setNewAccountFields(updatedFields);
  };

  const handleAddAccount = () => {
    const accountData = newAccountFields.reduce((acc, field) => {
      acc[field.label] = field.value;
      return acc;
    }, {});
    
    createAccount(folder.id, accountData)
      .then(response => {
        setAccounts([...accounts, response.data]);
        setAddingAccount(false);
        setNewAccountFields([]);
      })
      .catch(error => console.error('Erro ao adicionar conta:', error));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <h2 className="text-3xl text-gray-700 mb-4">{folder.name}</h2>

      {accounts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl mb-4">Contas</h3>
          <div>
            {accounts.map(account => (
              <div key={account.id} className="bg-gray-100 p-4 rounded-lg mb-2">
                {Object.entries(account).map(([key, value]) => (
                  <p key={key}><strong>{key}:</strong> {value}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sempre mostra o botão para adicionar nova conta */}
      <div className="flex justify-center items-center">
        <button onClick={() => setAddingAccount(true)} className="text-blue-500 text-4xl">+</button>
      </div>

      {addingAccount && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Adicionar Nova Conta</h3>

          {newAccountFields.map((field, index) => (
            <div key={index} className="mb-2">
              <label>{field.label}</label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="border p-2 w-full"
              />
            </div>
          ))}

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => addNewField('email')}
          >
            Adicionar Email
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => addNewField('nome')}
          >
            Adicionar Nome
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => addNewField('senha')}
          >
            Adicionar Senha
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => addNewField('outro')}
          >
            Outro
          </button>

          <button onClick={handleAddAccount} className="bg-green-500 text-white px-6 py-3 rounded-lg w-full mt-4">
            Salvar Conta
          </button>

          <button onClick={() => setAddingAccount(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mt-4">
            Cancelar
          </button>
        </div>
      )}

      {/* Modal para campo personalizado */}
      {customFieldModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl mb-4">Nome do tipo de informação</h3>
            <input
              type="text"
              value={customFieldName}
              onChange={(e) => setCustomFieldName(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <button
              onClick={handleCustomFieldSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg w-full mb-2"
            >
              Adicionar
            </button>
            <button
              onClick={() => setCustomFieldModalOpen(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <button onClick={onBack} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
          Voltar para Main Page
        </button>
      </div>
    </div>
  );
};

export default FolderDetail;

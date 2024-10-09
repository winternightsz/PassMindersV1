"use client";
import { useState } from 'react';
import { createFolder } from '@/app/services/api'; // Importar função do mockApi
import { suggestions } from '@/app/data/sugestoesDados';

const CreateFolder = ({ onCreate }) => {
  const [name, setName] = useState(''); // Corrigido para 'name' para ser consistente com a MainPage e FolderDetail
  const [customAccounts, setCustomAccounts] = useState([]);
  const [newAccountFields, setNewAccountFields] = useState([]); // Campos dinâmicos
  const [customFieldModalOpen, setCustomFieldModalOpen] = useState(false);
  const [customFieldName, setCustomFieldName] = useState(''); // Nome do campo personalizado
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagens de erro

  // Função para adicionar um campo de informação dinâmico
  const addNewField = (fieldType) => {
    if (fieldType === 'outro') {
      setCustomFieldModalOpen(true); // Abre o modal para campo personalizado
    } else {
      setNewAccountFields([...newAccountFields, { label: fieldType, value: '' }]);
    }
  };

  // Função para o modal do campo personalizado
  const handleCustomFieldSubmit = () => {
    setNewAccountFields([...newAccountFields, { label: customFieldName, value: '' }]);
    setCustomFieldName(''); // Limpa o campo
    setCustomFieldModalOpen(false); // Fecha o modal
  };

  // Atualiza o valor dos campos dinâmicos
  const handleInputChange = (index, value) => {
    const updatedFields = [...newAccountFields];
    updatedFields[index].value = value;
    setNewAccountFields(updatedFields);
  };

  // Adiciona conta personalizada aos campos dinâmicos
  const handleAddCustomAccount = () => {
    const accountData = newAccountFields.reduce((acc, field) => {
      acc[field.label] = field.value;
      return acc;
    }, {});

    setCustomAccounts([...customAccounts, accountData]);
    setNewAccountFields([]); // Reseta os campos de conta personalizada
  };

  // Envia os dados para criar a pasta no mock API
  const handleSubmit = async () => {
    if (!name.trim()) {
      setErrorMessage('O nome da pasta não pode ser vazio.'); // Exibir mensagem de erro
      return;
    }

    const data = {
      name, // Usando 'name' para ser consistente com a MainPage e FolderDetail
      accounts: customAccounts.length > 0 ? customAccounts : [], // Permitir que a pasta seja criada sem contas
    };

    try {
      const response = await createFolder(data); // Chama a função do mockApi para criar a pasta
      console.log('Pasta criada com sucesso:', data);
      onCreate(response.data); // Chama a função de callback para redirecionar para FolderDetail
      setName(''); // Limpa o campo
      setCustomAccounts([]);
      setErrorMessage(''); // Limpa a mensagem de erro após o sucesso
    } catch (error) {
      console.error('Erro ao criar a pasta:', error);
    }
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
      <h2 className="text-3xl text-gray-700 mb-4">Criar Nova Pasta</h2>

      {/* Exibir mensagem de erro se o nome da pasta estiver vazio */}
      {errorMessage && (
        <div className="text-red-500 mb-4">
          {errorMessage}
        </div>
      )}

      <input
        type="text"
        placeholder="Nome da pasta"
        value={name}
        onChange={(e) => setName(e.target.value)} // Corrigido para 'setName' para ser consistente
        className="border p-2 w-full mb-4"
      />

      {/* Formulário para adicionar campos dinâmicos */}
      <div className="mb-8">
        <h3 className="text-xl mb-4">Adicionar Conta Personalizada</h3>

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

        {/* Botões para adicionar tipos de dados */}
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

        {/* Botão para adicionar a conta personalizada */}
        <button onClick={handleAddCustomAccount} className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4">
          Adicionar Conta
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

      {/* Modal para campo personalizado */}
      {customFieldModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
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

      {/* Botão para submeter a criação da pasta */}
      <button onClick={handleSubmit} className="bg-green-500 text-white px-6 py-3 rounded-lg w-full mt-4">
        Criar
      </button>
    </div>
  );
};

export default CreateFolder;

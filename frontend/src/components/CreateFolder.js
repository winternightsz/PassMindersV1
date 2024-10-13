"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const CreateFolder = () => {
  const [nome, setName] = useState(""); // Nome da pasta
  const [customAccounts, setCustomAccounts] = useState([]); // Contas personalizadas
  const [newAccountFields, setNewAccountFields] = useState([]); // Campos dinâmicos para nova conta
  const [customFieldModalOpen, setCustomFieldModalOpen] = useState(false); // Modal para campo personalizado
  const [fieldOptionModalOpen, setFieldOptionModalOpen] = useState(false); // Modal para escolher tipo de informação
  const [customFieldName, setCustomFieldName] = useState(""); // Nome do campo personalizado
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o envio duplo
  const router = useRouter(); // Para redirecionar após a criação da pasta

  // Função para adicionar um campo de informação dinâmico
  const addNewField = (fieldType) => {
    if (fieldType === "outro") {
      setCustomFieldModalOpen(true); // Abre o modal para campo personalizado
    } else {
      setNewAccountFields([...newAccountFields, { label: fieldType, value: "" }]);
      setFieldOptionModalOpen(false); // Fecha o modal de seleção de campo
    }
  };

  // Função para o modal do campo personalizado
  const handleCustomFieldSubmit = () => {
    setNewAccountFields([...newAccountFields, { label: customFieldName, value: "" }]);
    setCustomFieldName(""); // Limpa o campo
    setCustomFieldModalOpen(false); // Fecha o modal
  };

  // Atualiza o valor dos campos dinâmicos
  const handleInputChange = (index, value) => {
    const updatedFields = [...newAccountFields];
    updatedFields[index].value = value;
    setNewAccountFields(updatedFields);
  };

  // Adiciona conta personalizada
  const handleAddCustomAccount = () => {
    if (newAccountFields.length > 0) {
      const accountData = {
        dados: newAccountFields, // Usa "dados" para enviar os pares label e value
      };
      setCustomAccounts([...customAccounts, accountData]);
      setNewAccountFields([]); // Reseta os campos
    } else {
      setErrorMessage("Adicione pelo menos um campo antes de adicionar a conta.");
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!nome.trim()) {
      setErrorMessage("O nome da pasta não pode ser vazio.");
      setIsSubmitting(false);
      return;
    }

    const data = {
      nome: nome,
      accounts: customAccounts.length > 0 ? customAccounts.map((account) => ({ dados: account.dados })) : [{ dados: [{ label: 'default', value: '' }] }],
    };

    console.log("Dados enviados:", data);

    try {
      const response = await axios.post("http://localhost:5000/createFolder", data);

      if (response.status === 201) {
        alert("Pasta criada com sucesso!");
        router.push('/mainp');
      } else {
        console.error('Erro ao criar a pasta:', response.data);
        setErrorMessage('Erro ao criar a pasta. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      setErrorMessage('Erro ao criar a pasta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-transparent p-8 rounded-lg w-full max-w-4xl">
      {errorMessage && (
        <div className="text-red-500 mb-4">
          {errorMessage}
        </div>
      )}
      {/* Input para nome da pasta */}
      <div className="relative">
        <input
          type="text"
          placeholder="Nome da pasta"
          value={nome}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border-none text-4xl w-full !focus:outline-none text-gray-700"
        />
        <div className="absolute bottom-1 left-0 w-full h-0.5 bg-azul10"></div>
      </div>
      {/* Campos dinâmicos para contas personalizadas */}
      <div className="mb-8">
        <h3 className="text-2xl text-branco30 mb-4">Adicionar Conta Personalizada</h3>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          {newAccountFields.map((field, index) => (
            <div key={index} className="flex mb-2">
              <label className="text-gray-600 mr-2">{field.label}</label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="border p-2 w-full rounded-md"
              />
            </div>
          ))}

          {/* Botão para abrir o modal de seleção de campo */}
          <div className="flex items-center">
            <button
              className="bg-azul10 text-white p-2 px-4 rounded-full mr-4"
              onClick={() => setFieldOptionModalOpen(true)} // Abre o primeiro modal
            >
              +
            </button>
          </div>

          {/* Botão de adicionar conta */}
          <button
            onClick={handleAddCustomAccount}
            className="bg-azul10 text-white px-4 py-2 rounded-lg mt-4"
          >
            Adicionar Conta
          </button>
        </div>
      </div>

      {/* Sugestões de contas */}
      <div className="mb-8">
        <div className="relative">
          <h3 className="text-4xl text-branco30 mb-4">Sugestões</h3>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-azul10"></div>
        </div>
        {/* <div className="grid grid-cols-3 gap-4">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.name}
              className="bg-gray-100 p-4 rounded-lg text-center shadow-md"
            >
              <img
                src={suggestion.logo}
                alt={suggestion.name}
                className="w-16 h-16 mx-auto mb-2"
              />
              <p className="text-lg font-thin text-azul10 mb-2">{suggestion.name}</p>
              <button className="bg-azul10 text-white px-4 py-1 rounded-lg mt-2">
                Adicionar
              </button>
            </div>
          ))}
        </div> */}
      </div>

      {/* Primeiro modal: Seleção de tipo de campo */}
      {fieldOptionModalOpen && (
        <div className="fixed inset-0 bg-azul10 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl mb-4">Selecione o tipo de informação</h3>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => addNewField("email")}
                className="bg-azul10 text-white px-4 py-2 rounded-lg"
              >
                Email
              </button>
              <button
                onClick={() => addNewField("nome")}
                className="bg-azul10 text-white px-4 py-2 rounded-lg"
              >
                Nome
              </button>
              <button
                onClick={() => addNewField("senha")}
                className="bg-azul10 text-white px-4 py-2 rounded-lg"
              >
                Senha
              </button>
              <button
                onClick={() => addNewField("outro")}
                className="bg-azul10 text-white px-4 py-2 rounded-lg"
              >
                Outro
              </button>
            </div>
            <button
              onClick={() => setFieldOptionModalOpen(false)}
              className="mt-4 text-gray-600 underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Segundo modal: Campo personalizado */}
      {customFieldModalOpen && (
        <div className="fixed inset-0 bg-azul10 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl mb-4">Campo Personalizado</h3>
            <input
              type="text"
              value={customFieldName}
              onChange={(e) => setCustomFieldName(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Nome do campo"
            />
            <button
              onClick={handleCustomFieldSubmit}
              className="bg-azul10 text-white px-4 py-2 rounded-lg"
            >
              Adicionar
            </button>
            <button
              onClick={() => setCustomFieldModalOpen(false)}
              className="mt-4 text-gray-600 underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Botão para criar a pasta */}
      <button
        onClick={handleSubmit}
        className="bg-azul10 text-white px-4 py-2 rounded-lg"
      >
        Criar Pasta
      </button>
    </div>
  );
};

export default CreateFolder;

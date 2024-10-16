"use client";
import { useState, useEffect } from "react";
import { createFolder } from "@/app/services/api";
import { isValidEmail } from "@/app/utils/validations";
import { useRouter } from "next/navigation";

const CreateFolder = ({ onCreate, onBack }) => {
  const [nome, setName] = useState(""); // Nome da pasta
  const [customAccounts, setCustomAccounts] = useState([]); // Contas personalizadas
  const [newAccountFields, setNewAccountFields] = useState([]); // Campos dinâmicos para nova conta
  const [titulo, setTitulo] = useState(""); // Campo obrigatório para o nome da conta
  const [customFieldModalOpen, setCustomFieldModalOpen] = useState(false); // Modal para campo personalizado
  const [fieldOptionModalOpen, setFieldOptionModalOpen] = useState(false); // Modal para escolher tipo de informação
  const [customFieldName, setCustomFieldName] = useState(""); // Nome do campo personalizado
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o envio
  const [isCooldown, setIsCooldown] = useState(false); // Estado para debounce
  const router = useRouter(); // Para redirecionar após a criação da pasta

  // Função para adicionar um campo de informação dinâmico
  const addNewField = (fieldType) => {
    if (fieldType === "outro") {
      setCustomFieldModalOpen(true); // Abre o modal para campo personalizado
    } else {
      setNewAccountFields([
        ...newAccountFields,
        { label: fieldType, value: "" },
      ]);
      setFieldOptionModalOpen(false); // Fecha o modal de seleção de campo
    }
  };

  // Função para o modal do campo personalizado
  const handleCustomFieldSubmit = () => {
    setNewAccountFields([
      ...newAccountFields,
      { label: customFieldName, value: "" },
    ]);
    setCustomFieldName(""); // Limpa o campo
    setFieldOptionModalOpen(false); // Fecha o primeiro modal
    setCustomFieldModalOpen(false); // Fecha o segundo modal
  };

  // Atualiza o valor dos campos dinâmicos
  const handleInputChange = (index, value) => {
    const updatedFields = [...newAccountFields];
    updatedFields[index].value = value;
    setNewAccountFields(updatedFields);
  };

  // aqui que adiciona conta personalizada na pasta 
  const handleAddCustomAccount = () => {
    const emailField = newAccountFields.find(field => field.label === "email");
  
  // Verificar se o campo de email existe e é válido
  if (emailField && !isValidEmail(emailField.value)) {
    setErrorMessage("Por favor, insira um email válido.");
    return;
  }

    if (newAccountFields.length > 0 && titulo.trim()) {
      const accountData = {
        titulo: titulo, // Nome da conta obrigatório
        foto_referencia: "/imagensHome/logoEscudo.png", // Imagem da conta
        dados: newAccountFields, // Usa "dados" para enviar os pares label e value
      };
      setCustomAccounts([...customAccounts, accountData]);
      setNewAccountFields([]); // Reseta os campos
      setTitulo(""); // Limpa o título
    } else {
      setErrorMessage("Preencha o título da conta e adicione pelo menos um campo.");
    }
  };

  // Envia a nova pasta e as contas personalizadas para o backend
  const handleSubmit = async () => {
    if (isSubmitting || isCooldown) return; // Verifica se já está enviando ou se está no período de debounce
    setIsSubmitting(true);

    if (!nome.trim()) {
      setErrorMessage("O nome da pasta não pode ser vazio.");
      setIsSubmitting(false);
      return;
    }

    // Verifica se as contas personalizadas estão corretas
    //if (customAccounts.length === 0) {
    //  setErrorMessage("Adicione pelo menos uma conta personalizada.");
    //  setIsSubmitting(false);
    //  return;
    //}

    const data = {
      nome: nome,
      accounts: customAccounts, // Envia todas as contas personalizadas com seus dados
    };

    console.log("Dados enviados:", data);

    try {
      const response = await createFolder(data); // Chamada à API para criar a pasta
      onCreate(response.data); // Atualiza a MainPage com a nova pasta

      // Limpa os campos após a criação bem-sucedida
      setName("");
      setCustomAccounts([]);
      setErrorMessage("");
    } catch (err) {
      console.error("Erro na requisição:", err);
      setErrorMessage("Conexão com o servidor falhou. Tente novamente.");
    } finally {
      setIsSubmitting(false);
      setIsCooldown(true); // Ativa o período de debounce

      // Define um intervalo para desativar o debounce após 2 segundos
      setTimeout(() => {
        setIsCooldown(false);
      }, 2000); // Tempo de debounce de 2 segundos
    }
  };

  return (
    <div className="bg-transparent p-8 rounded-lg w-full max-w-4xl">
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      
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
          
          {/* Campo para o título da conta */}
          <div className="mb-2">
            <label>Título da Conta</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border p-2 w-full rounded-md"
              placeholder="Digite o título da conta"
            />
          </div>

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

          <button
            onClick={handleAddCustomAccount}
            className="bg-azul10 text-white px-4 py-2 rounded-lg mt-4"
          >
            Adicionar Conta
          </button>
        </div>
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
        disabled={isSubmitting || isCooldown} // Previne múltiplos cliques
        className={`bg-azul10 text-white px-6 py-3 rounded-lg w-full mt-4 ${isSubmitting || isCooldown ? "opacity-50" : ""}`}
      >
        {isSubmitting ? "Criando..." : "Criar Pasta"}
      </button>

      <div className="mt-8">
        <button
          onClick={onBack}
          className="bg-branco30 text-gray-700 px-4 py-2 rounded-lg"
        >
          Voltar para Main Page
        </button>
      </div>

    </div>
  );
};

export default CreateFolder;
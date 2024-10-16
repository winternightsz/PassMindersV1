"use client";
import { useState, useEffect } from "react";
import { createFolder } from "@/app/services/api";
import { isValidEmail } from "@/app/utils/validations";
import { useRouter } from "next/navigation";

const CreateFolder = ({ onCreate, onBack }) => {
  const [nome, setName] = useState(""); // nome da pasta
  const [customAccounts, setCustomAccounts] = useState([]); // pras contas personalizadas
  const [newAccountFields, setNewAccountFields] = useState([]); // campos dinamicos para nova conta
  const [titulo, setTitulo] = useState(""); // campo obrigatorio pro nome da conta
  const [customFieldModalOpen, setCustomFieldModalOpen] = useState(false); // modal para campo personalizado
  const [fieldOptionModalOpen, setFieldOptionModalOpen] = useState(false); // modal para escolher tipo de informacao
  const [customFieldName, setCustomFieldName] = useState(""); // nome do campo personalizado
  const [errorMessage, setErrorMessage] = useState(""); // mensagem de erro
  const [isSubmitting, setIsSubmitting] = useState(false); // estado para controlar o envio pra nao duplicar
  const [isCooldown, setIsCooldown] = useState(false); // estado para debounce pra tambem nao duplicar
  const router = useRouter(); 

  // funcao pra adicionar um campo de informacao dinamico
  const addNewField = (fieldType) => {
    if (fieldType === "Outro") {
      setCustomFieldModalOpen(true); // abre o modal pro campo personalizado
    } else {
      setNewAccountFields([
        ...newAccountFields,
        { label: fieldType, value: "" },
      ]);
      setFieldOptionModalOpen(false); // fecha o modal de seleção de campo
    }
  };

  // funcao pro modal do campo personalizado
  const handleCustomFieldSubmit = () => {
    setNewAccountFields([
      ...newAccountFields,
      { label: customFieldName, value: "" },
    ]);
    setCustomFieldName(""); 
    setFieldOptionModalOpen(false); // fecha o primeiro modal
    setCustomFieldModalOpen(false); // fecha o segundo modal
  };

  // atualiza o field dos campos dinamicos
  const handleInputChange = (index, value) => {
    const updatedFields = [...newAccountFields];
    updatedFields[index].value = value;
    setNewAccountFields(updatedFields);
  };

  // aqui que adiciona conta personalizada na pasta 
  const handleAddCustomAccount = () => {
  const emailField = newAccountFields.find(field => field.label === "Email");
  
  // verifica se o campo de email existe e valido
  if (emailField && !isValidEmail(emailField.value)) {
    setErrorMessage("Por favor, insira um email válido.");
    return;
  }

    if (newAccountFields.length > 0 && titulo.trim()) {
      const accountData = {
        titulo: titulo, // nome da conta obrigatorio
        foto_referencia: "/imagensHome/logoEscudo.png", // imagem da conta ta como o escudo 
        dados: newAccountFields, // usa "dados" para enviar os pares label e value que precisa no itemConta
      };
      setCustomAccounts([...customAccounts, accountData]);
      setNewAccountFields([]); // reseta os campos
      setTitulo(""); 
      setErrorMessage(""); 
    } else {
      setErrorMessage("Preencha o título da conta e adicione pelo menos um campo.");
    }
  };

  // envia a nova pasta e as contas personalizadas pro backend
  const handleSubmit = async () => {
    if (isSubmitting || isCooldown) return; // verifica se ja esta enviando ou se esta no periodo de debounce
    setIsSubmitting(true);

    if (!nome.trim()) {
      setErrorMessage("O nome da pasta não pode ser vazio.");
      setIsSubmitting(false);
      return;
    }

    // verifica se as contas personalizadas estao corretas
    // tirei porque tava dando erro
    //if (customAccounts.length === 0) {
    //  setErrorMessage("Adicione pelo menos uma conta personalizada.");
    //  setIsSubmitting(false);
    //  return;
    //}

    const data = {
      nome: nome,
      accounts: customAccounts, // envia todas as contas com seus dados do itemConta
    };

    console.log("Dados enviados:", data);

    try {
      const response = await createFolder(data); // chamada para a API para criar a pasta
      onCreate(response.data); // atualiza a MainPage com a nova pasta

      // limpa os campos depois do create dar certo
      setName("");
      setCustomAccounts([]);
      setErrorMessage("");
    } catch (err) {
      console.error("Erro na requisição:", err);
      setErrorMessage("Conexão com o servidor falhou. Tente novamente.");
    } finally {
      setIsSubmitting(false);
      setIsCooldown(true); // ativa o periodo de debounce

      // define um intervalo para desativar o debounce depois de 2 segundos
      setTimeout(() => {
        setIsCooldown(false);
      }, 2000); // tempo do debounce de 2 segundos
    }
  };

  return (
    <div className="bg-transparent p-8 rounded-lg w-full max-w-4xl">
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      
      {/* Input pro nome da pasta com uma linha em baixo*/}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Nome da pasta"
          value={nome}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border-none text-4xl w-full !focus:outline-none text-gray-700"
        />
        <div className="absolute bottom-1 left-0 w-full h-0.5 bg-azul10"></div>
      </div>

      {/* campos dinamicos para as contas personalizadas */}
      <div className="mb-8">        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl text-azul10 mb-4">Adicionar Conta</h3>  
          {/* campo pro titulo da conta */}
          <div className="mb-2">
            <label className="text-azul10 mr-2">Título da Conta</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border p-2 w-full rounded-md"
              placeholder="Digite o título da conta"
            />
          </div>

          {newAccountFields.map((field, index) => (
            <div key={index} className="flex flex-col mb-2">
              <label className="text-azul10 mr-2">{field.label}</label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="border  p-2 w-full rounded-md"
              />
            </div>
          ))}

          {/* botao que abre o modal de selecao de label (informacao) */}
          <div className="flex items-center">
            <button
              className="bg-azul10 text-white p-2 px-4 rounded-full mr-4"
              onClick={() => setFieldOptionModalOpen(true)} // abre o primeiro modal
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
           {/* primeiro modal: selecao do tipo de label */}
      {fieldOptionModalOpen && (
        <div className="fixed inset-0 bg-azul10 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl mb-4">Selecione o tipo de informação</h3>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => addNewField("Email")}
                className="bg-azul10 text-white px-4 py-2 rounded-lg"
              >
                Email
              </button>
              <button
                onClick={() => addNewField("Senha")}
                className="bg-azul10 text-white px-4 py-2 rounded-lg"
              >
                Senha
              </button>
              <button
                onClick={() => addNewField("Outro")}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
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

      {/* segundo modal: label personalizado para colocar o value */}
      {customFieldModalOpen && (
        <div className="fixed inset-0 bg-azul10 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl mb-4">Nome do tipo de informação</h3>
            <input
              type="text"
              value={customFieldName}
              onChange={(e) => setCustomFieldName(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Nome da informação"
            />
            <div className="flex flex-row justify-between items-center space-x-4">
            <button
              onClick={handleCustomFieldSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
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
        </div>
      )}
      {/* botao para criar a pasta */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || isCooldown} // desabilita o botao pra nao duplicar o envio
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
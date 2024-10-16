"use client";
import { useEffect, useState } from "react";
import { isValidEmail } from "@/app/utils/validations";
import { getAccounts, createAccount } from "@/app/services/api";

const FolderDetail = ({ folder, onBack, updateFolders }) => {
  const [accounts, setAccounts] = useState([]);
  const [addingAccount, setAddingAccount] = useState(false); // pra nao duplicar
  const [newAccountFields, setNewAccountFields] = useState([]); //label  
  const [titulo, setTitulo] = useState(""); // titulo conta
  const [errorMessage, setErrorMessage] = useState("");
  const [customFieldModalOpen, setCustomFieldModalOpen] = useState(false); 
  const [fieldOptionModalOpen, setFieldOptionModalOpen] = useState(false); 
  const [customFieldName, setCustomFieldName] = useState("");

  useEffect(() => {
    console.log("Carregando contas para a pasta:", folder.id);

    getAccounts(folder.id)
      .then((response) => {
        console.log("Contas recebidas:", response.data);
        setAccounts(response.data);
      })
      .catch((error) => console.error("Erro ao buscar contas:", error));
  }, [folder.id]);

  // pra ter os labels dinamicamente
  const addNewField = (fieldType) => {
    if (fieldType === "Outro") {
      setCustomFieldModalOpen(true); 
    } else {
      setNewAccountFields([
        ...newAccountFields,
        { label: fieldType, value: "" },
      ]);
      setFieldOptionModalOpen(false); 
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

  // pra mudar os label dinamicamente
  const handleInputChange = (index, value) => {
    const updatedFields = [...newAccountFields];
    updatedFields[index].value = value;

    setNewAccountFields(updatedFields);
  };

  const handleAddAccount = () => {
    setErrorMessage("");
    if (!titulo.trim()) {
      setErrorMessage("Preencha o título da conta e adicione pelo menos um campo.");
      console.error("O título é obrigatório.");
      return; 
    }

    if (!newAccountFields || newAccountFields.length === 0) {
      console.error("Nenhum dado foi fornecido para a conta.");
      return;
    }

    const emailField = newAccountFields.find(field => field.label === "Email");
    
  if (emailField && !isValidEmail(emailField.value)) {
    setErrorMessage("Por favor, insira um email válido.");
    return;
  }

    // transforma os campos dinamicos em um formato certo pro backend
    const accountData = {
      id_pasta: folder.id, // relaciona a conta a pasta, o folder passa como parametro pro componente
      titulo: titulo, // nome da conta obrigatorio
      foto_referencia: "/imagensHome/logoEscudo.png",
      dados: newAccountFields, // passa "dados" pro itemConta
    };

    console.log("Dados enviados ao backend:", accountData);

    // envie os dados para o backend
    createAccount(accountData)
      .then((response) => {
        // faz uma requisicao para buscar as contas de novo, pra garantir que os dados estao completos e certos
        getAccounts(folder.id)
          .then((updatedResponse) => {
            console.log("Contas atualizadas:", updatedResponse.data); // pra ver oque o backend recebeu
            setAccounts(updatedResponse.data); // atualiza o estado com as contas completas
          })
          .catch((error) => console.error("Erro ao buscar contas atualizadas:", error));
         
           // atualiza as pastas na MainPage depois de adicionar conta
        updateFolders();
        setAddingAccount(false);
        setTitulo(""); 
        setNewAccountFields([]); 
        setErrorMessage("");  
       
      })
      .catch((error) => {
        console.error("Erro ao adicionar conta:", error);
        console.error("Resposta do servidor:", error.response?.data); // log da resposta do erro
      });
  };


  return (
    <div className="bg-transparent p-8 rounded-lg w-full max-w-3xl">
      <h2 className="text-4xl text-azul10 font-bold text-center mb-4">{folder.nome}</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      
      {accounts.length > 0 ? (
        <div className="mb-8">
          <ul>
            {accounts.map((account) => (
              <li key={account.id} className="bg-branco30 p-4 rounded-lg mb-2">
                <h3 className="text-2xl font-bold mb-4">{account.titulo}</h3>
                {Array.isArray(account.dados) && account.dados.length > 0 ? (
                  account.dados.map((item, index) => (
                    <p
                      className="p-2 mb-2 rounded-lg text-gray-500 bg-azul60"
                      key={index}
                    >
                      <strong>{item.rotulo}: </strong> {item.dado}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhum dado disponível</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="bg-branco30 p-4 rounded-lg mb-2 text-gray-500">
          Nenhuma conta adicionada
        </p>
      )}

      <div className="flex justify-center items-center">
        <button
          onClick={() => setAddingAccount(true)}
          className="text-azul10 text-4xl"
        >
          +
        </button>
      </div>

      {addingAccount && (
        <div className="mt-4 bg-branco30 p-4 rounded-lg">
          <h3 className="text-xl text-azul10 mb-2">Adicionar Nova Conta</h3>

          
          <div className="mb-3 space-y-1">
            <label className="text-azul10">Título da Conta </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="p-2 w-full mb-4 rounded-lg text-gray-500"
              placeholder="Digite o nome da conta"
              required
            />
          </div>

          
          {newAccountFields.map((field, index) => (
            <div key={index} className="mb-2 flex flex-col">
              <label className="text-azul10 mr-2">{field.label} </label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="p-2 mb-2 rounded-lg text-gray-500 bg-azul60"
              />
            </div>
          ))}

          <div className="flex items-center">
            <button
              className="bg-azul10 text-white p-2 px-4 rounded-full mr-4"
              onClick={() => setFieldOptionModalOpen(true)} 
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddAccount}
            className="bg-azul10 text-white px-6 py-3 rounded-lg w-full mt-4"
          >
            Salvar Conta
          </button>

          <button
            onClick={() => setAddingAccount(false)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mt-4"
          >
            Cancelar
          </button>
        </div>
      )}

     
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
              className="bg-green-500 text-white px-4 py-2 rounded-lg  mb-2"
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

export default FolderDetail;
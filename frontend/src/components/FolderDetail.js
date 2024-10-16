"use client";
import { useEffect, useState } from "react";
import { isValidEmail } from "@/app/utils/validations";
import { getAccounts, createAccount } from "@/app/services/api";

const FolderDetail = ({ folder, onBack, updateFolders }) => {
  const [accounts, setAccounts] = useState([]);
  const [addingAccount, setAddingAccount] = useState(false);
  const [newAccountFields, setNewAccountFields] = useState([]); // Campos dinâmicos
  const [titulo, setTitulo] = useState(""); // Campo obrigatório para o nome da conta
  const [customFieldModalOpen, setCustomFieldModalOpen] = useState(false); // Modal para campo personalizado
  const [fieldOptionModalOpen, setFieldOptionModalOpen] = useState(false); // Modal para escolher tipo de informação
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

  const handleCustomFieldSubmit = () => {
    setNewAccountFields([
      ...newAccountFields,
      { label: customFieldName, value: "" },
    ]);
    setCustomFieldName(""); // Limpa o campo
    setFieldOptionModalOpen(false); // Fecha o primeiro modal
    setCustomFieldModalOpen(false); // Fecha o segundo modal
  };

  const handleInputChange = (index, value) => {
    const updatedFields = [...newAccountFields];
    updatedFields[index].value = value;

    if (updatedFields[index].label === "email" && !isValidEmail(value)) {
      setErrorMessage("Formato de email inválido.");
    } else {
      setErrorMessage(""); // Limpa a mensagem de erro
    }

    setNewAccountFields(updatedFields);
  };

  const handleAddAccount = () => {
    if (!titulo.trim()) {
      console.error("O título é obrigatório.");
      return; // Impede de prosseguir se o título estiver vazio
    }

    if (!newAccountFields || newAccountFields.length === 0) {
      console.error("Nenhum dado foi fornecido para a conta.");
      return;
    }

    // Transforme os campos dinâmicos em um formato adequado para o backend
    const accountData = {
      id_pasta: folder.id, // Relaciona a conta à pasta
      titulo: titulo, // Nome da conta obrigatório
      foto_referencia: "/imagensHome/logoEscudo.png",
      dados: newAccountFields, // Passa os campos como "dados"
    };

    console.log("Dados enviados ao backend:", accountData);

    // Envie os dados para o backend
    createAccount(accountData)
      .then((response) => {
        // Faz uma requisição para buscar as contas novamente, garantindo que os dados estejam completos
        getAccounts(folder.id)
          .then((updatedResponse) => {
            setAccounts(updatedResponse.data); // Atualiza o estado com as contas completas
          })
          .catch((error) => console.error("Erro ao buscar contas atualizadas:", error));
         
           // Atualiza as pastas na MainPage após adicionar conta
        updateFolders();
        setAddingAccount(false);
        setTitulo(""); // Reseta o título após adicionar a conta
        setNewAccountFields([]); // Reseta os campos

       
      })
      .catch((error) => {
        console.error("Erro ao adicionar conta:", error);
        console.error("Resposta do servidor:", error.response?.data); // Log da resposta de erro
      });
  };


  return (
    <div className="bg-transparent p-8 rounded-lg w-full max-w-3xl">
      <h2 className="text-3xl text-branco30 mb-4">{folder.nome}</h2>

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
                      <strong>{item.rotulo}:</strong> {item.dado}
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

          {/* Campo obrigatório para o título */}
          <div className="mb-2">
            <label>Título da Conta</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="p-2 mb-2 rounded-lg text-gray-500 bg-azul60"
              placeholder="Digite o nome da conta"
              required
            />
          </div>

          {/* Campos dinâmicos */}
          {newAccountFields.map((field, index) => (
            <div key={index} className="mb-2">
              <label>{field.label}</label>
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
              onClick={() => setFieldOptionModalOpen(true)} // Abre o modal para selecionar campos
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

      {/* Modal para selecionar tipo de campo */}
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
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para adicionar campo personalizado */}
      {customFieldModalOpen && (
        <div className="fixed inset-0 bg-azul10 bg-opacity-50 flex justify-center items-center">
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
              className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Cancelar
            </button>
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
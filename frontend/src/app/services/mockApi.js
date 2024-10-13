// mockApi.js
import { v4 as uuidv4 } from "uuid";

// Dados simulados
// Dados simulados
let folders = [
  {
    id: uuidv4(),
    nome: "Redes Sociais",
    accounts: [
      {
        id: uuidv4(),
        name: "Facebook",
        email: "user@facebook.com",
        senha: "12345",
      },
      {
        id: uuidv4(),
        name: "Instagram",
        email: "user@instagram.com",
        senha: "67890",
      },
    ],
  },
  { id: uuidv4(), nome: "Pasta de Teste", accounts: [] },
];
// Função para simular o atraso de uma requisição
// Função para simular o atraso de uma requisição
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockApi = {
  // Função para buscar todas as pastas (findAllFolders)
  getFolders: async () => {
    await delay(500);
    return { data: folders };
  },

  // Função para criar uma nova pasta (createFolder)
  createFolder: async (folderData) => {
    await delay(500);
    const newFolder = {
      id: uuidv4(),
      nome: folderData.nome,
      accounts: folderData.accounts || [],
    };
    folders.push(newFolder);
    return { data: newFolder };
  },

  // Função para buscar todas as contas dentro de uma pasta (getAccounts)
  getAccounts: async (folderId) => {
    await delay(500);
    const folder = folders.find(f => f.id === folderId);
    console.log("Encontrado folder no getAccounts:", folder);
    return { data: folder ? folder.accounts : [] };
  },

  
  
    // Função para criar uma nova conta dentro de uma pasta (createAccount)
    createAccount: async (folderId, accountData) => {
      const folder = folders.find(f => f.id === folderId);
    
      // Verificar se a pasta foi encontrada e se os dados estão presentes e válidos
      if (folder && Array.isArray(accountData.dados) && accountData.dados.length > 0) {
        const newAccount = { 
          id: uuidv4(),
          dados: accountData.dados // Certificar-se de que "dados" está sendo usado corretamente
        };
    
        // Adicionar a nova conta à pasta
        folder.accounts.push(newAccount);
        return { data: newAccount };
      } else {
        // Se houver erro nos dados ou na pasta
        console.error("Dados inválidos ou pasta não encontrada:", accountData);
        return { error: 'Dados inválidos ou pasta não encontrada' };
      }
    }
  
};

export default mockApi;

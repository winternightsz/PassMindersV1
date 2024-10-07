// mockApi.js
import { v4 as uuidv4 } from 'uuid';

// Dados simulados
let folders = [
  // Exemplo de pasta inicial (pode ser vazio)
  { id: uuidv4(), name: 'Pasta de Teste', accounts: [] }
];

// Função para simular o atraso de uma requisição
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Funções simuladas
const mockApi = {
  getFolders: async () => {
    await delay(500); // Simula atraso de requisição
    return { data: folders };
  },
  createFolder: async (folderData) => {
    await delay(500);
    const newFolder = { id: uuidv4(), name: folderData.folderName, accounts: folderData.accounts || [] };
    folders.push(newFolder);
    return { data: newFolder };
  },
  getAccounts: async (folderId) => {
    await delay(500);
    const folder = folders.find(f => f.id === folderId);
    return { data: folder ? folder.accounts : [] };
  },
  createAccount: async (folderId, accountData) => {
    await delay(500);
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      const newAccount = { id: uuidv4(), ...accountData };
      folder.accounts.push(newAccount);
      return { data: newAccount };
    }
    return { data: null };
  }
};

export default mockApi;

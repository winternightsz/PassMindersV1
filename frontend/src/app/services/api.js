import axios from 'axios';
import mockApi from './mockApi';

const USE_MOCK_API = true; // Trocar para `false` quando o backend real estiver pronto

// Instância Axios para o backend real
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL do backend
});

// Funções que usam o mockApi ou o backend real
export const getFolders = () => {
  return USE_MOCK_API ? mockApi.getFolders() : api.get('/folders');
};

export const createFolder = (folderData) => {
  return USE_MOCK_API ? mockApi.createFolder(folderData) : api.post('/folders', folderData);
};

export const getAccounts = (folderId) => {
  return USE_MOCK_API ? mockApi.getAccounts(folderId) : api.get(`/folders/${folderId}/accounts`);
};

export const createAccount = (folderId, accountData) => {
  return USE_MOCK_API ? mockApi.createAccount(folderId, accountData) : api.post(`/folders/${folderId}/accounts`, accountData);
};

export default api;

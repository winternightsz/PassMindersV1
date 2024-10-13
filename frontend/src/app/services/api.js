import axios from 'axios';
import mockApi from './mockApi';

const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

// Instância Axios para o backend real
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Funções que usam o mockApi ou o backend real para as contas
export const getAccounts = (folderId) => {
  return USE_MOCK_API ? mockApi.getAccounts(folderId) : api.get(`/findAllAccounts?folderId=${folderId}`);
};

export const createAccount = (accountData) => {
  return USE_MOCK_API ? mockApi.createAccount(accountData) : api.post('/createAccount', accountData);
};

// Funções para pastas (folders) continuam as mesmas
export const getFolders = () => {
  return USE_MOCK_API ? mockApi.getFolders() : api.get('/findAllFolders');
};

export const createFolder = (folderData) => {
  return USE_MOCK_API ? mockApi.createFolder(folderData) : api.post('/createFolder', folderData);
};

export default api;

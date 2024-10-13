import axios from 'axios';

// Instância Axios para o backend real
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, 
});

export const getAccounts = (folderId) => {
  return api.get(`/findAllAccounts?folderId=${folderId}`);
};

export const createAccount = (accountData) => {
  return api.post('/createAccount', accountData);
};

export const getFolders = () => {
  return api.get('/findAllFolders');
};

export const createFolder = (folderData) => {
  return api.post('/createFolder', folderData);
};

export default api;

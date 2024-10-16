import axios from 'axios';

// Instância Axios para o backend real
const api = axios.create({
    baseURL: 'http://localhost:5000', // Coloque aqui a URL do seu backend
  });

// Função para buscar todas as contas de uma pasta específica
export const getAccounts = (folderId) => {
  return api.get(`/findAccounts/${folderId}`);  // Ajuste da rota para buscar contas por pasta
};

// Função para criar uma nova conta
export const createAccount = (accountData) => {
  return api.post('/createAccount', accountData);  // Post para criar conta
};

// Função para buscar todas as pastas
export const getFolders = () => {
  return api.get('/findFolders');  // Rota para buscar todas as pastas
};

// Função para criar uma nova pasta
export const createFolder = (data) => {
  return api.post('/createFolder', data);  // Post para criar pasta
};

export default api;
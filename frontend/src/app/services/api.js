import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000', 
  });

// usado no foldersDetails
export const getAccounts = (folderId) => {
  return api.get(`/findAccounts/${folderId}`);  
};

// usado no foldersDetails
export const createAccount = (accountData) => {
  return api.post('/createAccount', accountData);  
};

// usado no mainpage
export const getFolders = () => {
  return api.get('/findFolders');  
};

// usado no createFolder
export const createFolder = (data) => {
  return api.post('/createFolder', data);  
};

export default api;
import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000', 
  });

// usado no foldersDetails
export const getAccounts = (folderId) => {
  return api.get(`/findAccount/${folderId}`);  
};

// usado no foldersDetails
export const createAccount = (accountData) => {
  return api.post('/createAccount', accountData);  
};

// usado no foldersDetails para deletar uma conta
export const deleteAccount = (id_pasta, id_conta) => {
  return api.delete('/deleteAccount', { data: { id_pasta, id_conta } });
};

export const updateAccount = (id_pasta, id_conta, dados) => {
  return api.put('/updateAccount', {
    id_pasta,
    id_conta,
    dados,
  });
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
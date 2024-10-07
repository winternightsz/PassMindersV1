"use client";
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import CreateFolder from '../../components/CreateFolder';
import api from '@/app/services/api';
import FolderDetail from '../../components/FolderDetail';
import { getFolders, createFolder } from '@/app/services/api'; // Importa as funções do mock ou backend

const MainPage = () => {
  const [folders, setFolders] = useState([]);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    // Buscar pastas do "backend"
    getFolders()
      .then(response => setFolders(response.data))
      .catch(error => console.error('Erro ao buscar pastas:', error));
  }, []);

  const handleCreateFolder = (data) => {
    if (!data) {
      setCreatingFolder(false);
      return;
    }

    // Criar nova pasta no "backend"
    createFolder(data)
      .then(response => {
        if (!folders.find(folder => folder.id === response.data.id)) {
          setFolders([...folders, response.data]);
        }
        setSelectedFolder(response.data); // Navegar automaticamente para a pasta criada
        setCreatingFolder(false);
      })
      .catch(error => console.error('Erro ao criar pasta:', error));
  };

  const handleSelectFolder = (folder) => {
    setSelectedFolder(folder);
  };

  return (
    <div className="flex h-screen">
      <Sidebar folders={folders} onSelectFolder={handleSelectFolder} />
      <div className="flex-1 flex justify-center items-center bg-blue-100">
        {selectedFolder ? (
          <FolderDetail folder={selectedFolder} />
        ) : creatingFolder ? (
          <CreateFolder onCreate={handleCreateFolder} />
        ) : (
          <button onClick={() => setCreatingFolder(true)} className="text-blue-500 text-6xl">
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default MainPage;

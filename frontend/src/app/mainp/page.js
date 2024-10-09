"use client";
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import CreateFolder from '../../components/CreateFolder';
import FolderDetail from '../../components/FolderDetail';
import { getFolders, createFolder } from '@/app/services/api';

const MainPage = () => {
  const [folders, setFolders] = useState([]);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    // Buscar pastas do "backend"
    getFolders()
      .then(response => {
        const uniqueFolders = response.data.filter((folder, index, self) =>
          index === self.findIndex((f) => f.id === folder.id)
        );
        setFolders(uniqueFolders);
      })
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
        const newFolder = response.data;
        setSelectedFolder(newFolder); // Navega automaticamente para a pasta criada

        // Evitar adicionar a pasta novamente se já estiver na lista
        if (!folders.some(folder => folder.id === newFolder.id)) {
          setFolders((prevFolders) => [...prevFolders, newFolder]);
        }
        setCreatingFolder(false);
      })
      .catch(error => console.error('Erro ao criar pasta:', error));
  };

  const handleSelectFolder = (folder) => {
    setSelectedFolder(folder);
  };

  const handleBackToMainPage = () => {
    setSelectedFolder(null); // Voltar para Main Page
  };

  return (
    <div className="flex h-screen">
      <Sidebar folders={folders} onSelectFolder={handleSelectFolder} />
      <div className="flex-1 flex flex-col justify-center items-center bg-blue-100 p-8">
        {selectedFolder ? (
          <FolderDetail folder={selectedFolder} onBack={handleBackToMainPage} />
        ) : creatingFolder ? (
          <CreateFolder onCreate={handleCreateFolder} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6 w-full">
              {folders.map(folder => (
                <div key={folder.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl text-blue-500 mb-4">{folder.name}</h3>
                  {folder.accounts.length > 0 ? (
                    <ul>
                      {folder.accounts.slice(0, 2).map(account => (
                        <li key={account.id}>
                          {Object.entries(account).map(([key, value]) => (
                            <p key={key}>
                              <strong>{key}:</strong> {value}
                            </p>
                          ))}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Nenhuma conta adicionada</p>
                  )}
                  <button
                    onClick={() => handleSelectFolder(folder)}
                    className="text-blue-500 mt-4"
                  >
                    Abrir Pasta
                  </button>
                </div>
              ))}
            </div>

            {/* Botão de criar pasta sempre visível */}
            <button
              onClick={() => setCreatingFolder(true)}
              className="mt-8 text-blue-500 text-6xl"
            >
              +
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;

"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import CreateFolder from "../../components/CreateFolder";
import FolderDetail from "../../components/FolderDetail";
import { getFolders } from "@/app/services/api"; 

const MainPage = () => {
  const [folders, setFolders] = useState([]);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // busca pastas e contas associadas do backend
  useEffect(() => {
    getFolders()
      .then((response) => {
        const uniqueFolders = response.data.filter(
          (folder, index, self) =>
            index === self.findIndex((f) => f.id === folder.id)
        );
        setFolders(uniqueFolders);
      })
      .catch((error) => console.error("Erro ao buscar pastas:", error));
  }, []);

  // atualiza as pastas depois de adicionar conta
  const updateFolders = async () => {
    try {
      const response = await getFolders();
      setFolders(response.data);
    } catch (error) {
      console.error("Erro ao buscar pastas após criação de conta:", error);
    }
  };


  const handleCreateFolder = async (data) => {
    if (!data) {
      setCreatingFolder(false);
      return;
    }

    setSelectedFolder(data); // vai navegar automaticamente para a pasta criada

    // verifica se a nova pasta ja nao existe antes de adicionar ela no estado
    // pra nao duplicar
    if (!folders.some((folder) => folder.id === data.id)) {
      setFolders((prevFolders) => [...prevFolders, data]);
    }

    // recarrega as pastas do backend para garantir que tudo ta atualizado
    updateFolders();
    setCreatingFolder(false);
  };

  // seleciona a pasta para mostrar os detalhes dentro
  const handleSelectFolder = (folder) => {
    setSelectedFolder(folder); 
  };

  const handleBackToMainPage = () => {
    setSelectedFolder(null); // voltar pra Main Page
    setCreatingFolder(false);

    // recarrega as pastas ao voltar da folderDetail
    // para garantir que tudo ta atualizado
    updateFolders();
  };

  return (
    <div className="flex min-h-screen bg-azul60 ">
      <Sidebar
        folders={folders} // passa as pastas como prop pro Sidebar
        onSelectFolder={handleSelectFolder}
        onBack={handleBackToMainPage}
        onCreateFolder={() => setCreatingFolder(true)}
      />
      <div className="flex-1 flex flex-col bg-azul60 justify-center items-center p-8 ml-64">
        {selectedFolder ? (
          <FolderDetail
            folder={selectedFolder}
            onBack={handleBackToMainPage}
            updateFolders={updateFolders} // passa a funcao para atualizar as pastas
          />
        ) : creatingFolder ? (
          <CreateFolder onBack={handleBackToMainPage} onCreate={handleCreateFolder} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6 w-full">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-2xl text-azul10 mb-4">{folder.nome}</h3>
                  {folder.contas?.length > 0 ? (
                    <ul className="flex space-x-20 justify-center">
                      {folder.contas.slice(0, 2).map((account) => (
                        <li key={account.id}>
                          <img
                            src={account.foto_referencia} // esta com a foto do escudo da logo
                            alt={account.titulo}
                            className="w-24 h-24 object-cover"
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Nenhuma conta adicionada</p>
                  )}

                  <button
                    onClick={() => handleSelectFolder(folder)}
                    className="text-azul10 mt-4"
                  >
                    Abrir Pasta
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCreatingFolder(true)}
              className="mt-8 text-azul10 text-8xl"
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

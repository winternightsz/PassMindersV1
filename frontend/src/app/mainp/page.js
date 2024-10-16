"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import CreateFolder from "../../components/CreateFolder";
import FolderDetail from "../../components/FolderDetail";
import { getFolders } from "@/app/services/api"; // Função para buscar pastas do backend

const MainPage = () => {
  const [folders, setFolders] = useState([]);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Buscar pastas e contas associadas do backend
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

  // Atualiza as pastas após adicionar conta
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

    setSelectedFolder(data); // Navega automaticamente para a pasta criada

    // Verifica se a nova pasta já não existe antes de adicioná-la ao estado
    if (!folders.some((folder) => folder.id === data.id)) {
      setFolders((prevFolders) => [...prevFolders, data]);
    }

    // Recarrega as pastas do backend para garantir que tudo está atualizado
    updateFolders();
    setCreatingFolder(false);
  };

  const handleSelectFolder = (folder) => {
    setSelectedFolder(folder); // Seleciona a pasta para exibir detalhes
  };

  const handleBackToMainPage = () => {
    setSelectedFolder(null); // Voltar para a Main Page
    setCreatingFolder(false);

    // Recarrega as pastas ao voltar da página de detalhes
    updateFolders();
  };

  return (
    <div className="flex min-h-screen bg-azul60 ">
      <Sidebar
        folders={folders} // Passa as pastas como prop para o Sidebar
        onSelectFolder={handleSelectFolder}
        onBack={handleBackToMainPage}
        onCreateFolder={() => setCreatingFolder(true)}
      />
      <div className="flex-1 flex flex-col bg-azul60 justify-center items-center p-8 ml-64">
        {selectedFolder ? (
          <FolderDetail
            folder={selectedFolder}
            onBack={handleBackToMainPage}
            updateFolders={updateFolders} // Passa a função para atualizar as pastas
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
                            src={account.foto_referencia}
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

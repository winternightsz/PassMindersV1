"use client";
import { useState } from 'react';

const MainContent = ({ folders, onCreateFolder }) => {
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateClick = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
    }
  };

  return (
    <div className="flex-1 bg-blue-100 p-8 flex items-center justify-center">
      {folders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <input
            type="text"
            placeholder="Nome da nova pasta"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button
            onClick={handleCreateClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Criar
          </button>
        </div>
      ) : (
        // Caso existam pastas, exibe a lista de pastas com o botão "+"
        <div className="grid grid-cols-2 gap-8">
          {folders.map(folder => (
            <div key={folder.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl text-blue-500 mb-4">{folder.name}</h3>
            </div>
          ))}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <input
              type="text"
              placeholder="Nome da nova pasta"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <button
              onClick={handleCreateClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Criar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;

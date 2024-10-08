const Sidebar = ({ folders, onSelectFolder }) => (
    <div className="w-64 h-full bg-gray-100 flex flex-col p-4">
      <a href="/mainp" className="text-blue-500 text-2xl mb-4">PassMinders</a>
      <div className="mb-4">
        {folders.map(folder => (
          <div key={folder.id} className="text-blue-500 cursor-pointer mb-2" onClick={() => onSelectFolder(folder)}>
            &gt; {folder.name}
          </div>
        ))}
      </div>
      <button className="text-blue-500 text-4xl">+</button>
    </div>
  );
  
  export default Sidebar;
  
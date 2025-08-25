import React from 'react';

const CreateButton = ({onCreate}) => {
  return (
    <div className="flex items-center p-4 justify-center border-b border-solid">
      <button 
      onClick={onCreate}
      className="outline-none w-full px-2 py-2 rounded-xl text-white shadow-lg bg-amber-600 hover:bg-amber-700 transition">
        + Create New
      </button>
    </div>
  );
};

export default CreateButton;
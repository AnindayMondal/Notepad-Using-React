import React from "react";

const FileMenu = ({ onAction }) => {
  const actions = [
    { key: "new", label: "New" },
    { key: "open", label: "Open" },
    { key: "save", label: "Save" },
    { key: "saveAs", label: "Save As" },
    { key: "print", label: "Print" },
  ];

  return (
    <div className="flex space-x-2 bg-gray-200 p-2 rounded">
      {actions.map((action) => (
        <button
          key={action.key}
          onClick={() => onAction(action.key)}
          className="px-3 py-1 bg-white text-gray-800 border border-gray-300 rounded hover:bg-gray-100"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default FileMenu;

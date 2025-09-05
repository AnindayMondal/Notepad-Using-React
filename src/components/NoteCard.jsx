import { FaTrash } from "react-icons/fa";
import { useState } from "react";

const NoteCard = ({ title, timestamp, onClick, onDelete, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
  };

  const handleTitleSave = () => {
    onUpdateTitle(localTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-start gap-2" onClick={onClick}>
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={localTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleSave}
            onKeyPress={(e) => e.key === 'Enter' && handleTitleSave()}
            className="font-semibold text-sm w-full border rounded p-1"
            autoFocus
          />
        ) : (
          <h3
            className="font-semibold text-sm truncate"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </h3>
        )}
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete Note"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default NoteCard;
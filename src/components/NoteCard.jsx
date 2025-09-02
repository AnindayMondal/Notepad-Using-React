import { FaTrash } from "react-icons/fa";

const NoteCard = ({ title, timestamp, onClick, onDelete }) => {
  return (
    <div className="flex justify-between items-start gap-2" onClick={onClick}>
      <div className="flex-1">
        <h3 className="font-semibold text-sm truncate">{title}</h3>
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={(e) => {
          e.stopPropagation(); // prevent note click from firing
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
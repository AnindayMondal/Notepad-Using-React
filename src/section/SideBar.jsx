import CreateButton from "../components/Create-new-button";
import SearchBar from "../components/Search-bar";
import NoteCard from "../components/NoteCard";

const Sidebar = ({ notes, selectedNoteId, handleFileAction, handleSelectNote, handleDeleteNote, handleSearch }) => {
  return (
    <div className="col-span-1 overflow-y-auto border-r border-solid">
      <CreateButton onCreate={handleFileAction.bind(null, "new")} />
      <SearchBar onSearch={handleSearch} />
      <div className="mt-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`relative cursor-pointer p-2 rounded ${
              selectedNoteId === note.id ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            <NoteCard
              title={note.title}
              timestamp={note.timestamp}
              onClick={() => handleSelectNote(note.id)}
              onDelete={() => handleDeleteNote(note.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
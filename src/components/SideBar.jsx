import React from "react";
import CreateButton from "./Create-new-button";
import SearchBar from "./Search-bar";
import NoteCard from "./NoteCard";

const Sidebar = ({ notes, selectedNoteId, handleFileAction, handleSelectNote, handleDeleteNote, handleSearch }) => {
  return (
    <div className="col-span-1 border-r border-solid overflow-y-auto">
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
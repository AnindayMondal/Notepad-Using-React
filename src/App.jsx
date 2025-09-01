import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Editor from "./components/Editor";
import useNotes from "./hooks/useNotes";

const App = () => {
  const {
    notes,
    selectedNoteId,
    noteContent,
    setNoteContent,
    fileInputRef,
    handleFileAction,
    handleSelectNote,
    handleDeleteNote,
    handleOpenFile,
    handleSearch,
  } = useNotes();

  return (
    <div>
      <Header />
      <div className="grid grid-cols-5 h-screen">
        <Sidebar
          notes={notes}
          selectedNoteId={selectedNoteId}
          handleFileAction={handleFileAction}
          handleSelectNote={handleSelectNote}
          handleDeleteNote={handleDeleteNote}
          handleSearch={handleSearch}
        />
        <Editor
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          handleFileAction={handleFileAction}
        />
      </div>
      <input
        type="file"
        accept=".txt"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleOpenFile}
      />
    </div>
  );
};

export default App;
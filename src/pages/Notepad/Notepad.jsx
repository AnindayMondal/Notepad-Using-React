import Header from "../../section/Header";
import Sidebar from "../../section/SideBar";
import Editor from "../../section/Editor";
import useNotes from "../../hooks/useNotes";
import backgroundImage from "../../assets/images/backgound.png";
import { useEffect } from "react";

const Notepad = () => {
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
    handleUpdateTitle,
  } = useNotes();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        switch (event.key) {
          case "n":
            event.preventDefault();
            handleFileAction("new");
            break;
          case "q":
            event.preventDefault();
            if (selectedNoteId !== null) {
              handleDeleteNote(selectedNoteId);
            }
            break;
          case "s":
            event.preventDefault();
            handleFileAction("save");
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // Cleanup
  }, [handleFileAction, handleDeleteNote, selectedNoteId]);

  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[95%] mx-auto max-w-[1140px]">
        <Header />
        <div className="grid grid-cols-5 h-screen">
          <Sidebar
            notes={notes}
            selectedNoteId={selectedNoteId}
            handleFileAction={handleFileAction}
            handleSelectNote={handleSelectNote}
            handleDeleteNote={handleDeleteNote}
            handleSearch={handleSearch}
            handleUpdateTitle={handleUpdateTitle}
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
    </div>
  );
};

export default Notepad;
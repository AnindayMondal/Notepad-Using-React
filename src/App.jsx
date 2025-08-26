import React, { useState, useEffect, useRef } from "react";
import CreateButton from "./components/Create-new-button";
import SearchBar from "./components/Search-bar";
import FileMenu from "./components/FileMenu";
import NoteCard from "./components/NoteCard";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill theme

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notepad-notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [noteContent, setNoteContent] = useState("");

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("notepad-notes", JSON.stringify(notes));
  }, [notes]);

  // Create note
  const handleCreateNewNote = () => {
    const timestamp = new Date().toLocaleString();
    const newNote = {
      id: Date.now(),
      title: `Untitled Note ${notes.length + 1}`,
      timestamp,
      content: "",
    };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
    setNoteContent("");
  };

  // Select note
  const handleSelectNote = (id) => {
    const note = notes.find((n) => n.id === id);
    setSelectedNoteId(id);
    setNoteContent(note.content || "");
  };
  // Open note
  const fileInputRef = React.useRef(null);

  // Save content
  const handleSaveNote = () => {
    if (selectedNoteId === null) {
      alert("No note selected!");
      return;
    }

    const updatedNotes = notes.map((note) =>
      note.id === selectedNoteId ? { ...note, content: noteContent } : note
    );

    setNotes(updatedNotes);
    alert("Note saved!");
  };

  // Delete note
  const handleDeleteNote = (idToDelete) => {
    const updatedNotes = notes.filter((note) => note.id !== idToDelete);
    setNotes(updatedNotes);

    if (selectedNoteId === idToDelete) {
      setSelectedNoteId(null);
      setNoteContent("");
    }
  };

  // Print
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=600,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body { font-family: monospace; white-space: pre-wrap; padding: 20px; }
          </style>
        </head>
        <body>
          ${noteContent.replace(/\n/g, "<br/>")}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  // File menu handler
  const handleFileAction = (action) => {
    console.log("File action selected:", action);
    switch (action) {
      case "new":
        handleCreateNewNote();
        break;
      case "open":
        fileInputRef.current.click();
        break;
      case "save":
        handleSaveNote();
        break;
      case "saveAs":
        // handle Save As logic
        break;
      case "print":
        handlePrint();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-center w-full bg-zinc-900">
        <h1 className="text-3xl font-bold text-white p-1">Notepad</h1>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-5 h-screen">
        {/* Sidebar */}
        <div className="col-span-1 border-r border-solid overflow-y-auto">
          <CreateButton onCreate={handleCreateNewNote} />
          <SearchBar />

          <div className="mt-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`relative cursor-pointer p-2 rounded ${
                  selectedNoteId === note.id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
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

        {/* Editor Area */}
        <div className="col-span-4">
          <div className="flex flex-row gap-4 bg-zinc-500 p-4 border-b border-solid">
            <FileMenu onAction={handleFileAction} />
          </div>
          <div>
            <textarea
              id="printable-textarea"
              placeholder="Write Here.."
              className="resize-none h-screen w-full p-4"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept=".txt"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const content = event.target.result;
              const timestamp = new Date().toLocaleString();
              const newNote = {
                id: Date.now(),
                title: file.name,
                timestamp,
                content,
              };
              setNotes((prevNotes) => [...prevNotes, newNote]);
              setSelectedNoteId(newNote.id);
              setNoteContent(content);
            };
            reader.readAsText(file);
          }
        }}
      />
    </>
  );
};

export default App;
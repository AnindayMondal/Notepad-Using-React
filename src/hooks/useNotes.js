import { useState, useEffect, useRef } from "react";

const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notepad-notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const fileInputRef = useRef(null);

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
    setNoteContent(note?.content || "");
  };

  // Save note
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

  // Print note
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

  // Open file
  const handleOpenFile = (e) => {
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
  };

  // File action handler
  const handleFileAction = (action) => {
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
        // Placeholder for saveAs logic
        alert("Save As not implemented");
        break;
      case "print":
        handlePrint();
        break;
      default:
        break;
    }
  };

  return {
    notes,
    selectedNoteId,
    noteContent,
    setNoteContent,
    fileInputRef,
    handleFileAction,
    handleSelectNote,
    handleDeleteNote,
    handleOpenFile,
  };
};

export default useNotes;
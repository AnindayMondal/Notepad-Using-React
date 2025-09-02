import { useState, useEffect, useRef } from "react";
import config from "../config";

const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem(config.localStorageKey);
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const fileInputRef = useRef(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(config.localStorageKey, JSON.stringify(notes));
  }, [notes]);

  // Sync filteredNotes with notes
  useEffect(() => {
    setFilteredNotes(notes);
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
          title: file.name.replace(/\.txt$|\.md$/, ""), // Remove .txt or .md extension
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

  // Save As (download note as .md file)
  const handleSaveAs = () => {
    if (selectedNoteId === null) {
      alert("No note selected!");
      return;
    }
    const note = notes.find((n) => n.id === selectedNoteId);
    if (!note) {
      alert("Selected note not found!");
      return;
    }
    // Sanitize title to create a valid file name
    const sanitizedTitle = note.title
      .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim() || "untitled-note"; // Fallback if title is empty
    const blob = new Blob([noteContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sanitizedTitle}.md`;
    a.click();
    URL.revokeObjectURL(url);
    alert("Note downloaded as Markdown!");
  };

  // Search notes
  const handleSearch = (query) => {
    if (!query) {
      setFilteredNotes(notes);
      return;
    }
    const lowerQuery = query.toLowerCase();
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerQuery) ||
          note.content.toLowerCase().includes(lowerQuery)
      )
    );
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
        handleSaveAs();
        break;
      case "print":
        handlePrint();
        break;
      default:
        break;
    }
  };

  return {
    notes: filteredNotes,
    selectedNoteId,
    noteContent,
    setNoteContent,
    fileInputRef,
    handleFileAction,
    handleSelectNote,
    handleDeleteNote,
    handleOpenFile,
    handleSearch,
  };
};

export default useNotes;
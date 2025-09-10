import { useState, useEffect, useRef } from "react";
import config from "../config";

const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem(config.localStorageKey);
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [selectedNoteId, setSelectedNoteId] = useState(() => {
    const savedSelectedId = localStorage.getItem("selectedNoteId");
    return savedSelectedId ? parseInt(savedSelectedId) : null;
  });
  const [noteContent, setNoteContent] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(config.localStorageKey, JSON.stringify(notes));
    if (selectedNoteId !== null) {
      localStorage.setItem("selectedNoteId", selectedNoteId.toString());
    }
  }, [notes, selectedNoteId]);

  useEffect(() => {
    setFilteredNotes(notes);
    if (selectedNoteId !== null) {
      const note = notes.find((n) => n.id === selectedNoteId);
      setNoteContent(note?.content || "");
    } else if (notes.length > 0) {
      setSelectedNoteId(notes[0].id);
      setNoteContent(notes[0].content || "");
    }
  }, [notes, selectedNoteId]);

  const handleCreateNewNote = () => {
    const title = prompt("Enter the title for the new note:", `Untitled Note ${notes.length + 1}`);
    const timestamp = new Date().toLocaleString();
    const newNote = {
      id: Date.now(),
      title: title || `Untitled Note ${notes.length + 1}`,
      timestamp,
      content: "",
    };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
    setNoteContent("");
  };

  const handleSelectNote = (id) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setSelectedNoteId(id);
      setNoteContent(note.content || "");
    }
  };

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

  const handleDeleteNote = (idToDelete) => {
    const updatedNotes = notes.filter((note) => note.id !== idToDelete);
    setNotes(updatedNotes);
    if (selectedNoteId === idToDelete) {
      setSelectedNoteId(null);
      setNoteContent("");
    }
  };

  const handleUpdateTitle = (id, newTitle) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title: newTitle } : note
    );
    setNotes(updatedNotes);
  };

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
          ${noteContent.replace(/<[^>]+>/g, '')} <!-- Strip HTML for plain text printing -->
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleOpenFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const timestamp = new Date().toLocaleString();
        const newNote = {
          id: Date.now(),
          title: file.name.replace(/\.txt$|\.md$/, ""),
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
    const sanitizedTitle = note.title
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim() || "untitled-note";
    const blob = new Blob([noteContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sanitizedTitle}.md`;
    a.click();
    URL.revokeObjectURL(url);
    alert("Note downloaded as Markdown!");
  };

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
    handleUpdateTitle,
  };
};

export default useNotes;
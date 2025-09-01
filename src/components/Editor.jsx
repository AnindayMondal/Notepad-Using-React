import React from "react";
import FileMenu from "./FileMenu";

const Editor = ({ noteContent, setNoteContent, handleFileAction }) => {
  return (
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
  );
};

export default Editor;
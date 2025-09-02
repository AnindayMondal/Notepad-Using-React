import FileMenu from "../components/FileMenu";

const Editor = ({ noteContent, setNoteContent, handleFileAction }) => {
  return (
    <div className="col-span-4">
      <div className="flex flex-row gap-4 p-4 border-b border-solid">
        <FileMenu onAction={handleFileAction} />
      </div>
      <div>
        <textarea
          id="printable-textarea"
          placeholder="Write Here.."  
          className="resize-none h-140 focus:outline-none w-full p-4 bg-transparent"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Editor;
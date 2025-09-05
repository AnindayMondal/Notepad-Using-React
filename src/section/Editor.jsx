import FileMenu from "../components/FileMenu";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { memo } from "react";
import { useEffect } from "react";

const Editor = memo(({ noteContent, setNoteContent, handleFileAction }) => {
  const editor = useEditor({
    extensions: [StarterKit, BubbleMenu,Placeholder.configure({
          emptyEditorClass: 'before:content-[attr(data-placeholder)] before:float-left before:text-gray-400 before:h-0 before:pointer-events-none',
          placeholder: 'Start typing here...',
        }),],
    content: noteContent,
    onUpdate: ({ editor }) => {
      setNoteContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }
useEffect(() => {
  if (editor) {
    editor.commands.setContent(noteContent);
  }
}, [noteContent, editor]);

  return (
    <div className="col-span-4">
      <div className="flex flex-row gap-4 p-4 border-b border-solid">
        <FileMenu onAction={handleFileAction} />
      </div>
      <div className="relative">
        <EditorContent editor={editor} className="min-h-[400px] w-full p-4 bg-transparent" />
      </div>
    </div>
  );
});

export default Editor;
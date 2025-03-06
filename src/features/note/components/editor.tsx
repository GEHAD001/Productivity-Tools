"use client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { updateNoteAction } from "../actions/updateNoteAction";

export default function Editor({
  noteId,
  userId,
  noteContent,
}: {
  noteId: string;
  userId: string;
  noteContent: string;
}) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: JSON.parse(noteContent),
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      theme={"light"}
      onChange={() => {
        updateNoteAction({
          noteId,
          userId,
          note: JSON.stringify(editor.document),
        });
      }}
    />
  );
}

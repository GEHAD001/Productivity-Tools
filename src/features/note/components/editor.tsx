"use client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { storeNoteAction } from "../actions/storeNoteAction";

export default function Editor({
  noteId,
  noteContent,
  noteDate,
}: {
  noteId?: string;
  noteContent: string;
  noteDate: Date;
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
        storeNoteAction({
          id: noteId,
          note: JSON.stringify(editor.document),
          date: noteDate,
        });
      }}
    />
  );
}

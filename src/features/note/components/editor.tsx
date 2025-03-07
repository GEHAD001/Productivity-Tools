"use client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { updateNoteAction } from "../actions/updateNoteAction";
import { useState, useEffect } from "react";

const secondsTrigger = 5;

export default function Editor({
  noteId,
  userId,
  noteContent,
}: {
  noteId: string;
  userId: string;
  noteContent: string;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [seconds, setSeconds] = useState(secondsTrigger);
  const [debouncedContent, setDebouncedContent] = useState("");

  const editor = useCreateBlockNote({
    initialContent: JSON.parse(noteContent),
  });

  useEffect(() => {
    if (!debouncedContent) return;
    setIsSaving(true);
    const secondTimer = setInterval(() => setSeconds((cur) => cur - 1), 1000);

    const triggerTimer = setTimeout(async () => {
      await updateNoteAction({
        noteId,
        userId,
        note: debouncedContent,
      });

      // reset states after action
      setIsSaving(false);
      setSeconds(secondsTrigger);
      clearInterval(secondTimer);
    }, 5000);

    // when debouncedContent change will remove the pre-setTimeout and start new one.
    return () => {
      clearTimeout(triggerTimer);
      clearInterval(secondTimer);
    };
  }, [debouncedContent, noteId, userId]);

  return (
    <>
      <BlockNoteView
        editor={editor}
        theme={"light"}
        onChange={() => {
          setDebouncedContent(JSON.stringify(editor.document));
        }}
      />
      {isSaving && seconds < 3 && (
        <div className="fixed top-5 left-1/2 -translate-x-1/4 bg-gray-800 text-white px-4 py-2 rounded-md transition-opacity">
          {seconds >= 1 ? `will save after ${seconds} second.` : `saving...`}
        </div>
      )}
    </>
  );
}

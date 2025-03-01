import connectToDB from "@/database/connection";
import Note from "@/database/models/Note";
import Editor from "@/features/note/components/editor";
import React from "react";

export default async function NotesPage() {
  await connectToDB();
  const note = (await Note.find()).at(0);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2>Note</h2>
      <div className="w-1/2 border-2 ">
        <Editor note={note.note} />
      </div>
    </div>
  );
}

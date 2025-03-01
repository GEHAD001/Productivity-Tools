"use client";
import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useState } from "react";
import { storeNoteAction } from "../actions/storeNoteAction";
import { useDebounce } from "@uidotdev/usehooks";

export default function Editor({ note }: { note: string }) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({ initialContent: JSON.parse(note) });
  const [blocks, setBlocks] = useState<Block[]>([]);
  const blocksUpdated = useDebounce(blocks, 800);

  useEffect(() => {
    if (blocksUpdated) {
      storeNoteAction({
        id: "67c2fdd78fc8ca1530279b8e",
        note: JSON.stringify(editor.document),
      });
    }
  }, [blocksUpdated]);

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} theme={"light"} />;
}

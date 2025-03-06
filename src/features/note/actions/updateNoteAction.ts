"use server";

import { revalidatePath } from "next/cache";
import Note from "@/database/models/Note";
import connectToDB from "@/database/connection";

export interface StoreNoteActionParams {
  noteId: string;
  userId: string;
  note: string;
}

export async function updateNoteAction({
  noteId,
  userId,
  note,
}: StoreNoteActionParams) {
  try {
    await connectToDB();

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { note },
      { new: true }
    );

    if (!updatedNote) {
      return { error: true, message: "Note not found or Invalid" };
    }

    revalidatePath("/");
    return {
      error: false,
      message: "Note updated successfully",
      data: JSON.stringify(updatedNote),
    };
  } catch (error) {
    console.error("Error storing note:", error);
    return { error: true, message: "Failed to store note" };
  }
}

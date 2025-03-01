"use server";

import { revalidatePath } from "next/cache";
import Note from "@/database/models/Note";
import connectToDB from "@/database/connection";
import User from "@/database/models/User";

export interface StoreNoteActionParams {
  id?: string;
  note: string;
}

export async function storeNoteAction({ id, note }: StoreNoteActionParams) {
  console.log("Trigger");
  try {
    await connectToDB();
    const userId = (await User.find()).at(0)._id;

    if (id) {
      // Update existing note
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { note },
        { new: true }
      );

      if (!updatedNote) {
        return { error: true, message: "Note not found" };
      }

      revalidatePath("/");
      return {
        error: false,
        message: "Note updated successfully",
        data: JSON.stringify(updatedNote),
      };
    }

    // Create new note
    const newNote = await Note.create({ note, user: userId });

    revalidatePath("/");
    return {
      error: false,
      message: "Note created successfully",
      data: JSON.stringify(newNote),
    };
  } catch (error) {
    console.error("Error storing note:", error);
    return { error: true, message: "Failed to store note" };
  }
}

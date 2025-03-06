import mongoose, { InferSchemaType } from "mongoose";

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
    trim: true,
    default: JSON.stringify([
      {
        type: "heading",
        content: `Your note for ${new Date().toLocaleDateString()}`,
      },
    ]),
  },
  date: {
    type: Date,
    default: Date.now,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export type NoteType = InferSchemaType<typeof noteSchema>;

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
export default Note;

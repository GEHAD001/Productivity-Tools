import mongoose, { InferSchemaType } from "mongoose";

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
    trim: true,
  },
  inDate: {
    type: Date,
    default: Date.now,
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

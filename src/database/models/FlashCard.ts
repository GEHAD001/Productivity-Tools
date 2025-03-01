import mongoose, { InferSchemaType } from "mongoose";

const flashcardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "private",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateCreate: {
    type: Date,
    default: Date.now,
  },
});

export type FlashcardType = InferSchemaType<typeof flashcardSchema>;

const Flashcard =
  mongoose.models.Flashcard || mongoose.model("Flashcard", flashcardSchema);
export default Flashcard;

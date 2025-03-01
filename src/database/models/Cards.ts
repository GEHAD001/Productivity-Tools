import mongoose, { InferSchemaType } from "mongoose";

const cardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
    trim: true,
  },
  back: {
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
  flashcard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flashcard",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type CardType = Omit<InferSchemaType<typeof cardSchema>, "_id"> & {
  _id: string;
};

const Card = mongoose.models.Card || mongoose.model("Card", cardSchema);
export default Card;

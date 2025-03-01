import mongoose, { InferSchemaType } from "mongoose";

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    enum: ["success", "pending", "failed"],
    default: "pending",
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export type TodoType = InferSchemaType<typeof todoSchema>;

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;

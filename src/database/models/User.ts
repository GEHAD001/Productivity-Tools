import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  active: {
    type: Boolean,
    default: true, // TODO: make it false after build real auth system
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type UserType = InferSchemaType<typeof userSchema>;

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

"use server";
// import bcrypt from "bcryptjs";
import User from "@/database/models/User";
import { RegisterFormFields } from "../schemas/RegisterFormFields";
import connectToDB from "@/database/connection";

export type RegisterUserParams = Omit<RegisterFormFields, "confirmPassword">;

export async function registerUserQuery({
  username,
  email,
  password,
}: RegisterUserParams) {
  await connectToDB();
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return {
        success: false,
        error: "User with this email or username already exists",
      };
    }

    // TODO: Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      //   password: hashedPassword,
    });

    return {
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Error in registerUserQuery:", error);
    return {
      success: false,
      error: "Failed to register user",
    };
  }
}

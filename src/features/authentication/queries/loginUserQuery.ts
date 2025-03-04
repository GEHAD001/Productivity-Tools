"use server";
import User from "@/database/models/User";
import connectToDB from "@/database/connection";

export interface LoginUserParams {
  username: string;
  password: string;
}

export async function loginUserQuery({ username, password }: LoginUserParams) {
  await connectToDB();
  try {
    // Check if user exists
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // TODO: Verify password (without hashing for development)
    if (user.password !== password) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    return {
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Error in loginUserQuery:", error);
    return {
      success: false,
      error: "Failed to authenticate user",
    };
  }
}

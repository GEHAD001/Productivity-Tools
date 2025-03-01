"use server";
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

declare global {
  const mongoose: Mongoose;
}

let cached = global.mongoose;

// connection structure, conn contain connectio, promise contain function that create connection
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  // is there connection ?
  if (cached.conn) {
    return cached.conn;
  }

  // is there the function that create the connection ?
  if (!cached.promise) {
    // if No then create the function that create database connection.
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  // try generate database connection & cached if success
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDB;

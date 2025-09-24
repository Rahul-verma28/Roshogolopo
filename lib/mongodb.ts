import mongoose from "mongoose";

let isConnected: boolean = false;

const dbConnect = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "roshogolpo-admin",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

export default dbConnect;

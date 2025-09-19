import mongoose from "mongoose";

let isConnected: boolean = false;

const dbConnect = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "roshogolpo",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;

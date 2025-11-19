import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    // mongoose.Promise = global.Promise;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

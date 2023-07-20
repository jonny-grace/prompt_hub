import mongoose from "mongoose";

var isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "prompthub",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected - true;
    console.log("MongoDb connected");
  } catch (error) {
    console.log(error);
  }
};

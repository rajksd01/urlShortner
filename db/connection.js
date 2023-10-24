import mongoose from "mongoose";
import "dotenv/config";

async function connectToMongoDB() {
  const url = process.env.MONGO_URL;

  await mongoose.connect(url);
}

export default connectToMongoDB;

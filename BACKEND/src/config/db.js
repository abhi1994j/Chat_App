import mongoose from "mongoose";

const connectDB = async()=>{
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1); // exit process is DB connection fails
  }
}

export {connectDB};
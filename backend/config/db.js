import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MONGODB connected: ${conn.connection.host}`.blue.underline);
  } catch (error) {
    console.log("Error".red.bold, error);
    process.exit(1);
  }
};

export default connectDB;

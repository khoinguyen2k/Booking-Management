import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import mongoose from "mongoose";
import { connectDB } from "../database/mongodb";
import { seedDatabase } from "./seed/index";

async function run() {
  try {
    await connectDB();

    console.log("✅ Connected MongoDB");

    await seedDatabase();
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

run();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { JobsRouter } from "./routes/Jobs.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/Jobs", JobsRouter);

const dbName = "jobsDatabase";
const dbURI = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(dbURI, {
  useNewUrlParser: true, // Optional, but good practice
  useUnifiedTopology: true, // Optional, but good practice
});

const db = mongoose.connection;
db.on("error", (error) => console.error("Connection error:", error));
db.once("open", () => console.log("Database connected:", dbName));

app.listen(3001, () => console.log("Server started on port 3001"));
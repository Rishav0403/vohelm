import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
const app = express();
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// Db
import connectDB from "./db/conn.js";

// middleware
app.use(express.json());
app.use(cors());

// router
import router from "./route/router.js";

// routes
app.get("/", (req, res) => {
  res.json({ message: "connected to server" });
});
app.use("/api/v1", router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://rkb99875:rkb99875@cluster0.cvois5z.mongodb.net/?retryWrites=true&w=majority"
    );
    await app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

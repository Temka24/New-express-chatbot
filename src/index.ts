import express, { Express, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.route.js";
import uploadRoutes from "./routes/upload.route.js";

import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (_, res: Response) => {
    res.json({ msg: "Success to ping" });
});

app.use("/api", chatRoutes);
app.use("/api", uploadRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});

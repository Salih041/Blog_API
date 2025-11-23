import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const dburl = process.env.MONGO_URL;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15min
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many request."
});
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.connect(dburl)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => { console.log("Server is running on ", PORT) });
    }).catch((err) => {
        console.error("MongoDB error");
        console.error(err);
        process.exit(1);
    })

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);


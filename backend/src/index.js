import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

import{connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

const app = express();
const PORT = process.env.port

app.use(express.json());

app.use("/api/auth", authRoutes)
app.listen(5001, () => {
    console.log ("server is running on PORT:" + PORT)
    connectDB()
})
import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

const app = express()
app.use(cors({
    origin:"https://ai-hire-booster.onrender.com",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , authRouter)

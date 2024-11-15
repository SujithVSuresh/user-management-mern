import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import mongoose  from "mongoose";
import userRouter from "./routers/userRouter";
import adminRouter from "./routers/adminRouter";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.message));


app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);


app.use('/', userRouter)
app.use('/admin', adminRouter)


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


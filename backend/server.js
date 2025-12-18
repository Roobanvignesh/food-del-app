import cors from "cors";
import 'dotenv/config';
import express from "express";
import { connectDB } from "../backend/config/db.js";
import foodRouter from "../backend/routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRoute.js";

// app config
const app = express()
const port = process.env.PORT || 4000;

// middleware
// whenever getting req from frontend it will pass using this json
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// it is http method it will req the data from the server
app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);

})
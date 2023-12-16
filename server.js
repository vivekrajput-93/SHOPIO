import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"

// configure .env
dotenv.config();

// database connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/auth", authRoutes);

// home api
app.get("/", (req, res) => {
    res.send({
        message : "This is a e-commerce app",
    })
})

// PORT 



app.listen(process.env.PORT, () => {
    console.log(`Server running on `,process.env.PORT);
});
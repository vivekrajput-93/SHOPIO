import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js";

// configure .env
dotenv.config();

// database connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

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
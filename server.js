import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js";
import ProductsRoutes from "./routes/productsRoutes.js";
import path from "path";

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
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, './client/build')));


// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", ProductsRoutes)

// home api
app.use('*', function(req,res) {
    const indexPath = path.resolve(__dirname,  'client', 'build', 'index.html');
res.sendFile(indexPath);

})

// PORT 



app.listen(process.env.PORT, () => {
    console.log(`Server running on `,process.env.PORT);
});
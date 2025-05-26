import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser"; 
import UserRoute from "./routes/UserRoute.js";
<<<<<<< HEAD
import DepartementRoute from "./routes/DepartementRoute.js";
=======
>>>>>>> 9cd91185c3af731948ae29e6509327c7377bda0e
import "./models/index.js"; // TAMBAHKAN BARIS INI!

dotenv.config(); // Panggil dotenv.config() untuk memuat variabel lingkungan

const app = express();
// Port dari .env atau default 5000
const port = process.env.PORT || 5000; 

// Konfigurasi CORS yang benar untuk mengizinkan kredensial
app.use(cors({
    origin: 'http://localhost:3000', // Frontend 
    credentials: true // Izinkan pengiriman cookies
}));

app.use(express.json()); 
app.use(cookieParser()); 

app.use(UserRoute); // Untuk notes
app.use(DepartementRoute);

app.listen(port, () => console.log(`Server up and running on port ${port}...`));
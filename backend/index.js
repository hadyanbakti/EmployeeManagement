import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser"; 

// Mengimpor routes yang telah dibuat
import UserRoute from "./routes/UserRoute.js";
import LoginRoute from "./routes/LoginRoute.js";
import DepartmentRoute from "./routes/DepartmentRoute.js";
import PositionRoute from "./routes/PositionRoute.js"; // Menambahkan PositionRoute

// Mengimpor koneksi ke database dan model
import "./models/index.js"; 

dotenv.config();  // Memuat variabel lingkungan dari .env

const app = express();

// Port dari .env atau default 5000
const port = process.env.PORT || 5000; 

// Konfigurasi CORS yang benar untuk mengizinkan kredensial
app.use(cors({
    origin: 'https://tugasakhirtcc-fe-dot-e-09-450704.uc.r.appspot.com/',  // Frontend
    credentials: true, // Izinkan pengiriman cookies
}));

app.use(express.json());  // Parsing JSON request body
app.use(cookieParser());  // Parsing cookie jika diperlukan

// Menggunakan routes
app.use("/api", UserRoute);        // Routes untuk User
app.use("/api", LoginRoute);       // Routes untuk Login
app.use("/api", DepartmentRoute); // Routes untuk Department
app.use("/api", PositionRoute);    // Routes untuk Position

// Menjalankan server
app.listen(port, () => {
  console.log(`Server up and running on port ${port}...`);
});

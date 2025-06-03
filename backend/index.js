import express from "express";
import cors from "cors";
import dotenv from "dotenv"; 
import cookieParser from "cookie-parser"; 


import UserRoute from "./routes/UserRoute.js";
import LoginRoute from "./routes/LoginRoute.js";
import DepartmentRoute from "./routes/DepartmentRoute.js";
import PositionRoute from "./routes/PositionRoute.js"; 


import "./models/index.js"; 

dotenv.config();  

const app = express();


const port = process.env.PORT || 5000; 


app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true,
}));

app.use(express.json());  
app.use(cookieParser());  

// Menggunakan routes
app.use("/api", UserRoute);        
app.use("/api", LoginRoute);      
app.use("/api", DepartmentRoute); 
app.use("/api", PositionRoute);    

// Menjalankan server
app.listen(port, () => {
  console.log(`Server up and running on port ${port}...`);
});

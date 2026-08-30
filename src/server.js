import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";



const startserver = async()=>{
    await connectDB();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, ()=>{
        console.log(`server is running on port ${PORT}`)
    });
}

startserver();

import departmentroutes from "./routes/department.routes.js";   
app.use("/api/departments", departmentroutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();


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

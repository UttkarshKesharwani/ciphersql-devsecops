import express from 'express';
import cors from 'cors';
import { connectToMongoDB, connectToPostgreSQL } from './src/config/dbConfig.js';
import apiRoutes from "./src/routes/index.js";
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://uttkarshdev.fun", "https://uttkarshdev.fun"],
    credentials: true, // credentials: true allows sensitive data to travel between frontend and backend
}));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('CipherSQLStudio API is running...');
});


app.use("/api", apiRoutes)


app.use((err,req,res,next)=>{
    console.log("Error: coming inside the global error handler");
    console.log(err.stack);
    res.status(500).json({error:err.message});
})


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToMongoDB();
    await connectToPostgreSQL();
});

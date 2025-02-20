import express from 'express'
import { connectDatabase } from './src/config/DbConfig.js';
import CarRouter from './src/routers/CarRouter.js';
import cors from 'cors';
import OrderRouter from './src/routers/OrderRouter.js';

const PORT = 4050;

const app = express();
app.use(cors())
app.use(express.json());

app.listen(PORT, (error)=>{
    if(error){console.log("Failed to start server");}
    else{
        console.log(`server started successfully on port: ${PORT}`);
        connectDatabase();
    }
});

app.use("/cars", CarRouter);
app.use("/orders", OrderRouter);
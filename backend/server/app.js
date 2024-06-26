import express from "express";
import dataRoutes from '../routes/data.routes.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    // Cambiar la dirección IP
    origin: 'http://192.168.0.103:3000',
    optionsSuccessStatus: 200
}));

// Routes
app.use(dataRoutes);

export default app;
import express from 'express';
import http from 'http';
import { connectDB } from './config/db.js';
import { Server as SocketIOServer } from 'socket.io';
import { TempData } from './models/data.model.js';

// Conectar a MongoDB
connectDB();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "https://ioturbanfarm-1.onrender.com",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 4000;

app.use(express.json());

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.post('/', async (req, res) => {
    const { temperature, humidity } = req.body;

    try {
        // Guardar datos en la base de datos
        const tempData = new TempData({
            temperature,
            humidity
        });
        await tempData.save();

        // Emitir datos a través de Socket.IO
        io.emit('currentTemperature', temperature);
        io.emit('currentHumidity', humidity);

        console.log('Data received and emitted:', { temperature, humidity });
        res.status(200).send('Data received and processed');
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).send('Server error');
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

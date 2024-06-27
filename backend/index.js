import app from './server/app.js';
import http from 'http';
import { connectDB } from './config/db.js';
import { Server as SocketIOServer } from 'socket.io';
import { TempData } from './models/data.model.js';
import { SerialPort } from 'serialport';
import { DelimiterParser } from '@serialport/parser-delimiter';
import express from 'express';


// Conectar a MongoDB
connectDB();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 4000;
app.use(express.json());

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// SERIAL COMMUNICATION
const port = new SerialPort({
    // Cambiar puerto de entrada de datos
    path: '/dev/cu.usbmodem101',
    // path: '/dev/cu.usbserial-10',
    baudRate: 9600
});

const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }));

parser.on('open', () => {
    console.log('Connection is opened');
});

port.on('error', (err) => {
    console.log(err);
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
        //io.emit('currentHumidity', humidity);

        res.status(200).send('Data received and processed');
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).send('Server error');
    }
});

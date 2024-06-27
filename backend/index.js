import app from './server/app.js';
import http from 'http';
import { connectDB } from './config/db.js';
import { Server as SocketIOServer } from 'socket.io';
import { TempData } from './models/data.model.js';
import { SerialPort } from 'serialport';
import { DelimiterParser } from '@serialport/parser-delimiter';
// Conectar a MongoDB
connectDB();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        // Cambiar la dirección IP
        origin: "https://ioturbanfarm-1.onrender.com"
    }
  });

const PORT = process.env.PORT || 4000;
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
const getCurrentData = async (data) => {
    try {
        let dataStr = data.toString().trim();
        let [currentTemp, currentHum] = dataStr.split(',').map(value => parseFloat(value));
        
        console.log('------');
        console.log('Current Temp:', currentTemp);
        console.log('Current Hum:', currentHum);
        // Enviar datos
        io.emit('currentTemperature', currentTemp);
        // io.emit('currentHumidity', currentHum);
        const tempData1 = new TempData({
            temperature: currentTemp,
            humidity: currentHum
        });
        await tempData1.save();
    } catch (error) {
        console.log(error);
    }
};
parser.on('data', getCurrentData);

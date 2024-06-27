import app from './server/app.js';
import http from 'http';
import { connectDB } from './config/db.js';
import { Server as SocketIOServer } from 'socket.io';
import { TempData } from './models/data.model.js';

// Conectar a MongoDB
connectDB();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: "https://ioturbanfarm-1.onrender.com",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Configurar rutas y middleware para manejar JSON
app.use(express.json());

// Ruta para recibir y procesar datos
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

// Manejar nuevas conexiones de clientes
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

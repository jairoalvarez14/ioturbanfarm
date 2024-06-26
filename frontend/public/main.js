import io from 'socket.io-client';

// Cambiar la dirección IP
const socket = io('https://ioturbanfarm.onrender.com');

socket.on('currentTemperature', (temp) => {
    console.log(`Current Temperature: ${temp}`);
    const tempDisplay = document.getElementById('currentTemperature');
    if (tempDisplay) {
        tempDisplay.innerHTML = `${temp}°C`;
    }
});

socket.on('currentHumidity', (hum) => {
    console.log(`Current Humidity: ${hum}`);
    const humDisplay = document.getElementById('currentHumidity');
    if (humDisplay) {
        humDisplay.innerHTML = `${hum}%`;
    }
});

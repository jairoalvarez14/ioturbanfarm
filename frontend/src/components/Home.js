import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Home = () => {
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);
  const [currentFeelsLike, setCurrentFeelsLike] = useState(0);

  useEffect(() => {
    const socket = io('https://ioturbanfarm-1.onrender.com', {
      transports: ['websocket'],
      secure: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('currentTemperature', (temp) => {
      setCurrentTemperature(temp);
    });

    socket.on('currentHumidity', (hum) => {
      setCurrentHumidity(hum);
    });

    socket.on('currentFeelsLike', (feelsLike) => {
      setCurrentFeelsLike(feelsLike); 
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container-all">
      <div className="card">
        <div className="card-description">
          <h3>Current Temperature</h3>
          <p id="currentTemperature">{currentTemperature}°C</p>
        </div>
      </div>

      <div className="humidity card">
        <div className="card-description">
          <h3>Humidity</h3>
          <p id="currentHumidity">{currentHumidity}%</p>
        </div>
      </div>
    
      <div className="feelsLike card">
        <div className="card-description">
          <h3>Feels like</h3>
          <p id="feelsLike">{currentFeelsLike}%</p>
        </div>
      </div>

      <div className="frostRisk card">
        <div className="card-description">
          <h3>Frost Risk</h3>
          {/* <p id="frostRisk">{frostRisk}%</p> */}
          <p id="frostRisk">0%</p>
        </div>
      </div>

      <div className="bomb card">
        <div className="card-description">
          <h3>Bomb Status</h3>
          <p id="bombStatus">Status Not Available</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

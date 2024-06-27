import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const Home = () => {
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    
    socket.on('currentTemperature', (temp) => {
      setCurrentTemperature(temp);
    });
    socket.on('currentHumidity', (hum) => {
      setCurrentHumidity(hum);
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

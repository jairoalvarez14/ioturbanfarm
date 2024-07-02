import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://ioturbanfarm.onrender.com");

const Home = () => {
  const [lastData, setLastData] = useState({
    temperature: 0,
    humidity: 0,
    feelsLike: 0,
    frostRisk: 0,
    bombStatus: "Status Not Available",
  });

  useEffect(() => {
    socket.on("dataUpdate", (data) => {
      console.log("Data updated in real time!", data);
      if (data) {
        setLastData(data);
      }
    });

    socket.on("disconnect", () => {
      console.error("Disconnected from server, showing default values.");
      setLastData({
        temperature: 0,
        humidity: 0,
        feelsLike: 0,
        frostRisk: 0,
        bombStatus: "Status Not Available",
      });
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      socket.off("dataUpdate");
      socket.off("disconnect");
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container-all">
      <div className="card">
        <div className="card-description">
          <h3>Current Temperature</h3>
          <p id="currentTemperature">{lastData.temperature}°C</p>
        </div>
      </div>

      <div className="humidity card">
        <div className="card-description">
          <h3>Humidity</h3>
          <p id="currentHumidity">{lastData.humidity}%</p>
        </div>
      </div>

      <div className="feelsLike card">
        <div className="card-description">
          <h3>Feels like</h3>
          <p id="feelsLike">{lastData.feelsLike}°C</p>
        </div>
      </div>

      <div className="frostRisk card">
        <div className="card-description">
          <h3>Frost Risk</h3>
          {/* <p id="frostRisk">{lastData.frostRisk}%</p> */}
          <p>0%</p>
        </div>
      </div>

      <div className="bomb card">
        <div className="card-description">
          <h3>Bomb Status</h3>
          {/* <p id="bombStatus">{lastData.bombStatus}</p> */}
          <p>Status Not Available</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

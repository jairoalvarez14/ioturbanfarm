import React, { useState, useEffect } from 'react';

const Home = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetch("https://ioturbanfarm.onrender.com/allData")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data showen in real time!", data);
        setAllData(data);
      })
      .catch((error) => console.error("Error obtaining data:", error));
  }, []);
    
  return (
    <>
      {allData.length > 0 ? (
        allData.map((data, index) => (
          <div className="container-all">
            <div className="card">
              <div className="card-description">
                <h3>Current Temperature</h3>
                <p id="currentTemperature">{data.temperature}°C</p>
              </div>
            </div>

            <div className="humidity card">
              <div className="card-description">
                <h3>Humidity</h3>
                <p id="currentHumidity">{data.humidity}%</p>
              </div>
            </div>

            <div className="feelsLike card">
              <div className="card-description">
                <h3>Feels like</h3>
                <p id="feelsLike">{data.feelsLike}%</p>
              </div>
            </div>

            <div className="frostRisk card">
              <div className="card-description">
                <h3>Frost Risk</h3>
                {/* <p id="frostRisk">{data.frostRisk}%</p> */}
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
        ))
      ) : (
        <h2>No data available</h2>
      )}
    </>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';

const TempDataPage = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    // Cambiar la dirección IP
    fetch('https://ioturbanfarm.onrender.com/allData')
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos:', data);
        setAllData(data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div>
      <div className='title__container'>
        <h2>Previous Data</h2>
      </div>
      <div className="container__table">
        <table>
          <thead>
            <tr>
              <th>Plant</th>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
              <th>Feels Like (%)</th>
              <th>Frost Risk (%)</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {allData.length > 0 ? (
              allData.map((data, index) => (
                <tr key={index}>
                  <td>Lettuce</td>
                  <td>{data.temperature}</td>
                  <td>{data.humidity}</td>
                  <td>{data.feelsLike}</td>
                  <td>0</td>
                  <td>{data.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TempDataPage;

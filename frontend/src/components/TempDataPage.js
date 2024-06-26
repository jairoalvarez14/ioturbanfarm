import React, { useState, useEffect } from 'react';

const TempDataPage = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    // Cambiar la dirección IP
    fetch('http://192.168.0.103:4000/allData')
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos:', data);
        setAllData(data);
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div className="container__table">
      <h2>Historial de Datos</h2>
      <table>
        <thead>
          <tr>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {allData.length > 0 ? (
            allData.map((data, index) => (
              <tr key={index}>
                <td>{data.temperature}</td>
                <td>{data.humidity}</td>
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
  );
};

export default TempDataPage;

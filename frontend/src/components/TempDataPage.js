import React, {useState, useEffect} from 'react';

const TempDataPage = () => {
    const [allData, setAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch(`https://ioturbanfarm.onrender.com/allData?page=${currentPage}&limit=25`)
            .then(res => res.json())
            .then(datos => {
                console.log('Data receibed:', datos);
                setAllData(datos.data);
                setTotalPages(totalPages);
            })
            .catch(error => console.error('Error:', error));
    }, [setCurrentPage]);

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

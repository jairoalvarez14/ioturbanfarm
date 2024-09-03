import React, { useState, useEffect } from 'react';

const TempDataPage = () => {
    const [allData, setAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch(`https://ioturbanfarm.onrender.com/allData?page=${currentPage}&limit=25`)
            .then(res => res.json())
            .then(data => {
                console.log('Data received:', data);
                setAllData(data.allData);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error:', error));
    }, [currentPage]);

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
                                <td colSpan="6">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <p>Page {currentPage} of {totalPages}</p>
            </div>
        </div>
    );
};

export default TempDataPage;

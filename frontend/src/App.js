import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayouts';
import Home from './components/Home';
import TempDataPage from './components/TempDataPage';

const App = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/allData" element={<TempDataPage />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default App;

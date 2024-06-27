import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/"><h3>Anti-Frost System</h3></Link>
      </div>
      <nav>
        <div className="nav__links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/allData">See Previous Data</Link></li>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;

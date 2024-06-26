import React from 'react';
import Navigation from '../partials/Navigation';

const MainLayout = ({ children }) => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        {children}
      </main>
      
      <script src="/socket.io/socket.io.js"></script>
      <script src="/main.js"></script>
      <script src="/public/navbar.js"></script>
      {/* <script src="https://kit.fontawesome.com/4dedf09487.js" crossOrigin="anonymous"></script> */}
    </div>
  );
};

export default MainLayout;

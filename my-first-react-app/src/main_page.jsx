import React from 'react';
import './main_page.css';
import img2 from './Bike3.jpg';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="main-page" style={{ backgroundImage: `url(${img2})` }}>
      <div className="main-overlay">
        <div className="main-content">
          <h2 className="subtitle">Introducing The Electric Bike</h2>
          <h1 className="title">RENTIX</h1>
          <p className="tagline">Explore the Unexplored</p>
        </div>

        <div className="cta-button-container">
          <Link to="/rentals" className="cta-button">
            Book Now <span className="arrow">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import React, { useState } from 'react';
import './bikeCards.css';
import Header from './header';
import { useNavigate } from 'react-router-dom';

const Rentals = () => {
  const [allBikes, setAllBikes] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [city, setCity] = useState('');
  const [bike, setBike] = useState('');
  const [datesSubmitted, setDatesSubmitted] = useState(false);


  const navigate = useNavigate();



  const handleFilter = () => {
    const filtered = allBikes.filter((item) => {
      const matchesCity = city ? item.city.toLowerCase() === city.toLowerCase() : true;
      const matchesBrand = bike ? item.brand.toLowerCase() === bike.toLowerCase() : true;
      const matchesPrice = item.pricePerDay >= minPrice && item.pricePerDay <= maxPrice;
      return matchesCity && matchesBrand && matchesPrice;
    });
    setFilteredBikes(filtered);
  };

  const handleBikeDetails = (id) => {
    if (!fromDate || !toDate) {
      alert('Please select dates first');
      return;
    }

    navigate(`/rentals/${id}`, {
      state: { fromDate, toDate },
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const fetchAvailableBikes = async () => {
  if (!fromDate || !toDate) {
    alert('Please select both From and To dates');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const res = await fetch(
      `http://localhost:5000/availableBikes?fromDate=${fromDate}&toDate=${toDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setAllBikes(data);
    setFilteredBikes(data);
    setDatesSubmitted(true); // ✅ ADD THIS LINE
  } catch (err) {
    console.error('Error fetching available bikes:', err);
  }
};


  return (
  <>
    <Header />

    {/* Date Picker Section */}
    {!datesSubmitted && (<div className="date-section">
      <label>From Date:</label>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => {
          setFromDate(e.target.value);
          setDatesSubmitted(false);
        }}
      />
      <label>To Date:</label>
      <input
        type="date"
        value={toDate}
        onChange={(e) => {
          setToDate(e.target.value);
          setDatesSubmitted(false);
        }}
      />
      <button
        onClick={fetchAvailableBikes}
        disabled={!fromDate || !toDate}
      >
        Check Availability
      </button>
    </div>) }

    {/* Rentals and Filters Section */}
    {datesSubmitted && (
      <div className="rentals-page">
        <h3 style={{ marginLeft: '1rem' }}>
          Bikes available from {fromDate} to {toDate}:
        </h3>

        <aside className="filter-sidebar">
          <h3>Filter By</h3>

          <div className="filter-section">
            <p><strong>City</strong></p>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">-- Select City --</option>
              <option value="Roorkee">Roorkee</option>
            </select>
          </div>

          <div className="filter-section">
            <p><strong>Search by Brand</strong></p>
            <select value={bike} onChange={(e) => setBike(e.target.value)}>
              <option value="">-- Select Brand --</option>
              <option value="royal enfield">Royal Enfield</option>
              <option value="ktm">KTM</option>
              <option value="hero">Hero</option>
            </select>
          </div>

          <div className="filter-section">
            <p><strong>Price Range</strong></p>
            <div className="price-range">
              <div>
                <label>MIN</label>
                <div className="rupee-input">
                  <span className="rupee-symbol">₹</span>
                  <input
                    type="number"
                    value={minPrice === 0 ? '' : minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    placeholder="Min"
                  />
                </div>
              </div>
              <div>
                <label>MAX</label>
                <div className="rupee-input">
                  <span className="rupee-symbol">₹</span>
                  <input
                    type="number"
                    value={maxPrice === 3000 ? '' : maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleFilter}>Apply Filter</button>
        </aside>

        <div className="bike-card-container">
          {filteredBikes.length === 0 ? (
            <p>No bikes found matching the filters.</p>
          ) : (
            filteredBikes.map((bike) => (
              <div
                onClick={() => handleBikeDetails(bike.id)}
                className="bike-card"
                key={bike.id}
              >
                <img src={bike.image} alt={bike.name} className="bike-image" />
                <div className="bike-info">
                  <p className="bike-brand">{bike.brand.toUpperCase()}</p>
                  <p className="bike-name">{bike.name}</p>
                  <p className="bike-price">₹{bike.pricePerDay}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )}

    <button className="logout" onClick={handleLogOut}>Log Out</button>
  </>
);
}
export default Rentals ;
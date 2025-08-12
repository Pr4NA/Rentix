// Bookings.jsx
import React, { useEffect, useState } from 'react';
import './bookings.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/booking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        setBookings(data.bookings);  // ✅ Corrected
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="bookings-loading">Loading...</div>;

const now = new Date();

const upcoming = bookings.filter(b => new Date(b.toDate) >= now);
const previous = bookings.filter(b => new Date(b.toDate) < now);

  const renderBookingCard = (b) => (
    <div className="bookings-card" key={b.id}>
      <div className="bookings-card-header">
        <h3>{b.bike?.name} ({b.bike?.brand})</h3>
        {/* <span>Status: {b.status}</span> */}
      </div>
      <div className="bookings-card-body">
        <img src={b.bike?.image} alt={b.bike?.name} className="bookings-bike-img" />
        <div>
          <p><strong>City:</strong> {b.bike?.city}</p>
          <p><strong>From:</strong> {new Date(b.fromDate).toLocaleDateString()}</p>
          <p><strong>To:</strong> {new Date(b.toDate).toLocaleDateString()}</p>
          <p><strong>Price/Day:</strong> ₹{b.bike?.pricePerDay}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bookings-container">
      <h2>Your Bookings</h2>

      <div className="bookings-section">
        <h3 style={{ backgroundColor: 'lightblue' }}>Upcoming Bookings</h3>
        {upcoming.length ? upcoming.map(renderBookingCard) : <p>No upcoming bookings.</p>}
      </div>

      <div className="bookings-section">
        <h3 style={{ backgroundColor: 'lightblue' }}>Previous Bookings</h3>
        {previous.length ? previous.map(renderBookingCard) : <p>No previous bookings.</p>}
      </div>
    </div>
  );
};

export default Bookings;

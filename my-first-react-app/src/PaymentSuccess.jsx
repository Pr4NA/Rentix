// PaymentSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentSuccess.css'; // Import the CSS for tick animation

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/myBookings');
    }, 2000); // redirect after 2 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="tick-wrapper">
        <svg
          className="tick-mark"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 52 52"
        >
          <circle className="circle" cx="26" cy="26" r="25" fill="none" />
          <path className="check" fill="none" d="M14 27l7 7 17-17" />
        </svg>
      </div>
      <h2>Payment Successful</h2>
      <p>You can view your booking on the <strong>Bookings</strong> page.</p>
    </div>
  );
};

export default PaymentSuccess;

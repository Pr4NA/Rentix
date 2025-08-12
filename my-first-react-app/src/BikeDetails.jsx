// BikeDetails.jsx
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './BikeDetails.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Header from './header';

const BikeDetails = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  const { fromDate, toDate } = location.state || {};

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/allBikes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Bike not found');
        }

        const data = await res.json();
        setBike(data);
      } catch (err) {
        console.error("Error fetching bike:", err);
      }
    };

    fetchBike();
  }, [id]);

  if (!bike) return <p>Loading bike details...</p>;

  const images = [bike.bikeLeft, bike.bikeRear, bike.bikeRight, bike.bikeFront];

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePayNow = () => {
    if (!fromDate || !toDate) {
      alert('Please select both From and To dates');
      return;
    }

    navigate(`/rentals/${bike.id}/payment`, {
      state: {
        price: bike.pricePerDay,
        fromDate,
        toDate,
      },
    });
  }; 


  return (
    <>
      <Header />
      <div className="bike-details-container">
        <div className="bike-image-section">
          <img src={images[index]} alt={`Bike view ${index + 1}`} className="bike-image2" />
          <button className="nav-btn left" onClick={handlePrev}><FaArrowLeft /></button>
          <button className="nav-btn right" onClick={handleNext}><FaArrowRight /></button>
        </div>

        <div className="bike-info">
          <h1>{bike.name}</h1>
          <h2>({bike.brand})</h2>
          <div className="price">₹{bike.pricePerDay} / day</div>
          <p className="description">{bike.description || "Description coming soon..."}</p>
          <button className="book-btn" onClick={handlePayNow}>Book Now</button>
        </div>
      </div>
    </>
  );
};

export default BikeDetails;

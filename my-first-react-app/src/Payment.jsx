import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import bikeData from './bikeData';
import './Payment.css';
import bikeSticker from './motor.png';

const Payment = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    mobile: '',
    aadharcardnumber: '',
    drivinglicensenumber: '',
    fromDate: '',
    toDate: '',
    confirmBooking: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const price = state?.price || 5000;
  const fromDate = state?.fromDate || '';
  const toDate = state?.toDate || '';

  const days =
  fromDate && toDate
    ? (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24) + 1
    : 1;

  const totalPrice = days * price ;

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
        throw new Error("Failed to fetch bike");
      }

      const data = await res.json();
      setBike(data);
      console.log(bike) ;
    } catch (error) {
      console.error("Error fetching bike:", error);
    }
  };

  fetchBike();
}, [id]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

 const validateForm = () => {
  const newErrors = {};

  if (!formData.name.trim()) newErrors.name = true;
  if (!formData.gender) newErrors.gender = true;
  if (!formData.dob) newErrors.dob = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) newErrors.email = true;

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(formData.mobile)) newErrors.mobile = true;

  const aadharRegex = /^[2-9]{1}[0-9]{11}$/;
  if (!aadharRegex.test(formData.aadharcardnumber)) newErrors.aadharcardnumber = true;

  const licenseRegex = /^[A-Z]{2}[- ]?[0-9]{2}[- ]?[0-9]{4}[- ]?[0-9]{7}$/;
  if (!licenseRegex.test(formData.drivinglicensenumber)) newErrors.drivinglicensenumber = true;

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
    setIsSubmitted(false);
  };

  const [bookingId, setBookingId] = useState(null);

// Handle form submission and booking creation
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    alert('Please correct highlighted fields before submitting.');
    return;
  }

  try {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:5000/booking/${bike.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      ...formData,
      fromDate: fromDate,
      toDate: toDate,
      bikeId: bike.id,
    }),
  });

  const raw = await response.text(); // capture full response as plain text
  console.log("Raw response:", raw);

  let data;
  try {
    data = JSON.parse(raw); // try to parse as JSON
  } catch (e) {
    console.error("Invalid JSON response:", e);
    alert("Server returned non-JSON response. Check backend logs.");
    return;
  }

  if (!response.ok) {
    alert(`Booking failed: ${data.message}`);
    return;
  }

  setBookingId(data.bookingId);
  setIsSubmitted(true);
  alert("Form submitted successfully. Please proceed to payment.");
} catch (error) {
  console.error("Submission error:", error);
  alert("Something went wrong while submitting the form.");
}

};

// Handle Razorpay payment
const paymentHandler = async () => {
  if (!bike || !bookingId || !validateForm()) {
    alert("Missing booking or form details.");
    return;
  }

  const token = localStorage.getItem("token");
  const price = totalPrice || 1000; // fallback if price not set

  try {
    // Create Razorpay order
    const orderRes = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: price * 100, // Razorpay expects amount in paisa
        currency: "INR",
        receipt: `receipt#${bike.id}`,
      }),
    });

    const order = await orderRes.json();

    const options = {
      key: "rzp_test_5jboG0VjdbTZa2", // Replace with process.env.RAZORPAY_KEY_ID in prod
      amount: order.amount,
      currency: order.currency,
      name: "Rentix",
      description: `Rent for ${bike.name}`,
      image: bikeSticker,
      order_id: order.id,
      handler: async function (response) {
        const validateRes = await fetch("http://localhost:5000/order/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ ...response, bookingId }),
        });

        const result = await validateRes.json();
        if (result.message === "Payment verified and booking confirmed") {
          navigate("/payment-success");
        } else {
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.mobile,
      },
      theme: { color: "#3399cc" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", function (response) {
      alert("Payment Failed");
      console.error(response.error);
    });
  } catch (err) {
    console.error("Payment error:", err);
    alert("Error initiating payment.");
  }
};


  if (!bike) return <div className="payment-container">Loading bike details...</div>;

  return (
    <div className="payment-container">
      <div className="payment-left">
        <img src={bikeSticker} alt="bike icon" className="bike-icon" />
        <h2>Let’s get you set up</h2>
        <p>It should only take a couple of minutes to complete your bike booking.</p>
      </div>

      <div className="payment-right">
        <div className="payment-form">
          <h2>Booking Form</h2>

          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={errors.name ? 'input-error' : ''} />
          <select name="gender" value={formData.gender} onChange={handleChange} className={errors.gender ? 'input-error' : ''}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Rather not say">Rather not say</option>
          </select>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={errors.dob ? 'input-error' : ''}
          />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={errors.email ? 'input-error' : ''} />
          <input type="tel" name="mobile" placeholder="Mobile Number" maxLength="10" value={formData.mobile} onChange={handleChange} className={errors.mobile ? 'input-error' : ''} />
          <input type="text" name="aadharcardnumber" placeholder="Aadhaar Number" maxLength="12" value={formData.aadharcardnumber} onChange={handleChange} className={errors.aadharcardnumber ? 'input-error' : ''} />
          <input type="text" name="drivinglicensenumber" placeholder="Driving License Number" value={formData.drivinglicensenumber} onChange={handleChange} className={errors.drivinglicensenumber ? 'input-error' : ''} />

          <div className="payment-price">You will be charged ₹{totalPrice}</div>

          <div className="payment-buttons">
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            <button className="pay-btn" onClick={paymentHandler} disabled={!isSubmitted} style={{ opacity: isSubmitted ? 1 : 0.6, cursor: isSubmitted ? 'pointer' : 'not-allowed' }}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

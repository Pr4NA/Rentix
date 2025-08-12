import { Link } from 'react-router-dom';
import { FaHome, FaMotorcycle, FaPhoneAlt , FaListAlt, FaSignInAlt, FaUserPlus} from 'react-icons/fa';
import './Header.css'; // optional: for styling

function Header() {
  return (
    <div className="header">
      <div className="header-left">RENTIX</div>
      <Link to="/"><FaHome /> Home</Link>
      <Link to="/rentals"><FaMotorcycle /> Rentals</Link>
      <Link to="/myBookings"><FaListAlt /> Bookings</Link>
      <Link to="/contactus"><FaPhoneAlt /> Contact Us</Link>
      
      <Link to='/login'><FaSignInAlt/> LogIn</Link>
      <Link to='/signup'><FaUserPlus/> SignUp</Link>
    </div>
  );
}

export default Header;

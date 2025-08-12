import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await fetch("http://localhost:5000/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential: credentialResponse.credential }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("HEllo") ;
      localStorage.setItem('token', data.token) ;
      console.log(data.token) ;
      console.log(data.user) ;
      navigate("/rentals");
    } else {
      console.error(data.message);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  );
};

export default Login;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Rentals from "./BikeCards";
import BikeDetails from "./BikeDetails";
import Payment from "./Payment";
import PaymentSuccess from "./PaymentSuccess";
import Login from "./login";  
// import Signup from "./signup";
import Bookings from "./bookings" ;

import {GoogleOAuthProvider} from "@react-oauth/google" ;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "rentals",
    element: <Rentals />,
  },
  {
    path: "rentals/:id",
    element: <BikeDetails />
  },
  {
    path: "rentals/:id/payment",
    element: <Payment />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />
  },
  {
    path: "/login",             // ✅ Login route
    element: <Login />
  },
  // {
  //   path: "/signup",            // ✅ Signup route
  //   element: <Signup />
  // },
  {
    path: "/myBookings",
    element: <Bookings/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="413872770466-2qbpj8kijgs3phk6lfr303qpbtamnm33.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);

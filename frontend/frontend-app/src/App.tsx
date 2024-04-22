import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NoPage from "./components/NoPage";
import Contact from "./components/Contact";
import About from "./components/About";
import Destinations from "./components/Destinations";
import ReservationsForDestination from "./components/ReservationsForDestination";
import { useEffect } from "react";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();

  useEffect(() => {
    const getLocation = () => {
      const expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 7);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            cookies.set(
              "userLocation",
              JSON.stringify({ latitude, longitude }),
              {
                expires: expiresDate,
              }
            );
            console.log(
              "Current location:",
              JSON.stringify({ latitude, longitude })
            );
          },
          (error) => {
            console.error("Error getting location", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route
          path="/reservations/:destinationId"
          element={<ReservationsForDestination />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

import { FC, useState, useEffect } from "react";
import { type DestinationType } from "../utils/DestinationTypes";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import "../styles/destination.css";
import { book } from "../utils/http";
import { useNavigate } from "react-router-dom";

type DestinationCardProps = {
  destination: DestinationType;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const DestinationCard: FC<DestinationCardProps> = ({
  destination,
  startDate,
  endDate,
}) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const emptyStars = 5 - destination.ranking;

  useEffect(() => {
    const localRole = localStorage.getItem("role");
    if (localRole) {
      setRole(localRole);
    } else {
      setRole("");
    }
  }, []);

  const calculateTotalCost = () => {
    const nights =
      Math.floor(endDate!.getTime() - startDate!.getTime()) /
      (1000 * 60 * 60 * 24);
    return (
      Math.round(
        destination.initialPrice * (1 - destination.discountPercentage / 100)
      ) * nights
    );
  };

  const handleBookNow = () => {
    const client = localStorage.getItem("username");
    const totalCost = calculateTotalCost();
    book(destination.id, client, startDate, endDate, totalCost);
  };

  const handleViewReservations = () => {
    if (role === "admin") {
      navigate(`/reservations/${destination.id}`);
    }
  };

  return (
    <div className="destination-card" onClick={handleViewReservations}>
      <img src={destination.image} alt="Loading..." />
      <div className="destination-card-content">
        <h3>
          <FaLocationDot className="destination-card-location-icon" />{" "}
          {destination.name}
        </h3>
        <p>{destination.description}</p>
        <div className="destination-card-stars">
          {Array(destination.ranking)
            .fill(null)
            .map((_, index) => (
              <FaStar key={index} className="star-icon" />
            ))}
          {Array(emptyStars)
            .fill(null)
            .map((_, index) => (
              <FaRegStar key={index} className="star-icon" />
            ))}
        </div>

        <div className="destination-card-price">
          $
          {Math.round(
            destination.initialPrice *
              (1 - destination.discountPercentage / 100)
          )}{" "}
          {destination.discountPercentage !== 0 && (
            <span>${destination.initialPrice}</span>
          )}
        </div>
        <button className="destination-card-btn" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;

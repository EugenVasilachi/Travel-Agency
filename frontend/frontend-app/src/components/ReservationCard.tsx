import { FC } from "react";
import { ReservationType } from "./ReservationsForDestination";

const ReservationCard: FC<ReservationType> = ({
  client,
  destination,
  reservationDate,
  startDate,
  endDate,
  totalCost,
}) => {
  return (
    <div className="reservation-card">
      <div className="reservation-info">
        <p>Destination: {destination.name}</p>
        <p>Reservation Date: {reservationDate}</p>
        <p>Check-in Date: {startDate}</p>
        <p>Check-out Date: {endDate}</p>
        <p>Total Cost: ${totalCost}</p>
        <p>Client: {client}</p>
      </div>
    </div>
  );
};

export default ReservationCard;

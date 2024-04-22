import { FC, ReactNode } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../utils/http.ts";
import "../styles/reservation.css";
import ErrorMessage from "./ErrorMessage.tsx";
import { DestinationType } from "../utils/DestinationTypes.ts";
import ReservationCard from "./ReservationCard.tsx";
import ReservationCalendar from "./ReservationCalendar.tsx";
import DestinationStats from "./DestinationStats.tsx";

export type ReservationType = {
  client: string;
  destination: DestinationType;
  reservationDate: string;
  startDate: string;
  endDate: string;
  totalCost: number;
};

const ReservationsForDestination: FC = () => {
  const { destinationId } = useParams();
  const [fetchedReservations, setFetchedReservations] =
    useState<ReservationType[]>();
  const [error, setError] = useState<string>("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchReservations() {
      setIsFetching(true);
      try {
        let url = `http://localhost:8000/api/reservations/${destinationId}/`;

        const data = (await get(url)) as ReservationType[];

        const reservations: ReservationType[] = data.map((rawReservation) => {
          return {
            client: rawReservation.client,
            destination: rawReservation.destination,
            reservationDate: rawReservation.reservationDate,
            startDate: rawReservation.startDate,
            endDate: rawReservation.endDate,
            totalCost: Number(rawReservation.totalCost),
          };
        });

        setFetchedReservations(reservations);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    }

    fetchReservations();
  }, [destinationId]);

  const getDatesBetween = (startDate: string, endDate: string) => {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />;
  }

  if (isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>;
  }

  if (fetchedReservations) {
    let markedDates: Date[] = [];
    fetchedReservations.forEach((reservation) => {
      const dates = getDatesBetween(reservation.startDate, reservation.endDate);
      markedDates = [...markedDates, ...dates];
    });

    let markedDatesString: string[] = [];
    markedDates.forEach((date) => {
      markedDatesString = [
        ...markedDatesString,
        date.toISOString().slice(0, 10),
      ];
    });

    content = (
      <div className="reservation-page">
        <div className="reservation-list">
          {fetchedReservations.map((reservation, index) => (
            <ReservationCard
              key={index}
              client={reservation.client}
              destination={reservation.destination}
              reservationDate={reservation.reservationDate}
              startDate={reservation.startDate}
              endDate={reservation.endDate}
              totalCost={reservation.totalCost}
            />
          ))}
        </div>
        <ReservationCalendar markedDates={markedDatesString} />
        <DestinationStats reservationDates={markedDatesString} />
      </div>
    );
  }

  return <section className="reservation-section">{content}</section>;
};

export default ReservationsForDestination;

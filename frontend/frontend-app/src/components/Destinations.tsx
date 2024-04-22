import { type FC, type ReactNode, useEffect, useState } from "react";
import { type DestinationType } from "../utils/DestinationTypes.ts";
import DestinationCard from "./DestinationCard";
import { useSearchParams } from "react-router-dom";
import DateRangePickerComponent from "./DateRangePickerComponent";
import { get } from "../utils/http.ts";
import ErrorMessage from "./ErrorMessage.tsx";
import "../styles/destination.css";
import { ToastContainer } from "react-toastify";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

const Destinations: FC = () => {
  const [searchParams] = useSearchParams();
  const isPromoted = searchParams.get("isPromoted");
  const locationParam = searchParams.get("location");
  const [fetchedDestinations, setFetchedDestinations] =
    useState<DestinationType[]>();
  const [error, setError] = useState<string>();
  const [isFetching, setIsFetching] = useState(false);

  const [selectedInDate, setSelectedInDate] = useState<Date | undefined>();
  const [selectedOutDate, setSelectedOutDate] = useState<Date | undefined>();

  const handleInDateChange = (date: Value) => {
    setSelectedInDate(date as Date);
  };

  const handleOutDateChange = (date: Value) => {
    setSelectedOutDate(date as Date);
  };

  useEffect(() => {
    async function fetchDestinations() {
      setIsFetching(true);
      try {
        let url = "http://localhost:8000/api/destinations/";

        if (selectedInDate && selectedOutDate) {
          const startDate = new Date(selectedInDate);
          const endDate = new Date(selectedOutDate);

          startDate.setDate(startDate.getDate() + 1);
          endDate.setDate(endDate.getDate() + 1);

          // Format the date as 'YYYY-MM-DD'
          const formattedStartDate = startDate.toISOString().slice(0, 10);
          const formattedEndDate = endDate.toISOString().slice(0, 10);
          url += `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
        } else if (locationParam !== null) {
          url += `?location=${locationParam}`;
        } else if (isPromoted) {
          url += "?isPromoted=true";
        }

        const data = (await get(url)) as DestinationType[];

        const destinations: DestinationType[] = data.map((rawDestination) => {
          return {
            id: rawDestination.id,
            name: rawDestination.name,
            location: rawDestination.location,
            nrPeople: rawDestination.nrPeople,
            description: rawDestination.description,
            image: rawDestination.image,
            ranking: rawDestination.ranking,
            initialPrice: rawDestination.initialPrice,
            discountPercentage: rawDestination.discountPercentage,
            reservedDates: rawDestination.reservedDates,
          };
        });

        setFetchedDestinations(destinations);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    }

    fetchDestinations();
  }, [isPromoted, locationParam, selectedOutDate]);

  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />;
  }

  if (fetchedDestinations) {
    content = (
      <div className="destination-list">
        {fetchedDestinations?.map((destination, index) => (
          <DestinationCard
            key={index}
            destination={destination}
            startDate={selectedInDate}
            endDate={selectedOutDate}
          />
        ))}
      </div>
    );
  }

  if (isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>;
  }

  return (
    <section className="destination-section">
      <ToastContainer />
      <DateRangePickerComponent
        selectedInDate={selectedInDate}
        selectedOutDate={selectedOutDate}
        onInDateChange={handleInDateChange}
        onOutDateChange={handleOutDateChange}
      />
      {content}
    </section>
  );
};

export default Destinations;

import { FC, useState } from "react";
import "../styles/daterange.css";
import Calendar from "react-calendar";
import { Value } from "./Destinations";

type DateRangePickerProps = {
  selectedInDate: Date | undefined;
  selectedOutDate: Date | undefined;
  onInDateChange: (date: Value) => void;
  onOutDateChange: (date: Value) => void;
};

const DateRangePickerComponent: FC<DateRangePickerProps> = ({
  selectedInDate,
  selectedOutDate,
  onInDateChange,
  onOutDateChange,
}) => {
  const [showInCalendar, setShowInCalendar] = useState(false);
  const [showOutCalendar, setShowOutCalendar] = useState(false);

  const handleInButtonClick = () => {
    setShowInCalendar(!showInCalendar);
  };

  const handleOutButtonClick = () => {
    setShowOutCalendar(!showOutCalendar);
  };

  const handleInDateChange = (date: Value) => {
    onInDateChange(date);
    setShowInCalendar(false);
  };

  const handleOutDateChange = (date: Value) => {
    date = date as Date;
    if (date.getTime() > (selectedInDate?.getTime() || 0)) {
      onOutDateChange(date);
      setShowOutCalendar(false);
    } else {
      alert("Select a later Date");
    }
  };

  return (
    <>
      <div className="arrival">
        <h1>Arrival</h1>
        {!showInCalendar && (
          <button className="dropbtn" onClick={handleInButtonClick}>
            {selectedInDate
              ? selectedInDate?.toLocaleDateString()
              : "Start Date"}
          </button>
        )}

        {showInCalendar && (
          <div className="my-4">
            <Calendar onChange={handleInDateChange} value={selectedInDate} />
          </div>
        )}
      </div>

      <div className="departure">
        <h1>Departure</h1>
        {!showOutCalendar && (
          <button className="dropbtn" onClick={handleOutButtonClick}>
            {selectedOutDate
              ? selectedOutDate?.toLocaleDateString()
              : "End Date"}
          </button>
        )}

        {showOutCalendar && (
          <div className="my-4">
            <Calendar onChange={handleOutDateChange} value={selectedOutDate} />
          </div>
        )}
      </div>
    </>
  );
};

export default DateRangePickerComponent;

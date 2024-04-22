import { FC } from "react";
import Calendar from "react-calendar";
import "../styles/calendar.css";

type ReservationCalendarProps = {
  markedDates: string[];
};

const ReservationCalendar: FC<ReservationCalendarProps> = ({ markedDates }) => {
  return (
    <div className="reservation-calendar">
      <Calendar
        tileClassName={({ date }) => {
          const stringDate = date.toISOString().slice(0, 10);
          if (markedDates.find((date) => date === stringDate)) {
            return "highlight";
          }
        }}
      />
    </div>
  );
};

export default ReservationCalendar;

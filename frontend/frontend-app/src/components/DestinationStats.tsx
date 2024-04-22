import React, { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

interface ReservationStatisticsProps {
  reservationDates: string[];
}

const ReservationStatistics: React.FC<ReservationStatisticsProps> = ({
  reservationDates,
}) => {
  const [reservationStats, setReservationStats] = useState<{
    [key: number]: number;
  }>({});

  useEffect(() => {
    const stats = calculateStats(reservationDates);
    setReservationStats(stats);
    console.log(reservationStats);
  }, [reservationDates]);

  const calculateStats = (dates: string[]): { [key: number]: number } => {
    const stats: { [key: number]: number } = {};

    dates.forEach((date) => {
      const month = parseInt(date.slice(5, 7), 10);
      if (!stats[month]) {
        stats[month] = 0;
      }
      stats[month]++;
    });

    return stats;
  };

  useEffect(() => {
    ChartJS.register(...registerables);
  }, []);

  const keyList: number[] = Object.keys(reservationStats).map((key) =>
    parseInt(key, 10)
  );

  const chartData = {
    labels: Array.from(
      { length: Object.keys(reservationStats).length },
      (_, index) => keyList[index]
    ),
    datasets: [
      {
        label: "Number of reservations",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: Object.values(reservationStats),
      },
    ],
  };

  return (
    <div>
      <div>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default ReservationStatistics;

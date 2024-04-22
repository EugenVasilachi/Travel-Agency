type ReservedDate = {
  startDate: Date;
  endDate: Date;
};

export type DestinationType = {
  id: number;
  name: string;
  location: string;
  nrPeople: number;
  description: string;
  image: string;
  ranking: number;
  initialPrice: number;
  discountPercentage: number;
  reservedDates: ReservedDate[];
};

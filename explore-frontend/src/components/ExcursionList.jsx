import React from "react";
import ExcursionCard from "./ExcursionCard";

const EXCURSIONS = [
  {
    name: "This is the name 1",
    description: "And a nice description 1",
    seats: "27 available",
    time: "27.01.2022 10:45",
    price: "1,699 NOK",
  },
  {
    name: "This is the name 2",
    description: "And a nice description 2",
    seats: "27 available",
    time: "27.01.2022 10:45",
    price: "1,1197 NOK",
  },
  {
    name: "This is the name 2",
    description: "And a nice description 2",
    seats: "27 available",
    time: "27.01.2022 10:45",
    price: "1,1197 NOK",
  },
];

const ExcursionList = () => {
  return (
    <div className="mx-auto mt-8 w-4/5">
      {EXCURSIONS.map(({ name, description, time, seats, price }) => (
        <ExcursionCard
          name={name}
          description={description}
          time={time}
          seats={seats}
          price={price}
        />
      ))}
    </div>
  );
};

export default ExcursionList;

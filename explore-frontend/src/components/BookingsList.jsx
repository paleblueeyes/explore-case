import React from "react";
import Booking from "./Booking";

const BOOKINGS = [
  {
    date: "18th of August",
    excursions: [
      {
        name: "Rib Trip",
        time: "10:00 - 14:00",
      },
      {
        name: "Dog Sledge",
        time: "10:00 - 14:00",
      },
    ],
  },
  {
    date: "25th of August",
    excursions: [
      {
        name: "Mountain Hike",
        time: "10:00 - 14:00",
      },
      {
        name: "Wild Stuff",
        time: "10:00 - 14:00",
      },
      {
        name: "Good Funn",
        time: "10:00 - 14:00",
      },
    ],
  },
];

const BookingsList = () => {
  return (
    <div className="w-4/5 mx-auto">
      {BOOKINGS.map(({ date, excursions }) => {
        return (
          <>
            <h1 className="text-xl font-bold mb-2">{date}</h1>
            {excursions.map(({ name, time }) => (
              <Booking name={name} time={time} />
            ))}
          </>
        );
      })}
    </div>
  );
};

export default BookingsList;

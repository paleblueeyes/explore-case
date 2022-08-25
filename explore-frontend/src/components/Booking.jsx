import React from "react";

const Booking = ({ name, time }) => {
  return (
    <div className="bg-gray-100 rounded-xl mb-8 p-4 flex justify-between">
      <div>
        <p>{name}</p>
        <p>
          <em>{time}</em>
        </p>
      </div>
      <button className="bg-white px-4 rounded-lg">Manage</button>
    </div>
  );
};

export default Booking;

import React from "react";
import { useNavigate } from "react-router-dom";

const BookingNumber = () => {
  const navigate = useNavigate();

  const routeChange = () => {
    const path = "/excursions";
    navigate(path);
  };
  return (
    <div className="p-6">
      <h2 className="text-white text-3xl pt-6">What is your booking number?</h2>
      <div className="pt-12 text-2xl">
        <input type="number" className="rounded-md p-2" />
        <button onClick={routeChange} className="bg-white rounded-lg p-2 ml-4">
          Ok
        </button>
      </div>
    </div>
  );
};

export default BookingNumber;

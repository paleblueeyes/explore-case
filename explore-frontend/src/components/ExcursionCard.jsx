import React from "react";
import { Link } from "react-router-dom";
import image from "../images/image-1.jpg";

const ExcursionCard = ({ name, description, time, seats, price, id }) => {
  return (
    <div className="mb-8">
      <Link to={`/excursions/${id}`}>
        <img src={image} className="rounded-md" />
      </Link>
      <div className="flex justify-between mr-2 mt-2">
        <Link to={`/excursions/${id}`}>
          <p className="text-gray-800 font-bold">{name}</p>
        </Link>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
          <p>{seats}</p>
        </div>
      </div>
      <p className="text-gray-800">{time}</p>
      <p className="text-gray-800">{description}</p>
      <p className="text-gray-800 font-bold">{price}</p>
    </div>
  );
};

export default ExcursionCard;

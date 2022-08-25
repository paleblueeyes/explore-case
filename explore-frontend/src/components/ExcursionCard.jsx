import React from "react";
import image from "../images/image-1.jpg";

const ExcursionCard = ({ name, description, time, seats, price }) => {
  return (
    <div className="mb-8">
      <img src={image} className="rounded-md" />
      <div className="flex justify-between mr-2 mt-2">
        <p className="text-gray-800 font-bold">{name}</p>
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

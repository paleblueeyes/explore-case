import React from "react";
import { Link } from "react-router-dom";
import image from "../images/image-1.jpg";

const ExcursionCard = ({ name, description, time, seats, price, id }) => {
  return (
    <div className="mb-8 text-sm bg-white rounded-md">
      <div className="flex">
        <div className="w-3/4 h-36 p-2">
          <div className="flex mr-2 mt-2">
            <Link to={`/excursions/${id}`}>
              <p className="text-gray-800 font-bold">{name}</p>
            </Link>
            <div className="flex items-center ml-2">
              <div className="w-2 h-2 rounded-full bg-green-600 mr-2"></div>
              <p>{seats} available</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs">{time.split("GMT")[0]}</p>
          <p className="text-gray-800 mt-6">{description}</p>
        </div>
        <div className="bg-red-200 w-2/5 relative rounded-r-md">
          {/* <Link to={`/excursions/${id}`}> */}
          <img src={image} className="h-full rounded-r-md" />
          {/* </Link> */}
          <div className="w-4/5 h-8 bg-blue-200 absolute bottom-0 right-0 rounded-md text-xs flex items-center justify-center">
            <p>From {price}$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcursionCard;

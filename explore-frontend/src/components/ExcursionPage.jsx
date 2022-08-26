import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase.js";
import { query, where, getDoc, doc } from "firebase/firestore";

import ExcursionMock from "../mock/ExcursionMock";

const ExcursionPage = () => {
  const [trip, setTrip] = useState({});
  const [buttonText, setButtonText] = useState("Book activity");
  let params = useParams();

  useEffect(() => {
    const getTrip = async () => {
      console.log(params);
      const docRef = doc(db, "trips", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const tripData = docSnap.data();
        setTrip(tripData);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getTrip();
  }, []);

  const handleClick = () => {
    setButtonText("Booked");
  };

  return (
    <div className="bg-deep-blue min-h-screen text-white shadow overflow-hidden sm:rounded-lg">
      <div className="sm:px-6 rounded-sm">
        <img src={ExcursionMock.image} />
      </div>

      <div className="pl-2 pt-2">
        <p className="text-gray-400 text-sm">{ExcursionMock.date}</p>
        <div className="flex pt-2">
          <p className="font-bold text-2xl">{trip.name}</p>
          <div className="flex items-center pl-4 pt-1">
            <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
            <p className="text-sm">Available seats left: {trip.seats}</p>
          </div>
        </div>
        <div className="pt-4 text-sm">{trip.additional}</div>
        <h2 className="pt-4 text-xl">Key information</h2>

        <div className="pl-4">
          <ul className="list-disc">
            {ExcursionMock.keyInformation.map((item, i) => (
              <li className="text-sm" key={i}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl pt-4">Price</h2>
          <p className="text-sm">Adults: {trip.cost_adult} NOK</p>
          <p className="text-sm">Children: {trip.cost_child} NOK</p>
          <p className="text-sm">
            Cancellation fee: {trip.cancellation_fee} NOK
          </p>
        </div>

        <div className="pt-4">
          <button
            class="border w-36 rounded-3xl h-12 px-6 text-deep-blue transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-white mr-4"
            onClick={handleClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcursionPage;

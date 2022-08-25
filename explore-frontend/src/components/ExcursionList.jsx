import { useEffect, useState } from "react";
import ExcursionCard from "./ExcursionCard";
import { db } from "../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

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
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      const q = query(collection(db, "trips"));

      const querySnapshot = await getDocs(q);
      const allTrips = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        allTrips.push(doc.data());
      });
      setTrips(allTrips);
    };
    getTrips();
  }, []);
  return (
    <div className="mx-auto mt-8 w-4/5">
      {trips.map(({ Name, Additional, date, Seats, Cost_adult }) => {
        const formatted_date = new Date(Date.seconds).toLocaleDateString(
          "en-us"
        );
        return (
          <ExcursionCard
            name={Name}
            description={Additional}
            time={formatted_date}
            seats={Seats}
            price={Cost_adult}
          />
        );
      })}
      {console.log(trips)}
    </div>
  );
};

export default ExcursionList;

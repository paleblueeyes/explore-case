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
        const dataWithId = { ...doc.data() };
        dataWithId.id = doc.id;
        allTrips.push(dataWithId);
      });
      setTrips(allTrips);
    };
    getTrips();
  }, []);
  return (
    <div className="bg-deep-blue pt-8">
      <div className="mx-auto  w-11/12 h-screen">
        {trips.map(({ name, additional, date, seats, cost_adult, id, url }) => {
          const formatted_date = date.toDate().toString(); //new Date(date.seconds).toDateString();
          return (
            <ExcursionCard
              name={name}
              description={additional}
              time={formatted_date}
              seats={seats}
              price={cost_adult}
              id={id}
              url={url}
            />
          );
        })}
        {console.log(trips)}
      </div>
    </div>
  );
};

export default ExcursionList;

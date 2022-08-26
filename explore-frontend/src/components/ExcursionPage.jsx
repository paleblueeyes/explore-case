import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase.js";
import { query, where, getDoc, doc } from "firebase/firestore";

import ExcursionMock from "../mock/ExcursionMock";
import BookingModal from "./BookingModal";

const ExcursionPage = () => {
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
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [adultTickets, setAdultTickets] = useState(0);
  const [childrenTickets, setChildrenTickets] = useState(0);
  const [totalSum, setTotalSum] = useState(0);

  function incrementAdultTickets() {
    setAdultTickets(adultTickets + 1);
    setTotalSum(totalSum + trip.cost_adult);
  }

  function decrementAdultTickets() {
    setAdultTickets(adultTickets - 1);
    setTotalSum(totalSum - trip.cost_adult);
  }

  function incrementChildrenTickets() {
    setChildrenTickets(childrenTickets + 1);
    setTotalSum(totalSum + trip.cost_child);
  }

  function decrementChildrenTickets() {
    setChildrenTickets(childrenTickets - 1);
    setTotalSum(totalSum - trip.cost_child);
  }

  function calculateTotalSum() {}

  const [trip, setTrip] = useState({});
  const [buttonText, setButtonText] = useState("Book activity");
  let params = useParams();

  const handleClick = () => {
    setButtonText("Booked");
  };

  return (
    <div className="bg-deep-blue min-h-screen text-white shadow overflow-hidden sm:rounded-lg">
      <div className="sm:px-6 rounded-sm">
        <img src={trip.url} />
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
          <p className="text-sm">Adults: {trip.cost_adult} USD</p>
          <p className="text-sm">Children: {trip.cost_child} USD</p>
          <p className="text-sm">
            Cancellation fee: {trip.cancellation_fee} USD
          </p>
        </div>

        <div className="pt-4">
          <button
            type="button"
            class="border w-36 rounded-3xl h-12 px-6 text-deep-blue transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-white mr-4"
            onClick={openModal}
          >
            Book
          </button>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={closeModal}
            >
              <div className="min-h-screen px-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Confirm Booking
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="flex justify-between items-center border-t">
                        <p className="text-sm text-gray-500 pt-2">Adult(s)</p>
                        <div className="flex justify-between w-16 ml-4 items-center pt-3">
                          <img
                            className="h-4"
                            onClick={decrementAdultTickets}
                            src="/images/decrement.png"
                          />
                          <p>{adultTickets}</p>

                          <img
                            className="h-4"
                            onClick={incrementAdultTickets}
                            src="/images/increment.png"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t">
                        <p className="text-sm text-gray-500  pt-2">Children</p>
                        <div className="flex justify-between w-16 ml-4 items-center pt-3">
                          <img
                            className="h-4"
                            onClick={decrementChildrenTickets}
                            src="/images/decrement.png"
                          />
                          <p>{childrenTickets}</p>

                          <img
                            className="h-4"
                            onClick={incrementChildrenTickets}
                            src="/images/increment.png"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between border-t">
                        <p className="text-sm text-gray-500 pt-2">Price</p>
                        <p className="mr-3">{totalSum}</p>
                      </div>
                      <div>
                        <p>
                          The cost will be added to your Explore Arctic payment
                          card. <b>Cancellation fee: 10$ </b>
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                        onClick={closeModal}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default ExcursionPage;

import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase.js";
import { query, where, getDoc, doc } from "firebase/firestore";

import ExcursionMock from "../mock/ExcursionMock";

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
        setSeatsAvailable(tripData.seats);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getTrip();
  }, []);
  const [trip, setTrip] = useState({});

  let params = useParams();
  let formatted_date = null;
  if (trip.date) {
    formatted_date = trip.date.toDate().toString().split("GMT")[0];
  }

  const [showBooking, setShowBooking] = useState(true); //Show/Hide Booking button
  const hideBooking = () => {
    setShowBooking(false);
    displayTicketsBought();
    displayCancelAndChange();
    closeModal();
  };

  const [showCancelAndChange, setShowCancelAndChange] = useState(false); //Show/Hide Cancel and Change buttons
  const displayCancelAndChange = () => {
    setShowCancelAndChange(true);
  };

  let [seatsAvailable, setSeatsAvailable] = useState(null);
  let [adultTickets, setAdultTickets] = useState(0);
  let [childrenTickets, setChildrenTickets] = useState(0);
  let [totalSum, setTotalSum] = useState(0);

  const cancelBookedTickets = () => {
    setSeatsAvailable(seatsAvailable + adultTickets + childrenTickets);
    adultTickets = 0;
    childrenTickets = 0;
    totalSum = 0;
    setShowCancelAndChange(false);
    setShowTicketsBought(false);
    setShowBooking(true);
  };

  const [showTicketsBought, setShowTicketsBought] = useState(false); //Show/Hide tickets bought
  const displayTicketsBought = () => {
    setShowTicketsBought(true);
  };

  const [isOpen, setIsOpen] = useState(false); //Open/Close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  function incrementAdultTickets() {
    setAdultTickets(adultTickets + 1);
    setTotalSum(totalSum + trip.cost_adult);
  }

  function decrementAdultTickets() {
    if (adultTickets > 0) {
      setAdultTickets(adultTickets - 1);
      setTotalSum(totalSum - trip.cost_adult);
    }
  }

  function incrementChildrenTickets() {
    setChildrenTickets(childrenTickets + 1);
    setTotalSum(totalSum + trip.cost_child);
  }

  function decrementChildrenTickets() {
    if (childrenTickets > 0) {
      setChildrenTickets(childrenTickets - 1);
      setTotalSum(totalSum - trip.cost_child);
    }
  }
  console.log(seatsAvailable);

  return (
    <div className="bg-deep-blue min-h-screen text-white shadow overflow-hidden sm:rounded-lg">
      <div className="sm:px-6 rounded-sm relative">
        <img src={trip.url} />
        {showCancelAndChange && (
          <div className="flex bottom-0 justify-center pb-2 -mt-16">
            <button
              class="border w-46 rounded-3xl h-12 px-6 text-deep-blue transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-white mr-4"
              onClick={cancelBookedTickets}
            >
              Cancel Booking
            </button>
            <button
              class="border w-36 rounded-3xl h-12 px-6 text-deep-blue transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-white mr-4"
              onClick={openModal}
            >
              Change
            </button>
          </div>
        )}
      </div>
      <div className="pl-5 pr-5 pt-5">
        <p className="text-gray-400 text-sm">
          {formatted_date ? formatted_date : null}
        </p>
        <div className="flex pt-2">
          <p className="font-bold text-2xl">{trip.name}</p>
          <div className="flex items-center pl-4 pt-1">
            <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
            <p className="text-sm">
              Available seats left:{" "}
              {seatsAvailable - (adultTickets + childrenTickets)}
            </p>
          </div>
        </div>
        {showTicketsBought && (
          <div className="pt-2">
            <div className="bg-white rounded-xl h-16 w-11/12">
              <p className="text-deep-blue text-center pt-2 ">
                Booked for {adultTickets} adults and {childrenTickets} children
                for <br></br>
                {formatted_date}
              </p>
            </div>
          </div>
        )}
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
          <p className="text-sm">
            {trip.cost_adult} dollars per adult, {trip.cost_child} dollar per
            child
          </p>
        </div>

        <div className="pt-4">
          {showBooking && (
            <button
              type="button"
              class="border w-36 rounded-3xl h-12 px-6 text-deep-blue transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-white mr-4"
              onClick={openModal}
            >
              Book
            </button>
          )}

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
                    <div className="flex justify-end">
                      <img
                        className="h-7"
                        src="/images/cross.png"
                        onClick={closeModal}
                      />
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg text-center font-medium leading-6 text-gray-900"
                    >
                      Confirm Booking
                    </Dialog.Title>

                    <div className="mt-2">
                      <div className="flex justify-between items-center border-t">
                        <p className="text-sm text-gray-500 pt-2">
                          Adult(s) ・ {trip.cost_adult}$
                        </p>
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
                        <p className="text-sm text-gray-500  pt-2">
                          Children ・ {trip.cost_child}$
                        </p>
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
                        className="flex justify-center content-center px-4 py-2 text-sm text-white bg-deep-blue border border-transparent rounded-3xl"
                        onClick={hideBooking}
                      >
                        Book Activity
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

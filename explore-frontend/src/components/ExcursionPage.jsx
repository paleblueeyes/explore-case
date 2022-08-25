import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import ExcursionMock from "../mock/ExcursionMock";

const ExcursionPage = () => {
    const [buttonText, setButtonText] = useState("Book activity");
    let params = useParams();
    console.log(params);

    function handleClick() {
        setButtonText("Booked")
    }

    return (
        <div className="bg-deep-blue min-h-screen text-white shadow overflow-hidden sm:rounded-lg">
            <div className="flex">
                <Link to="/excursions">
                    <img className="p-2 h-16" src="/images/Frame.png"></img>
                </Link>
            </div>
            <div className="sm:px-6 rounded-sm">
                <img src={ExcursionMock.image} />
            </div>

            <div className="pl-2 pt-2">
                <p className="text-gray-400 text-sm">{ExcursionMock.date}</p>
                <div className="flex pt-2">
                    <p className="font-bold text-2xl">{ExcursionMock.title}</p>
                    <div className="flex items-center pl-4 pt-1">
                        <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
                        <p className="text-sm">{ExcursionMock.seats}</p>
                    </div>
                </div>
                <div className="pt-4 text-sm">
                    {ExcursionMock.description}
                </div>
                <h2 className="pt-4 text-xl">Key information</h2>

                <div className="pl-4">
                    <ul className="list-disc">
                        {ExcursionMock.keyInformation.map((item, i) =>
                            <li className="text-sm" key={i}>{item}</li>
                        )}
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl pt-4">Price</h2>
                    <p className="text-sm">{ExcursionMock.price}</p>
                </div>

                <div className="pt-4">
                    <button class="border w-36 rounded-3xl h-12 px-6 text-deep-blue transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-white mr-4"
                        onClick={handleClick}>
                        {buttonText}
                    </button>
                </div>
            </div >
        </div >
    );
};

export default ExcursionPage;

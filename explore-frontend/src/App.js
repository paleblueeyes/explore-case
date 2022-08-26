import "./App.css";
import React from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="bg-deep-blue min-h-screen overflow-y-scroll">
      <Link to="/excursions">
        <img className="p-2 ml-5 mt-2 h-16" src="/images/Frame.png"></img>
      </Link>
      <Outlet />
    </div>
  );
}

export default App;

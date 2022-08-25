import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <p>this is a test</p>
      <Outlet />
    </div>
  );
}

export default App;

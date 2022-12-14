import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExcursionList from "./components/ExcursionList";
import ExcursionPage from "./components/ExcursionPage";
import BookingsList from "./components/BookingsList";
import BookingNumber from "./components/BookingNumber";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="excursions/:id" element={<ExcursionPage />} />
          <Route path="excursions" element={<ExcursionList />} />
          <Route path="bookings" element={<BookingsList />} />
          <Route path="login" element={<BookingNumber />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

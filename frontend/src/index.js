import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";
import ToastProvider from "./Components/ToastProvider";

import { BrowserRouter } from "react-router-dom";


// Create React Root

const root = ReactDOM.createRoot(
  document.getElementById("root")
);


// Render Application

root.render(

  <React.StrictMode>

    <BrowserRouter>

      <><ToastProvider /><App /></>

    </BrowserRouter>

  </React.StrictMode>

);
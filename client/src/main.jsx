import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Added
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import './index.css'
import App from './App.jsx'

// Default 
{/*(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <BrowserRouter> {/* ✅ Wrap App with Router */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
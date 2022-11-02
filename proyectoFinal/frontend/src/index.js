import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <BrowserRouter>
      <App />
      </BrowserRouter>
      
    </SnackbarProvider>
  </React.StrictMode>
);

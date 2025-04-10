// import React from 'react';
import ReactDOM from "react-dom/client";

import React from "react";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import AuthProvider from "./context/authContext";
import { Windmill } from "@windmill/react-ui";

import { CookiesProvider, useCookies } from "react-cookie";
//import store from "Redux/store";
import { ReduxProvider } from "./redux/provider.jsx";
// import { SocketProvider } from "./context/useSocket.jsx";
import Cookies from "js-cookie";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    {/* <Windmill> */}
    <ToastContainer
      toastClassName={() =>
        "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
      }
    bodyClassName={() => "text-black text-base font-normal"}
      position="bottom-left"
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={false}
      closeButton={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    {/* <App /> */}

    <BrowserRouter>
      <AuthProvider>
        <CookiesProvider>
          {/* <CookiesProvider defaultSetOptions={{ path: '/' }}> */}

          {/* <SocketProvider> */}
            <ReduxProvider>
              <App />
            </ReduxProvider>
          {/* </SocketProvider> */}
        </CookiesProvider>
      </AuthProvider>
    </BrowserRouter>

    {/* <LivestreamScreen /> */}
    {/* </Windmill> */}
  </React.StrictMode>
);

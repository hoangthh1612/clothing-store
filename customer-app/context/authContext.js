import axios from "axios";
import { createContext, useEffect, useState } from "react";
import makeRequest from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null);

  const login = async (inputs) => {
    //TO DO
    const res = await makeRequest.post('/auth/login', inputs);
    setCurrentUser(res.data);
    // const res = await axios.post(
    //   "http://localhost:8000/api/auth/login",
    //   inputs,
    //   {
    //     withCredentials: true,
    //   }
    // );
    //setCurrentUser(res.data);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  },[currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

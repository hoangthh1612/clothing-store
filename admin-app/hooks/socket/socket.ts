import {io} from "socket.io-client";
const BASE_URL = "http://localhost:8080";


const socket1 = io("http://localhost:8080", {
//   extraHeaders: {
//     token: "8"
//   }
    autoConnect: false,
  
});
export const socket = socket1
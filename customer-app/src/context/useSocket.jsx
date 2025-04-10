// import { createContext, useContext, useMemo, useState } from 'react';
// import {io } from 'socket.io-client';

// const SocketContext = createContext(null);
// const BASE_URL = "http://localhost:8080";
// export const useSocket = () => {
//     return useContext(SocketContext);
// }

// export const SocketProvider = (props) => {
//     const [data, setData] = useState();
//     const [likes, setLikes] = useState(0);
//     const socket = useMemo(
//         () => io(BASE_URL),
//     )
//     const handleData = (data) => {
//         console.log(data);
//         setData(data);
//     }
//     const handleUpdateLikes = (data) => {
//         console.log(data);
//         setLikes(data);
//     }
//     // console.log(likes);
//     return (
//         <SocketContext.Provider value={{socket, handleData, handleUpdateLikes, likes, setLikes}}>
//             {props.children}
//         </SocketContext.Provider>
//     ) 
// }

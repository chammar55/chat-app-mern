import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // const socket = io("http://localhost:5000", {
      const socket = io("https://www.chat-app-mern-backend-theta.vercel.app", {
        query: { userId: authUser._id }, // we will eccess this in socket.js file to show online user status
      });
      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      // we defined "getOnlineUsers" name in socket.js file in backend
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close(); // close socket when component unmount
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

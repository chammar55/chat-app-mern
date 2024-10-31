import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true; // making it true here to make the shake effect when message come. Also check Message.jsx page how i implemented it further
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage"); // we making sure to not to listen for event more then once.
  }, [socket, setMessages, messages]);
};

export default useListenMessages;

import {useSocketContext} from "../context/SocketContext.tsx";
import useConversation from "../zustand/useConversation.ts";
import {useEffect} from "react";
import notificationSound from '../assets/sounds/notification.mp3'

const UseListenMessages = () => {
    const {socket} = useSocketContext()
    const {messages, setMessages} = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage])
        })

        return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])
};

export default UseListenMessages;
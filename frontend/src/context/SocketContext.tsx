import {createContext, useContext, useEffect, useState} from "react";
import {useAuthContext} from "./AuthContext.tsx";
import io from "socket.io-client"
export const SocketContext = createContext({});

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}: any) => {
    const [socket, setSocket] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser}: any = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socketInstance = io("http://localhost:5000", {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(socketInstance);
            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
            return () => {
                socketInstance.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}
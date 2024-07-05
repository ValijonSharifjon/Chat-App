import {createContext, useContext, useState} from "react";

export const AuthContext = createContext({});

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}: any) => {
    const userString = localStorage.getItem("chat-user");
    const parsedUser: any = userString ? JSON.parse(userString) : null;
    const [authUser, setAuthUser] = useState(parsedUser)

    return <AuthContext.Provider value={{authUser, setAuthUser}} >
                {children}
            </AuthContext.Provider>
}
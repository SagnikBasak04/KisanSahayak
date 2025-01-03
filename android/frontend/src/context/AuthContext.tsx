/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from "react";

type AuthContextType = {
    authUser: any;
    setAuthUser: Dispatch<SetStateAction<any>>;
};

const defaultAuthContext: AuthContextType = {
    authUser: null,
    setAuthUser: () => {}
};

export const AuthContext = createContext(defaultAuthContext);

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState<any>(null);
    console.log("user", authUser);
    

    useEffect(() => {
        const getStoredUser = async () => {
            const storedUser = await AsyncStorage.getItem("KS-user");
            console.log("user: ", storedUser);
            
            if (storedUser) {
                setAuthUser(JSON.parse(storedUser));
            }
        };

        getStoredUser();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
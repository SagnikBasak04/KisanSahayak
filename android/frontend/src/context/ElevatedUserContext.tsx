/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import useGetIsElevatedUser from "../hooks/useGetIsElevatedUser";

export const ElevatedUserContext = createContext({
    elevatedUser: false, // Default value to prevent undefined errors
    setElevatedUser: () => {},
  });

export const useElevatedUserContext = () => {
    return useContext(ElevatedUserContext);
}

export const ElevatedUserContextProvider = ({ children }) => {
    const { isElevatedUser } = useGetIsElevatedUser();
    const [elevatedUser, setElevatedUser] = useState(false);

    const getElevatedUser = async () => {
        const data = await isElevatedUser();
        setElevatedUser(data);
    }

    useEffect(() => {
        getElevatedUser();
    }, []);

    return <ElevatedUserContext.Provider value={{ elevatedUser, setElevatedUser }}>
        {children}
    </ElevatedUserContext.Provider>
}
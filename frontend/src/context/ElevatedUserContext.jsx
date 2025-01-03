/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import useGetIsElevatedUser from "../hooks/getIsElevatedUser";

export const ElevatedUserContext = createContext();

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
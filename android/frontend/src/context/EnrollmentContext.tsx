/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface EnrollmentContextType {
    enrolledUser: any;
    setEnrolledUser: (user: any) => void;
}

const defaultContextValue = {
    enrolledUser: null,
    setEnrolledUser: () => {},  // default no-op function to avoid issues
};

export const EnrollmentContext = createContext<EnrollmentContextType>(defaultContextValue);

export const useEnrollmentContext = () => {
    return useContext(EnrollmentContext);
};

export const EnrollmentContextProvider = ({ children }) => {
    const [enrolledUser, setEnrolledUser] = useState(null);

    const loadEnrolledUser = async () => {
        try {
            const user = await AsyncStorage.getItem("KS-User");
            console.log("user: ", user);
            
            if (user) {
                setEnrolledUser(JSON.parse(user));
            }
        } catch (error) {
            console.error("Error loading enrolled user from AsyncStorage:", error);
        }
    };

    const saveEnrolledUser = async (user) => {
        try {
            await AsyncStorage.setItem("KS-enrolledUser", JSON.stringify(user));
            setEnrolledUser(user);
        } catch (error) {
            console.error("Error saving enrolled user to AsyncStorage:", error);
        }
    };

    useEffect(() => {
        loadEnrolledUser();
    }, []);

    return (
        <EnrollmentContext.Provider value={{ enrolledUser, setEnrolledUser: saveEnrolledUser }}>
            {children}
        </EnrollmentContext.Provider>
    );
};

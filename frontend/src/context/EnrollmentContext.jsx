/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const EnrollmentContext = createContext();

export const useEnrollmentContext = () => {
    return useContext(EnrollmentContext);
}

export const EnrollmentContextProvider = ({ children }) => {
    const [enrolledUser, setEnrolledUser] = useState(JSON.parse(localStorage.getItem("KS-enrolledUser") || null));

    return <EnrollmentContext.Provider value={{ enrolledUser, setEnrolledUser }}>
        {children}
    </EnrollmentContext.Provider>
}
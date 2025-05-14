'use client'

import { createContext, useContext, useState } from "react";

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    
    const [test, setTest] = useState("");

    const values = {
        test, setTest
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}
"use client"

import { AppContextProvider } from "@/contexts/AppContext"
import { ClerkProvider } from "@clerk/nextjs"

const Providers = ({ children }) => {
    return (
        <>
            <AppContextProvider>
                <ClerkProvider>
                    {children}
                </ClerkProvider>
            </AppContextProvider>
        </>
    )
}

export default Providers
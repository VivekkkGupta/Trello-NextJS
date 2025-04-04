"use client"

import { ClerkProvider } from "@clerk/nextjs"

const Providers = ({ children }) => {
    return (
        <>
            <ClerkProvider>
                {children}
            </ClerkProvider>
        </>
    )
}

export default Providers
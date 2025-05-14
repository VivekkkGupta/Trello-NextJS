'use client'
import React, { useState } from 'react'
import { SignIn, SignUp } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function LoginScreen() {
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)

    // Skeleton loader for Clerk forms
    const ClerkSkeleton = () => (
        <div className="w-full max-w-xs animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded" />
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-2xl sm:rounded-xl flex justify-center flex-1 overflow-hidden">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="w-full flex justify-center">
                        <h1 className="text-6xl font-bold text-indigo-700 tracking-tighter">
                            Trello
                        </h1>
                    </div>
                    <div className="mt-8 flex items-center justify-center min-h-[350px] w-full">
                        {loading && <ClerkSkeleton />}
                        {pathname.startsWith('/sign-in') ? (
                            <SignIn afterLoad={() => setLoading(false)} />
                        ) : (
                            <SignUp afterLoad={() => setLoading(false)} />
                        )}
                    </div>
                </div>
                <div className="w-2/3 bg-indigo-100 flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
"use client"

import { useState , useEffect } from "react";
import { usePathname } from "next/navigation";


export const RouteLoading = ({children} : {children : React.ReactNode}) => {

    const [loading , setLoading] = useState<boolean>(false);
    const pathName = usePathname();

    useEffect(() => {
        if(pathName === "/") return;
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        },500)

        return () => clearTimeout(timer)        
    }, [pathName])

    if(loading) {
        return (
            <div className="h-screen flex flex-col gap-8 justify-center items-center">
                <div className="h-10 w-10 rounded-full border-5 border-gray-500 border-t-black animate-[spin_3s_linear_infinite]"></div>
                <h1 className="text-2xl font-semibold ">Loading...</h1>
            </div>
        )
    }

    return (
        <>{children}</>
    )
}

export default RouteLoading;
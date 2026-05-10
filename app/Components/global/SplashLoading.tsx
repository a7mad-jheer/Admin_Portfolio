"use client"
import { useState , useEffect } from "react";
import Image from "next/image";

export default function SplashLoading({children}: {children : React.ReactNode}) {
    const [loading , setLoading] = useState<boolean>(false);

    useEffect(() => {
         const seen = localStorage.getItem("splash")

         if(seen) return;

         setLoading(true);

        const timer = setTimeout(() =>{
            setLoading(false)
            localStorage.setItem("splash" , "true")
        }, 1500);

        return () =>{
            clearTimeout(timer);
        }
    },[])

    if(loading) {
        return (
            <div className="h-screen flex flex-col justify-center items-center text-center gap-8 bg-gradient-to-br from-gray-950 via-gray-900/90 to-gray-950   text-black">
                 <div className="relative animate-pulse text-center">
                    <div className="absolute inset-0 shadow-3xl shadow-white blur-2xl"/>
                    <div className="relative w-50 h-20 ">
                    <Image src="/LOGO.png" alt="" fill className = "object-cover" />
                 </div>
                 <h1 className="text-xl font-semibold m-auto">Welcome , please Wait...</h1>
                 </div>
            </div>
        )
    }

    return (
        <>{children}</>
  );
}
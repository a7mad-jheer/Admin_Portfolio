"use client"

import Link from "next/link"

type Props_Type = {
    status : string
}



export const Login = ({status }:Props_Type ) => {

    return (
        <div className="">
            <Link
            href="/login"
            id="BtnSticky"
             className="fixed top-25 right-5 transform duration-200 bg-white z-100 py-2 px-5 rounded-full cursor-pointer hover:border-green-500 hover:text-green-700 border-2   font-semibold ">{status}</Link>
             
        </div>
    )
}


export default Login;



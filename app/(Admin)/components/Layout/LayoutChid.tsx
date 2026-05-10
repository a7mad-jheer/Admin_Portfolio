"use client"
import AdminHeader from "./AdminHeader";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

type Props = {
    children : React.ReactNode;
}

export const LayoutChild = ({children }: Props ) => {
    const [showSidebar , setShowSidebar]= useState<boolean>(false)
    return (
        <div className="flex flex-col bg-neutral-950 min-h-screen">
                    <div className="">
                      <AdminHeader setShowSidebar={setShowSidebar} />
                    </div>
                  
                  <div className="flex-1 overflow-hidden ">
                    <Sidebar showSidebar={showSidebar } setShowSidebar ={setShowSidebar}  />
                      <div className="md:ml-12 mt-10 p-2  ">
                        {children}
                      </div>
                    
                  </div>
                  </div>
    )
}

export default LayoutChild;
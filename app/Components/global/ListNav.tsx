"use client"
import { NavItem } from "@/config/navigation";
import { GoArrowRight } from "react-icons/go";



export const ListNav = ({data , setState , list} : {data:NavItem[] , setState :(value : boolean) => void , list:boolean}  ) => {
  return (
   <>
   {data.map((item:NavItem) => {
    return (
        <div
      key={item.id}
      
    >
      <a href={item.type === "socialmedia" ? `${item.href}` : `#${item.href}`} target="_blank" rel="noopener noreferrer"  onClick={()=>setState(!list)} className={` text-white/40 p-5 flex items-center justify-between font-semibold hover:bg-black hover:text-white`}>
        <div className="flex gap-2 items-center">
          <span className="text-2xl">{item.icon}</span>
        <span className="text-xl">{item.name}</span>
        </div>

        <span className="text-3xl ">
          <GoArrowRight />
        </span>
      </a >
      <div>
        
      </div>
    </div>
    )
   })}
   </>
  );
};

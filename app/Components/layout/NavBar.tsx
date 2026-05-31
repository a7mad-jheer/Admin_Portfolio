"use client"
import { NavItem } from "@/config/navigation";



export const NavBar = ({active , objData} : {active ?: string , objData:NavItem[]}) => {


    return (
        <div className="flex w-full justify-between items-center ">     
            {objData.map(
                (item) => {
                    return (
                        <a key={item.id}   href={`#${item.href}`} className={`text-3xl hover:text-white ${active === item.href  ? "text-white" : "text-white/10"} cursor-pointer`}>
                            {item.icon}
                        </a>
                    )
                }
            )}
            
        </div>
    )
}

export default NavBar;

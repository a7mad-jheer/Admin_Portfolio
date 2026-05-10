"use client"

import { BsList } from "react-icons/bs";

type props = {
    setShowSidebar :  React.Dispatch<React.SetStateAction<boolean>>,
}



export const MenuIcon = ({setShowSidebar} :props) => {
    return (
        <span
          onClick={() => setShowSidebar((prev) => !prev)}
          className=" md:hidden cursor-pointer p-2 rounded-lg hover:bg-white/10 transition"
        >
          <BsList size={24} />
        </span>
    )
}

export default MenuIcon;
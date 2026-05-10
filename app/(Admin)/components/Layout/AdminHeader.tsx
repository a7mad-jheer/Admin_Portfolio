"use client"
import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import MenuIcon from "../Global/MenuIcon";
import { useSelectData } from "@/hook/api/useSelectData";
import { useUser } from "@/Context/UserInfoContext";
import { useEffect, useState } from "react";

type props = {
  setShowSidebar : React.Dispatch<React.SetStateAction<boolean>>;
}


export const AdminHeader =  ({ setShowSidebar }: props) => {

  const [name, setName] = useState<string>("")

/* api opertations */
const {selectWithSingle} = useSelectData();
/* api opertations */

/* get user_id from context */
  const {userInfo} = useUser();
/* get user_id from context */


  useEffect(() => {
    const fetchData = async () => {
      if(!userInfo?.user_id) {
        console.log("uer_id is null" , userInfo?.user_id);
        return;
      }
      const {data, error} = await selectWithSingle("profile" , [{column : "user_id" , value : userInfo.user_id}]);

      if(error) {
        console.log("error when fetch name" + error);
        return;
      }

      setName(data.name);
    }

    fetchData();
  }, [userInfo?.user_id , selectWithSingle]);

  return (
    <div className="
      fixed
      flex items-center justify-between
      w-full 
      text-white
      px-4
      py-1
      h-16
      bg-[hsl(0,0%,9.02%)] backdrop-blur-md
      top-0 z-50
      border-b
      border-gray-600
      md:border-none
    ">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        

        <MenuIcon setShowSidebar = {setShowSidebar}/>

        <span className="text-lg font-semibold hidden sm:block">
          Dashboard
        </span>
      </div>

      {/* CENTER (search) */}
      <div className="hidden md:flex items-center w-1/3 relative">
        <input
          type="search"
          placeholder="Search..."
          className="
            w-full pl-10 pr-3 py-1
            rounded-full
            bg-white/10
            border border-white/10
            focus:outline-none focus:border-blue-500
            text-sm
          "
        />
        <IoSearchOutline className="absolute left-3 text-gray-400" />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        
        <span className="p-2 rounded-full hover:bg-white/10 cursor-pointer transition">
          <IoIosNotificationsOutline size={22} />
        </span>

        <div>
          <button className="px-2 py-1 text-sm rounded-md  bg-[#005f3c] border border-gray-700 cursor-pointer hover:scale-105">Upgrade Now</button>
        </div>

        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center font-semibold">
          {name}
        </div>

      </div>
    </div>
  );
};

export default AdminHeader;
